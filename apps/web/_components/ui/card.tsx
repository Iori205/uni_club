import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-[24px] border border-[#e1e8f0] bg-white shadow-[0_8px_24px_rgba(31,55,88,0.045)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-[#d4e0ed] hover:shadow-[0_18px_38px_rgba(31,55,88,0.09)] ${className}`}
      {...props}
    />
  );
}
