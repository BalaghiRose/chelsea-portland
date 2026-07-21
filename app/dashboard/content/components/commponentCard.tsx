import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  section: {
    _id: string;
    section: string;
    updatedAt?: number | null;
  };
}

function titleCase(value: string) {
  return value
    .split("-")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

export default function ContentCard({
  section,
}: Props) {
  return (
    <Link
      href={`/dashboard/content/${section.section}`}
      className="group border border-border bg-card p-6 transition-all hover:border-primary hover:bg-muted/40"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-lighter">
          {titleCase(section.section)}
        </h2>

        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Edit this homepage section.
      </p>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <span className="text-xs text-muted-foreground">
          Updated
        </span>

        <span className="text-xs font-medium">
          {section.updatedAt
            ? new Date(section.updatedAt).toLocaleDateString()
            : "New section"}
        </span>
      </div>
    </Link>
  );
}