import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { getHeroImageUrl } from "@/lib/images";

export function DashboardHero() {
  return (
    <section className="relative max-w-full overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
      <ImageWithFallback
        src={getHeroImageUrl()}
        alt="Salvage yard aerial view"
        containerClassName="aspect-[21/9] min-h-[200px] sm:min-h-[260px]"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
      <div className="absolute inset-0 flex flex-col justify-center px-6 py-8 sm:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Yard Operations
        </p>
        <h1 className="mt-2 break-words font-heading text-2xl font-bold uppercase tracking-wide sm:text-4xl lg:text-5xl">
          <span className="text-gradient-amber">Command</span> Center
        </h1>
        <p className="mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
          Track vehicles, parts inventory, and sales — your salvage yard at a
          glance.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/vehicles/new" size="lg">
            <Plus className="size-4" />
            Add Vehicle
          </ButtonLink>
          <ButtonLink href="/parts/new" variant="outline" size="lg" className="border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10">
            <Plus className="size-4" />
            Add Part
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
