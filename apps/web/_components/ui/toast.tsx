"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { cn } from "../../lib/utils";

type ToastVariant = "success" | "error";
type ToastItem = { id: number; message: string; variant: ToastVariant };
type ToastContextValue = {
  showToast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const AUTO_DISMISS_MS = 4000;

/** `<ToastProvider>` доторх хаанаас ч `showToast("...", "success" | "error")` дуудна. */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast() must be used within <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = ++idRef.current;
      setToasts((current) => [...current, { id, message, variant }]);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        role="region"
        aria-label="Мэдэгдлүүд"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-4 sm:items-end"
      >
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            onDismiss={() => dismiss(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: () => void;
}) {
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    const timeout = setTimeout(() => setLeaving(true), AUTO_DISMISS_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, []);

  const Icon = toast.variant === "success" ? CheckCircle2 : AlertCircle;

  return (
    <div
      role="status"
      aria-live="polite"
      onTransitionEnd={() => {
        if (leaving) onDismiss();
      }}
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border bg-card px-4 py-3 shadow-lg transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        toast.variant === "success" ? "border-border" : "border-red-200",
        entered && !leaving
          ? "translate-y-0 opacity-100 sm:translate-x-0"
          : "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4",
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 size-5 shrink-0",
          toast.variant === "success" ? "text-emerald-600" : "text-red-600",
        )}
        aria-hidden="true"
      />
      <p className="flex-1 text-sm text-foreground">{toast.message}</p>
      <button
        type="button"
        onClick={() => setLeaving(true)}
        aria-label="Мэдэгдэл хаах"
        className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
