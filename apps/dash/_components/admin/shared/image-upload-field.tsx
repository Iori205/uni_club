"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { ImagePlus, Pencil } from "lucide-react";
import { useAuthedFetch } from "../../../lib/use-authed-fetch";

type ImageUploadFieldProps = {
  value: string;
  onChange: (value: string) => void;
  alt: string;
};

const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp";

/** News/Event modal-д ижил зурган upload UX (dashed зона дээр дарж native file picker нээгдэх, сонгомогц preview) — хуваалцсан нэг эх сурвалж. */
export function ImageUploadField({ value, onChange, alt }: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const authedFetch = useAuthedFetch();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const openPicker = () => fileInputRef.current?.click();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // ижил файлыг дахин сонгоход ч onChange дахин дуудагдана
    if (!file) return;

    setUploading(true);
    setUploadError(false);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await authedFetch<{ url: string }>("/admin/uploads/image", {
        method: "POST",
        body: formData,
      });
      onChange(result.url);
    } catch {
      setUploadError(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        className="h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:ring-4 focus:ring-primary/20"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        onChange={handleFileChange}
        className="hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={openPicker}
          disabled={uploading}
          className="group relative block h-32 w-full max-w-full overflow-hidden rounded-lg border border-input transition-transform active:scale-[0.99] disabled:opacity-60"
        >
          <img
            src={value}
            alt={alt}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center gap-2 bg-foreground/0 font-medium text-transparent opacity-0 transition-all group-hover:bg-foreground/40 group-hover:text-white group-hover:opacity-100">
            <Pencil size={16} />
            {uploading ? "Байршуулж байна..." : "Зураг солих"}
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={openPicker}
          disabled={uploading}
          className="flex h-32 w-full max-w-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border text-muted-foreground transition-[color,border-color,transform] hover:border-primary hover:text-primary active:scale-[0.99] disabled:opacity-60"
        >
          <ImagePlus size={22} />
          <span className="text-xs font-medium">
            {uploading ? "Байршуулж байна..." : "Зураг сонгох (JPG, PNG, WebP)"}
          </span>
        </button>
      )}
      {uploadError && (
        <p role="alert" className="text-xs text-destructive">
          Зураг байршуулахад алдаа гарлаа. Дараа дахин оролдоно уу.
        </p>
      )}
    </>
  );
}
