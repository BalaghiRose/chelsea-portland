import { FileText } from "lucide-react";

export default function ContentHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-3">
          <FileText className="h-7 w-7 text-primary" />

          <h1 className="text-3xl font-bold">
            Website Content
          </h1>
        </div>

        <p className="mt-2 text-muted-foreground">
          Manage homepage content without modifying code.
        </p>
      </div>
    </div>
  );
}