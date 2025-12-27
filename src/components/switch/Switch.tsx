"use client";
import React from "react";

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  id?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export default function Switch({
  checked,
  onChange,
  id,
  label,
  disabled,
  className,
}: Props) {
  return (
    <label
      className={`flex items-center justify-between gap-3 cursor-pointer ${disabled ? "opacity-60 cursor-not-allowed" : ""
        } ${className ?? ""}`}
    >
      {label && <span className="text-sm">{label}</span>}
      <span className="relative inline-flex items-center">
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          aria-checked={checked}
          role="switch"
          disabled={disabled}
        />
        <span
          aria-hidden
          className={`h-6 w-11 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-gray-300"
            }`}
        />
        <span
          aria-hidden
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow
                      ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </span>
    </label>
  );
}
