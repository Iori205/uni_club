import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#20579d] text-white shadow-[0_8px_18px_rgba(32,87,157,0.16)] hover:-translate-y-0.5 hover:bg-[#174987] hover:shadow-[0_12px_24px_rgba(32,87,157,0.24)]",
  secondary:
    "border border-[#e1e7ef] bg-white text-[#243047] shadow-[0_6px_16px_rgba(31,55,88,0.06)] hover:-translate-y-0.5 hover:border-[#cbd8e7] hover:bg-[#f8fbfe] hover:shadow-[0_10px_22px_rgba(31,55,88,0.1)]",
  outline:
    "border border-white/50 bg-transparent text-white hover:-translate-y-0.5 hover:bg-white/10",
  ghost: "bg-transparent text-[#68758a] hover:text-[#20579d]",
};

export function Button({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`
        inline-flex
        h-10
        items-center
        justify-center
        rounded-full
        px-7
        text-sm
        font-semibold
        tracking-[-0.01em]
        transition-colors
        duration-200
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-[#20579d]

        ${variants[variant]}
        ${className}
      `}
      {...props}
    />
  );
}
