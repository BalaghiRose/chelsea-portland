"use client";

import { useState } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { DashboardCaseStudy } from "./types";

interface CaseStudyFormProps {
  caseStudy: DashboardCaseStudy | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CaseStudyForm({
  caseStudy,
  onSuccess,
  onCancel,
}: CaseStudyFormProps) {
  const createCaseStudy = useMutation(api.caseStudies.createCaseStudy);
  const updateCaseStudy = useMutation(api.caseStudies.updateCaseStudy);
  const generateUploadUrl = useMutation(api.caseStudies.generateUploadUrl);

  const [slug, setSlug] = useState(caseStudy?.slug ?? "");
  const [title, setTitle] = useState(caseStudy?.title ?? "");
  const [paras, setParas] = useState(caseStudy?.paras ?? "");
  const [altText, setAltText] = useState(caseStudy?.altText ?? "");
  const [metaTitle, setMetaTitle] = useState(caseStudy?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(caseStudy?.metaDescription ?? "");
  const [metaKeywords, setMetaKeywords] = useState(caseStudy?.metaKeywords?.join(", ") ?? "");
  const [featured, setFeatured] = useState(caseStudy?.featured ?? false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !slug.trim() ||
      !title.trim() ||
      !paras.trim() ||
      !altText.trim()
    ) {
      return;
    }

    const parsedMetaKeywords = metaKeywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);

    setIsSubmitting(true);

    try {
      let uploadedThumbnail = caseStudy?.thumbnail;

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

      if (caseStudy) {
        await updateCaseStudy({
          id: caseStudy._id,
          slug: slugify(slug),
          title: title.trim(),
          paras: paras.trim(),
          featured,
          altText: altText.trim(),
          metaTitle: metaTitle.trim() || undefined,
          metaDescription: metaDescription.trim() || undefined,
          metaKeywords: parsedMetaKeywords.length ? parsedMetaKeywords : undefined,
          thumbnail: uploadedThumbnail,
        });
      } else {
        await createCaseStudy({
          slug: slugify(slug),
          title: title.trim(),
          paras: paras.trim(),
          featured,
          altText: altText.trim(),
          metaTitle: metaTitle.trim() || undefined,
          metaDescription: metaDescription.trim() || undefined,
          metaKeywords: parsedMetaKeywords.length ? parsedMetaKeywords : undefined,
          thumbnail: uploadedThumbnail,
        });
      }

      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-2xl border-border bg-background"
              placeholder="Supporting An Investor From Baghdad..."
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">Slug</Label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              onBlur={() => setSlug((current) => slugify(current || title))}
              className="h-11 rounded-2xl border-border bg-background"
              placeholder="supporting-investor-baghdad"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">Paras</Label>
            <Textarea
              value={paras}
              onChange={(e) => setParas(e.target.value)}
              rows={10}
              className="rounded-2xl border-border bg-background"
              placeholder="Write content with line breaks. Each new line appears as a new paragraph on site."
            />
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">Thumbnail</Label>

            {caseStudy?.thumbnailUrl ? (
              <div className="mb-4 overflow-hidden rounded-2xl border border-border bg-muted/30 p-2">
                <div className="relative aspect-[16/8] overflow-hidden rounded-xl">
                  <Image
                    src={caseStudy.thumbnailUrl}
                    alt={altText || caseStudy.altText}
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
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">Alt Text</Label>
            <Input
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="h-11 rounded-2xl border-border bg-background"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">Meta Title</Label>
            <Input
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="h-11 rounded-2xl border-border bg-background"
              placeholder="Optional SEO title for search results"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">Meta Description</Label>
            <Textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={4}
              className="rounded-2xl border-border bg-background"
              placeholder="Optional SEO description used in search snippets"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">Meta Keywords</Label>
            <Input
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              className="h-11 rounded-2xl border-border bg-background"
              placeholder="Optional comma-separated keywords"
            />
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-primary">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4"
            />
            Feature on homepage section
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" className="rounded-2xl" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="rounded-2xl" disabled={isSubmitting}>
          {caseStudy ? "Update Case Study" : "Save Case Study"}
        </Button>
      </div>
    </form>
  );
}
