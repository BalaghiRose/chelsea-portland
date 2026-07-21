"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import PageHeader from "../components/dashboard/layout/pageHeader";
import ServiceTable from "./components/serviceTable";
import ServiceDialog from "./components/serviceDialog";
import type { DashboardService } from "./components/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ServicesPage() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] =
    useState<DashboardService | null>(null);
  const [sectionTitle, setSectionTitle] = useState("");
  const [savingSectionTitle, setSavingSectionTitle] = useState(false);

  const services = useQuery(api.services.getServices);
  const settings = useQuery(api.services.getServicesSectionSettings);
  const upsertSectionSettings = useMutation(
    api.services.upsertServicesSectionSettings,
  );

  const resolvedSectionTitle = useMemo(() => {
    return sectionTitle || settings?.title || "Services";
  }, [sectionTitle, settings?.title]);

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

  const handleCreateClick = () => {
    setSelectedService(null);
    setOpen(true);
  };

  const handleEditClick = (service: DashboardService) => {
    setSelectedService(service);
    setOpen(true);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setSelectedService(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Services"
        description="Manage all services displayed on the Chelsea Portland website."
      >
        <Button onClick={handleCreateClick} className="gap-2">
          <Plus size={18} />
          Add Service
        </Button>
      </PageHeader>

      <section className="my-8 border border-border bg-card p-6">
        <p className="mb-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Section Settings
        </p>
        <p className="mb-4 text-sm text-muted-foreground">
          Update the public title shown above the Services section.
        </p>
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Label className="mb-2 block text-sm font-medium text-primary">
              Services Section Title
            </Label>

            <Input
              value={resolvedSectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="h-11 border-border bg-background"
              placeholder="Services"
            />
          </div>

          <Button
            type="button"
            disabled={savingSectionTitle}
            onClick={handleSaveSectionTitle}
          >
            Save Section Title
          </Button>
        </div>
      </section>

      <ServiceTable
        services={(services ?? []) as DashboardService[]}
        loading={services === undefined}
        onEdit={handleEditClick}
      />

 
      <ServiceDialog
        open={open}
        onOpenChange={handleOpenChange}
        service={selectedService}
      />
    </>
  );
}
