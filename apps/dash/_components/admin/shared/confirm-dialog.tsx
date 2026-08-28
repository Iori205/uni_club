"use client";

export function ConfirmDialog({
  title,
  message,
  confirmLabel = "Устгах",
  cancelLabel = "Цуцлах",
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4">
      <div
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
      >
        <h2
          id="confirm-dialog-title"
          className="font-serif text-xl font-bold text-foreground"
        >
          {title}
        </h2>
        <p id="confirm-dialog-message" className="mt-2 text-sm text-muted-foreground">
          {message}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            autoFocus
            className="rounded-lg bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
