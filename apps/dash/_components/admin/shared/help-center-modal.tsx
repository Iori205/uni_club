"use client";
import { useEffect } from "react";
import { AtSign, Mail, Phone, User } from "lucide-react";

const CONTACTS = [
  { icon: User, label: "Нэр", value: "Iori" },
  { icon: AtSign, label: "Instagram", value: "@iori" },
  { icon: Mail, label: "Gmail", value: "b.sodbilegt11@gmail.com" },
  { icon: Phone, label: "Утас", value: "+976 0000 0000" },
] as const;

/** Static мэдээлэл харуулах жижиг modal — action/close button шаардлагагүй, backdrop click/Escape-ээр хаагдана. */
export function HelpCenterModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-center-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="help-center-title"
          className="font-serif text-xl font-bold text-foreground"
        >
          Тусламжийн төв
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Асуудал гарвал доорх хаягаар холбогдоно уу.
        </p>
        <div className="mt-5 flex flex-col gap-2.5">
          {CONTACTS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-primary">
                <Icon size={16} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="truncate text-sm font-medium text-foreground">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
