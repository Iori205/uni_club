"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = { name: "", email: "", phone: "", message: "" };

export function JoinForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate(values: FormState): FormErrors {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Нэрээ оруулна уу.";
    if (!values.email.trim()) next.email = "Имэйл хаягаа оруулна уу.";
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = "Имэйл хаяг буруу байна.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    // Backend/API энэ шатанд байхгүй тул хүсэлтийг зөвхөн UI дээр симуляц хийж байна.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 350);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <CheckCircle2 className="size-10 text-primary" aria-hidden="true" />
        <h2 className="font-serif text-xl font-normal text-foreground">
          Хүсэлт амжилттай илгээгдлээ
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Бид таны хүсэлтийг хүлээн авлаа. БСОН-ы төлөөлөгч удахгүй {form.email} хаягаар
          тантай холбогдох болно.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Нэр <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="h-11 rounded-xl border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          placeholder="Таны нэр"
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Имэйл <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="h-11 rounded-xl border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          placeholder="name@example.com"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-foreground">
          Утас
        </label>
        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
          className="h-11 rounded-xl border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          placeholder="99XX XXXX"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Сэтгэгдэл / Зорилго
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          rows={4}
          className="rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          placeholder="Яагаад БСОН-д нэгдэхийг хүсч байгаагаа бичнэ үү (сонголтоор)"
        />
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Илгээж байна..." : "Илгээх"}
      </Button>
    </form>
  );
}
