"use client";

import Image from "next/image";
import { useState } from "react";
import { Car } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  containerClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: ImageWithFallbackProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        containerClassName
      )}
    >
      {loading && !error && (
        <Skeleton className="absolute inset-0 size-full" />
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <Car className="size-12 text-muted-foreground/40" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover transition-opacity duration-300", className, loading ? "opacity-0" : "opacity-100")}
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      )}
    </div>
  );
}
