"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { DashboardService } from "./types";
import Image from "next/image";

interface ServiceFormProps {
  service: DashboardService | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ServiceForm({
  service,
  onSuccess,
  onCancel,
}: ServiceFormProps) {
  const createService = useMutation(api.services.createService);
  const updateService = useMutation(api.services.updateService);
  const generateUploadUrl = useMutation(api.services.generateUploadUrl);

  const [title, setTitle] = useState(service?.title ?? "");
  const [altText, setAltText] = useState(service?.altText ?? "");
  const [description, setDescription] = useState(service?.description.join("\n") ?? "");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title.trim() || !altText.trim() || !description.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const parsedDescription = description
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      let uploadedIcon = service?.icon;
      let uploadedThumbnail = service?.thumbnail;

      if (iconFile) {
        const uploadUrl = await generateUploadUrl();
        const uploadResponse = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": iconFile.type,
          },
          body: iconFile,
        });

        if (!uploadResponse.ok) {
          throw new Error("Icon upload failed");
        }

        const { storageId } = await uploadResponse.json();
        uploadedIcon = storageId;
      }

      if (thumbnailFile) {
        const uploadUrl = await generateUploadUrl();
        const uploadResponse = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": thumbnailFile.type,
          },
          body: thumbnailFile,
        });

        if (!uploadResponse.ok) {
          throw new Error("Thumbnail upload failed");
        }

        const { storageId } = await uploadResponse.json();
        uploadedThumbnail = storageId;
      }

      if (service) {
        await updateService({
          id: service._id,
          title: title.trim(),
          altText: altText.trim(),
          description: parsedDescription,
          icon: uploadedIcon,
          thumbnail: uploadedThumbnail,
        });
      } else {
        await createService({
          title: title.trim(),
          altText: altText.trim(),
          description: parsedDescription,
          icon: uploadedIcon,
          thumbnail: uploadedThumbnail,
        });
      }

      setTitle("");
      setAltText("");
      setDescription("");
      setIconFile(null);
      setThumbnailFile(null);

      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">
              Service Title
            </Label>

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-2xl border-border bg-background"
              placeholder="UK Market Entry & Business Establishment"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">
              Description
            </Label>

            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={10}
              className="border-border bg-background"
              placeholder="Add one paragraph per line"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">
              Service Icon
            </Label>

            {service?.iconUrl ? (
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center overflow-hidden border border-border bg-muted/30 p-2">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={service.iconUrl}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ) : null}

            <input
              type="file"
              accept="image/*"
              className="block text-sm text-muted-foreground file:mr-4 file:rounded-2xl file:border file:border-border file:bg-background file:px-4 file:py-2 file:text-sm file:text-foreground"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setIconFile(file);
              }}
            />

            {iconFile ? (
              <p className="mt-2 text-xs text-muted-foreground">
                Selected icon: {iconFile.name}
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                Upload the icon displayed above the service title.
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">
              Thumbnail
            </Label>

            {service?.thumbnailUrl ? (
              <div className="mb-4 overflow-hidden border border-border bg-muted/30 p-2">
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src={service.thumbnailUrl}
                    alt={altText || service.altText}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ) : null}

            <input
              type="file"
              accept="image/*"
              className="block text-sm text-muted-foreground file:mr-4 file:rounded-2xl file:border file:border-border file:bg-background file:px-4 file:py-2 file:text-sm file:text-foreground"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setThumbnailFile(file);
              }}
            />

            {thumbnailFile ? (
              <p className="mt-2 text-xs text-muted-foreground">
                Selected: {thumbnailFile.name}
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                Upload a thumbnail image used in dashboard and homepage services section.
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">
              Alt Text
            </Label>

            <Input
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="h-11 rounded-2xl border-border bg-background"
              placeholder="Service thumbnail"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          className="rounded-2xl"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="rounded-2xl"
          disabled={isSubmitting}
        >
          {service ? "Update Service" : "Save Service"}
        </Button>
      </div>
    </form>
  );
}