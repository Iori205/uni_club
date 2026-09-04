"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { cn } from "../../lib/utils";
import { Modal } from "./modal";
import { SafeImage } from "./safe-image";

type LightboxImageProps = {
  src: string;
  alt: string;
  /** SafeImage-д шууд дамжина — өмнөх хэмжээ/crop/radius бүрэн хэвээр. */
  className: string;
  /** Click target-ийн rounding-ийг доторх зурагтай тааруулна (hover overlay зөв clip хийгдэхийн тулд). */
  roundedClassName?: string;
  /** "full" — бүтэн өргөнтэй hero зураг (article, detail page); "content" — тогтмол хэмжээтэй avatar. */
  fit?: "full" | "content";
};

/** SafeImage дарахад бодит харьцаагаар нь fullscreen харуулах lightbox — Modal-ийг reuse хийнэ. */
export function LightboxImage({
  src,
  alt,
  className,
  roundedClassName = "",
  fit = "full",
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${alt} — томруулж харах`}
        className={cn(
          "group/lightbox relative overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2",
          fit === "full" ? "block w-full" : "inline-block shrink-0",
          roundedClassName,
        )}
      >
        <SafeImage src={src} alt={alt} className={className} />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-opacity duration-300 ease-out group-hover/lightbox:bg-foreground/10 group-hover/lightbox:opacity-100 group-focus-visible/lightbox:bg-foreground/10 group-focus-visible/lightbox:opacity-100 motion-reduce:transition-none"
        >
          <ZoomIn className="size-6 text-white drop-shadow-md" />
        </span>
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        ariaLabel={alt}
        variant="bare"
        maxWidthClassName="max-w-4xl"
      >
        <img
          src={src}
          alt={alt}
          className="max-h-[85vh] w-full rounded-lg object-contain"
        />
      </Modal>
    </>
  );
}
