"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "../../lib/utils";

type SafeImageProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Same footprint as a plain <img>, but on load failure swaps to a fallback
 * placeholder instead of the browser's broken-image icon, so a bad/missing
 * mock image URL never breaks the page layout.
 */
export function SafeImage({ src, alt, className }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "max-w-full flex items-center justify-center bg-secondary text-muted-foreground",
          className,
        )}
      >
        <ImageOff className="size-6" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("max-w-full", className)}
      onError={() => setFailed(true)}
    />
  );
}
