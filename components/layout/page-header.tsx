import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  backHref,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        {backHref && (
          <ButtonLink variant="ghost" size="icon-sm" href={backHref} className="shrink-0">
            <ArrowLeft className="size-4" />
          </ButtonLink>
        )}
        <div className="min-w-0">
          <h1 className="break-words font-heading text-2xl font-semibold uppercase tracking-wide sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              {description}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
