"use client";

import { useState } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { DashboardCaseStudy } from "./types";

interface CaseStudyTableProps {
  caseStudies: DashboardCaseStudy[];
  loading: boolean;
  onEdit: (caseStudy: DashboardCaseStudy) => void;
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(timestamp));
}

export default function CaseStudyTable({
  caseStudies,
  loading,
  onEdit,
}: CaseStudyTableProps) {
  const deleteCaseStudy = useMutation(api.caseStudies.deleteCaseStudy);
  const reorderCaseStudies = useMutation(api.caseStudies.reorderCaseStudies);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDelete = async (id: DashboardCaseStudy["_id"]) => {
    setDeletingId(id);

    try {
      await deleteCaseStudy({ id });
    } finally {
      setDeletingId(null);
    }
  };

  const handleDrop = async (targetId: DashboardCaseStudy["_id"]) => {
    if (!draggingId || draggingId === targetId) {
      setDraggingId(null);
      return;
    }

    const ids = caseStudies.map((study) => study._id);
    const sourceIndex = ids.findIndex((id) => id === draggingId);
    const targetIndex = ids.findIndex((id) => id === targetId);

    if (sourceIndex === -1 || targetIndex === -1) {
      setDraggingId(null);
      return;
    }

    const reordered = [...ids];
    const [movedId] = reordered.splice(sourceIndex, 1);
    reordered.splice(targetIndex, 0, movedId);

    await reorderCaseStudies({ ids: reordered });
    setDraggingId(null);
  };

  return (
    <section className="overflow-hidden border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10" />
            <TableHead>Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                Loading case studies...
              </TableCell>
            </TableRow>
          ) : null}

          {!loading && caseStudies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                No case studies yet. Click Add Case Study to create your first one.
              </TableCell>
            </TableRow>
          ) : null}

          {!loading
            ? caseStudies.map((study) => (
                <TableRow
                  key={study._id}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => handleDrop(study._id)}
                  className={draggingId === study._id ? "opacity-60" : undefined}
                >
                  <TableCell>
                    <button
                      type="button"
                      draggable
                      onDragStart={() => setDraggingId(study._id)}
                      onDragEnd={() => setDraggingId(null)}
                      className="cursor-grab text-muted-foreground hover:text-primary"
                      aria-label="Drag to reorder"
                    >
                      <GripVertical size={16} />
                    </button>
                  </TableCell>

                  <TableCell>
                    <div className="relative h-14 w-24 overflow-hidden border border-border bg-muted/30">
                      {study.thumbnailUrl ? (
                        <Image
                          src={study.thumbnailUrl}
                          alt={study.altText}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="max-w-[260px] truncate font-medium text-foreground">
                    {study.title}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {study.slug}
                  </TableCell>
                  <TableCell>{study.featured ? "Yes" : "No"}</TableCell>
                  <TableCell>{study.sortOrder ?? "-"}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(study.updatedAt)}</TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-2xl"
                        onClick={() => onEdit(study)}
                      >
                        <Pencil size={14} />
                        Edit
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="rounded-2xl"
                            disabled={deletingId === study._id}
                          >
                            <Trash2 size={14} />
                            Delete
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete this case study?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone and will remove the case study from homepage and listing pages.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(study._id)}
                              variant="destructive"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </section>
  );
}
