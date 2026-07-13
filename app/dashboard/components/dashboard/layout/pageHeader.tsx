import { ReactNode } from "react";

interface PageHeaderProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-5 border-b border-border pb-5 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-primary">
          {title}
        </h1>

        {description && (
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
}