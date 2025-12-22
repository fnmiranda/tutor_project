"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  initialUrl?: string | null;
  onChange?: (file: File | null, previewUrl: string | null) => void;
};

export default function AvatarUpload({ initialUrl = null, onChange }: Props) {
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(
    () => () => {
      // limpa URLs de blob ao desmontar
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    },
    [preview]
  );

  function handlePick() {
    inputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setPreview(null);
      onChange?.(null, null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(file, url);
  }

  function clear() {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    onChange?.(null, null);
  }

  return (
    <div className="flex items-center gap-4">
      {/* usar <img> pro blob; next/image é melhor p/ estáticos */}
      <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-200 ring-1 ring-gray-300">
        {preview ? (
          <img
            src={preview}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
            Avatar
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handlePick}
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Enviar foto
        </button>
        <button
          type="button"
          onClick={clear}
          className="rounded-md border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Remover
        </button>
      </div>
    </div>
  );
}
