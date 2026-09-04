"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel: string;
  /** "panel" — цонхны бэлэн card хэлбэр (background/shadow/radius); "bare" — зөвхөн positioning, лайтбокс мэт transparent агуулгад зориулав. */
  variant?: "panel" | "bare";
  maxWidthClassName?: string;
  showCloseButton?: boolean;
};

/**
 * Дахин ашиглах боломжтой accessible dialog — backdrop fade + panel scale/translate,
 * Escape/backdrop click, focus trap + restore, body scroll lock, reduced-motion aware.
 * News/Event/Board дээрх шинэ modal хэрэгцээ (жишээ нь Lightbox) үүн дээр суурилна —
 * animation/a11y логикийг тус бүрд нь давхардуулахгүйн тулд.
 */
export function Modal({
  open,
  onClose,
  children,
  ariaLabel,
  variant = "panel",
  maxWidthClassName = "max-w-lg",
  showCloseButton = true,
}: ModalProps) {
  const [rendered, setRendered] = useState(open);
  const [entered, setEntered] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      setRendered(true);
      const raf = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(raf);
    }
    setEntered(false);
  }, [open]);

  useEffect(() => {
    if (!rendered) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [rendered]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (entered) panelRef.current?.focus();
  }, [entered]);

  function handleTransitionEnd() {
    if (!open) {
      setRendered(false);
      previouslyFocused.current?.focus();
    }
  }

  if (!rendered) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-foreground/40 transition-opacity duration-300 ease-out motion-reduce:transition-none",
          entered ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        onTransitionEnd={handleTransitionEnd}
        className={cn(
          "relative max-h-[90vh] w-full overflow-auto transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none focus:outline-none",
          maxWidthClassName,
          variant === "panel" && "rounded-2xl bg-card shadow-xl",
          entered ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0",
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Хаах"
            className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <X className="size-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
