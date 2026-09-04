"use client";

import { useState } from "react";
import { Modal } from "../../ui/modal";

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
  const [open, setOpen] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const requestClose = () => setOpen(false);
  const handleConfirm = () => {
    if (confirming) return; // давхар дарахаас сэргийлнэ — ижил ID рүү 2 удаа DELETE илгээхгүй
    setConfirming(true);
    onConfirm();
  };

  return (
    <Modal
      open={open}
      onClose={requestClose}
      onExited={onCancel}
      role="alertdialog"
      labelledBy="confirm-dialog-title"
      describedBy="confirm-dialog-message"
      maxWidthClassName="max-w-sm"
    >
      <h2
        id="confirm-dialog-title"
        className="font-serif text-xl font-bold text-foreground"
      >
        {title}
      </h2>
      <p
        id="confirm-dialog-message"
        className="mt-2 text-sm text-muted-foreground"
      >
        {message}
      </p>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          onClick={requestClose}
          disabled={confirming}
          className="min-h-11 rounded-lg px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary active:scale-[0.98] disabled:opacity-50"
        >
          {cancelLabel}
        </button>
        <button
          onClick={handleConfirm}
          disabled={confirming}
          autoFocus
          className="min-h-11 rounded-lg bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90 active:scale-[0.98] disabled:opacity-50"
        >
          {confirming ? "Устгаж байна..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
