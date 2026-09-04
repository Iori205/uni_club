"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** Гарах animation бүрэн дуусаад DOM-оос үнэхээр устах мөчид дуудагдана — эцэг нь энэ үед л бодитоор unmount хийж болно. */
  onExited?: () => void;
  children: ReactNode;
  ariaLabel?: string;
  labelledBy?: string;
  describedBy?: string;
  role?: "dialog" | "alertdialog";
  maxWidthClassName?: string;
  className?: string;
};

/**
 * Dash-ийн бүх modal (News/Event/Member форм, ConfirmDialog)-ийн нийтлэг accessible
 * dialog primitive — backdrop fade + panel scale/translate, Escape/backdrop click,
 * focus trap + restore, body scroll lock, reduced-motion aware. apps/web-ийн Modal-тай
 * ижил motion language (300ms, translate-y-2/scale-95) — animation логикийг form бүрд
 * давхардуулахгүйн тулд нэг эх сурвалж.
 */
export function Modal({
  open,
  onClose,
  onExited,
  children,
  ariaLabel,
  labelledBy,
  describedBy,
  role = "dialog",
  maxWidthClassName = "max-w-2xl",
  className,
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
      onExited?.();
    }
  }

  if (!rendered) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 [padding-bottom:max(1rem,env(safe-area-inset-bottom))]">
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-foreground/30 transition-opacity duration-300 ease-out motion-reduce:transition-none",
          entered ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        role={role}
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        onTransitionEnd={handleTransitionEnd}
        className={cn(
          "scrollbar-hide relative max-h-[92vh] w-full overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-xl transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none focus:outline-none",
          maxWidthClassName,
          entered ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
