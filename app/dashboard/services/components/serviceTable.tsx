"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
import type { DashboardService } from "./types";

interface ServiceTableProps {
	services: DashboardService[];
	loading: boolean;
	onEdit: (service: DashboardService) => void;
}

function formatDate(timestamp: number) {
	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(new Date(timestamp));
}

export default function ServiceTable({
	services,
	loading,
	onEdit,
}: ServiceTableProps) {
	const deleteService = useMutation(api.services.deleteService);
	const reorderServices = useMutation(api.services.reorderServices);
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [draggingId, setDraggingId] = useState<string | null>(null);

	const handleDelete = async (id: DashboardService["_id"]) => {
		setDeletingId(id);

		try {
			await deleteService({ id });
		} finally {
			setDeletingId(null);
		}
	};

	const handleDrop = async (targetId: DashboardService["_id"]) => {
		if (!draggingId || draggingId === targetId) {
			setDraggingId(null);
			return;
		}

		const ids = services.map((service) => service._id);
		const sourceIndex = ids.findIndex((id) => id === draggingId);
		const targetIndex = ids.findIndex((id) => id === targetId);

		if (sourceIndex === -1 || targetIndex === -1) {
			setDraggingId(null);
			return;
		}

		const reordered = [...ids];
		const [movedId] = reordered.splice(sourceIndex, 1);
		reordered.splice(targetIndex, 0, movedId);

		await reorderServices({ ids: reordered });
		setDraggingId(null);
	};

	return (
		<section className="overflow-hidden rounded-3xl border border-border bg-card">
			<div className="border-b border-border px-6 py-3 text-xs text-muted-foreground">
				Drag rows using the left handle to reorder services.
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-10" />
						<TableHead>Icon</TableHead>
						<TableHead>Thumbnail</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Alt Text</TableHead>
						<TableHead>Description Items</TableHead>
						<TableHead>Order</TableHead>
						<TableHead>Updated</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{loading ? (
						<TableRow>
							<TableCell colSpan={9} className="py-8 text-center text-muted-foreground">
								Loading services...
							</TableCell>
						</TableRow>
					) : null}

					{!loading && services.length === 0 ? (
						<TableRow>
							<TableCell colSpan={9} className="py-8 text-center text-muted-foreground">
								No services yet. Click Add Service to create your first one.
							</TableCell>
						</TableRow>
					) : null}

					{!loading
						? services.map((service) => (
								<TableRow
									key={service._id}
									onDragOver={(event) => event.preventDefault()}
									onDrop={() => handleDrop(service._id)}
									className={draggingId === service._id ? "opacity-60" : undefined}
								>
									<TableCell>
										<button
											type="button"
											draggable
											onDragStart={() => setDraggingId(service._id)}
											onDragEnd={() => setDraggingId(null)}
											className="cursor-grab text-muted-foreground hover:text-primary"
											aria-label="Drag to reorder"
										>
											<GripVertical size={16} />
										</button>
									</TableCell>
									<TableCell>
										<div className="relative h-12 w-12 overflow-hidden rounded-xl border border-border bg-muted/30">
											{service.iconUrl ? (
												<Image
													src={service.iconUrl}
													alt={service.title}
													fill
													className="object-contain"
												/>
											) : (
												<div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
													No icon
												</div>
											)}
										</div>
									</TableCell>
									<TableCell>
										<div className="relative h-14 w-24 overflow-hidden rounded-xl border border-border bg-muted/30">
											{service.thumbnailUrl ? (
												<Image
													src={service.thumbnailUrl}
													alt={service.altText}
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
									<TableCell className="font-medium text-foreground">
										{service.title}
									</TableCell>
									<TableCell className="max-w-[260px] truncate text-muted-foreground">
										{service.altText}
									</TableCell>
									<TableCell>{service.description.length}</TableCell>
									<TableCell>{service.sortOrder ?? "-"}</TableCell>
									<TableCell className="text-muted-foreground">
										{formatDate(service.updatedAt)}
									</TableCell>
									<TableCell>
										<div className="flex justify-end gap-2">
											<Button
												type="button"
												variant="outline"
												size="sm"
												className="rounded-2xl"
												onClick={() => onEdit(service)}
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
														disabled={deletingId === service._id}
													>
														<Trash2 size={14} />
														Delete
													</Button>
												</AlertDialogTrigger>

												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Delete this service?
														</AlertDialogTitle>
														<AlertDialogDescription>
															This action cannot be undone and will remove the service from the dashboard.
														</AlertDialogDescription>
													</AlertDialogHeader>

													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => handleDelete(service._id)}
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
