"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DashboardCaseStudy } from "./types";
import CaseStudyForm from "./caseStudyForm";

interface CaseStudyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseStudy: DashboardCaseStudy | null;
}

export default function CaseStudyDialog({
  open,
  onOpenChange,
  caseStudy,
}: CaseStudyDialogProps) {
  const isEditMode = Boolean(caseStudy);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isEditMode ? "Edit Case Study" : "Add Case Study"}
          </DialogTitle>

          <DialogDescription>
            {isEditMode
              ? "Update the selected case study details and save changes."
              : "Use the form below to create a case study shown on website pages."}
          </DialogDescription>
        </DialogHeader>

        <CaseStudyForm
          key={caseStudy?._id ?? "new-case-study"}
          caseStudy={caseStudy}
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
