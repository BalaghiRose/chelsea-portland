"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PageHeader from "../components/dashboard/layout/pageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DashboardCaseStudy } from "./components/types";
import CaseStudyDialog from "./components/caseStudyDialog";
import CaseStudyTable from "./components/caseStudyTable";

export default function CaseStudiesDashboardPage() {
  const [open, setOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<DashboardCaseStudy | null>(null);
  const [sectionTitle, setSectionTitle] = useState("");
  const [savingSectionTitle, setSavingSectionTitle] = useState(false);

  const caseStudies = useQuery(api.caseStudies.getCaseStudies);
  const settings = useQuery(api.caseStudies.getCaseStudiesSectionSettings);
  const upsertSectionSettings = useMutation(api.caseStudies.upsertCaseStudiesSectionSettings);

  const resolvedSectionTitle = useMemo(() => {
    return sectionTitle || settings?.title || "Case Studies";
  }, [sectionTitle, settings?.title]);

  const handleCreateClick = () => {
    setSelectedCaseStudy(null);
    setOpen(true);
  };

  const handleEditClick = (caseStudy: DashboardCaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setOpen(true);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setSelectedCaseStudy(null);
    }
  };

  const handleSaveSectionTitle = async () => {
    if (!resolvedSectionTitle.trim()) {
      return;
    }

    setSavingSectionTitle(true);

    try {
      await upsertSectionSettings({ title: resolvedSectionTitle.trim() });
    } finally {
      setSavingSectionTitle(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Case Studies"
        description="Manage all case studies displayed across homepage, listing, and detail pages."
      >
        <Button
          onClick={handleCreateClick}
          className="gap-2 rounded-2xl"
        >
          <Plus size={18} />
          Add Case Study
        </Button>
      </PageHeader>

       <section className="my-8 rounded-3xl border border-border bg-card p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">
              Case Studies Section Title
            </Label>

            <Input
              value={resolvedSectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="h-11 rounded-2xl border-border bg-background"
              placeholder="Case Studies"
            />
          </div>

          <Button
            type="button"
            className="rounded-2xl"
            disabled={savingSectionTitle}
            onClick={handleSaveSectionTitle}
          >
            Save Section Title
          </Button>
        </div>
      </section>

      <CaseStudyTable
        caseStudies={(caseStudies ?? []) as DashboardCaseStudy[]}
        loading={caseStudies === undefined}
        onEdit={handleEditClick}
      />

     

      <CaseStudyDialog
        open={open}
        onOpenChange={handleOpenChange}
        caseStudy={selectedCaseStudy}
      />
    </>
  );
}
