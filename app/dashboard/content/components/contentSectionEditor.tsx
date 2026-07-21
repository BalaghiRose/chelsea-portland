"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  normalizeSectionContent,
  type CmsSectionContent,
} from "@/app/(root)/_components/cms-section-content";

const SECTION_LABELS: Record<string, string> = {
  about: "About Us",
  "how-we-help": "Who We Help",
  "why-us": "Why Us",
  contact: "Contact",
  location: "Location",
};

const SECTION_DESCRIPTIONS: Record<string, string> = {
  about: "Manage the About section title and body copy.",
  "how-we-help": "Update the Who We Help content shown on the homepage.",
  "why-us": "Edit the Why Us copy that supports your positioning.",
  contact: "Manage contact copy and address detail cards.",
  location: "Control the office location summary and map link.",
};

function titleCase(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ContentSectionEditor({
  section,
  initialSection,
}: {
  section: string;
  initialSection?: {
    content?: unknown;
    isPublished?: boolean;
  } | null;
}) {
  const upsertSection = useMutation(api.cms.mutations.upsertSection);

  const [formState, setFormState] = useState<CmsSectionContent>(() =>
    normalizeSectionContent(section, initialSection?.content)
  );
  const [isPublished, setIsPublished] = useState(
    initialSection?.isPublished ?? true
  );
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  const resolvedSectionLabel = useMemo(() => {
    return SECTION_LABELS[section] ?? titleCase(section);
  }, [section]);

  const handleParagraphChange = (value: string) => {
    const paragraphs = value
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    setFormState((previous) => ({
      ...previous,
      paragraphs,
    }));
  };

  const handleContactCardChange = (
    index: number,
    field: "icon" | "value",
    value: string
  ) => {
    setFormState((previous) => {
      const cards = [...(previous.contactCards ?? [])];
      const card = cards[index] ?? { value: "" };
      cards[index] = {
        ...card,
        [field]: field === "icon" ? value : value,
      };

      return {
        ...previous,
        contactCards: cards,
      };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback("");

    try {
      await upsertSection({
        section,
        content: formState,
        isPublished,
      });

      setFeedback("Section updated successfully.");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Unable to save section right now."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <Link
            href="/dashboard/content"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to Website Content
          </Link>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-primary">
              {resolvedSectionLabel}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {SECTION_DESCRIPTIONS[section] ?? "Manage this homepage section."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border border-border bg-card px-4 py-3">
          <button
            type="button"
            onClick={() => setIsPublished((current) => !current)}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            {isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
            {isPublished ? "Published" : "Draft"}
          </button>
        </div>
      </div>

      <div className="border border-border bg-card p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <Label className="mb-2 block text-sm font-medium text-primary">
                Section Label
              </Label>
              <Input
                value={formState.sectionLabel ?? ""}
                onChange={(event) =>
                  setFormState((previous) => ({
                    ...previous,
                    sectionLabel: event.target.value,
                  }))
                }
                className="h-11 border-border bg-background"
                placeholder={resolvedSectionLabel}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-primary">
                Title
              </Label>
              <Input
                value={formState.title ?? ""}
                onChange={(event) =>
                  setFormState((previous) => ({
                    ...previous,
                    title: event.target.value,
                  }))
                }
                className="h-11 border-border bg-background"
                placeholder="Add a section title"
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-primary">
                Paragraphs
              </Label>
              <Textarea
                value={formState.paragraphs.join("\n\n")}
                onChange={(event) => handleParagraphChange(event.target.value)}
                rows={12}
                className="border-border bg-background"
                placeholder="Add one paragraph per line or blank line between blocks."
              />
            </div>
          </div>

          <div className="space-y-6">
            {section === "contact" ? (
              <div className="space-y-4 border border-border bg-background/70 p-4">
                <div>
                  <p className="text-sm font-semibold text-primary">Contact Cards</p>
                  <p className="text-xs text-muted-foreground">
                    Update the address, email, and web contact details displayed on the homepage.
                  </p>
                </div>

                {(formState.contactCards ?? []).map((card, index) => (
                  <div key={`${card.value}-${index}`} className="grid gap-3 border border-border/80 bg-card p-3">
                    <div>
                      <Label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Card {index + 1}
                      </Label>
                      <select
                        value={card.icon ?? "map"}
                        onChange={(event) =>
                          handleContactCardChange(index, "icon", event.target.value)
                        }
                        className="h-10 w-full border border-border bg-background px-3 text-sm"
                      >
                        <option value="map">Map</option>
                        <option value="mail">Mail</option>
                        <option value="globe">Globe</option>
                      </select>
                    </div>

                    <div>
                      <Label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Value
                      </Label>
                      <Textarea
                        value={card.value}
                        onChange={(event) =>
                          handleContactCardChange(index, "value", event.target.value)
                        }
                        rows={3}
                        className="border-border bg-background"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {section === "location" ? (
              <div className="space-y-4 border border-border bg-background/70 p-4">
                <div>
                  <Label className="mb-2 block text-sm font-medium text-primary">
                    CTA Label
                  </Label>
                  <Input
                    value={formState.ctaLabel ?? ""}
                    onChange={(event) =>
                      setFormState((previous) => ({
                        ...previous,
                        ctaLabel: event.target.value,
                      }))
                    }
                    className="h-11 border-border bg-background"
                    placeholder="View on Google Maps"
                  />
                </div>

                <div>
                  <Label className="mb-2 block text-sm font-medium text-primary">
                    Google Maps Link
                  </Label>
                  <Input
                    value={formState.mapLink ?? ""}
                    onChange={(event) =>
                      setFormState((previous) => ({
                        ...previous,
                        mapLink: event.target.value,
                      }))
                    }
                    className="h-11 border-border bg-background"
                    placeholder="https://maps.google.com/..."
                  />
                </div>

                <div>
                  <Label className="mb-2 block text-sm font-medium text-primary">
                    Google Maps Embed URL
                  </Label>
                  <Input
                    value={formState.mapEmbedSrc ?? ""}
                    onChange={(event) =>
                      setFormState((previous) => ({
                        ...previous,
                        mapEmbedSrc: event.target.value,
                      }))
                    }
                    className="h-11 border-border bg-background"
                    placeholder="https://www.google.com/maps/embed?..."
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-sm text-muted-foreground">
            {feedback || "Save changes to publish this content block on the site."}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.assign("/dashboard/content")}
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={isSaving}
              onClick={handleSave}
            >
              {isSaving ? "Saving..." : "Save Content"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
