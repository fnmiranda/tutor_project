"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  initialUrl?: string | null;
  onChange?: (file: File | null, previewUrl: string | null) => void;
  maxMB?: number; // padrao 5
  allowed?: string[]; // padrao PNG/JPEG/WEBP
  minSizePx?: number; // checagem opcional (ex.: 128)
};

export default function AvatarUpload({
  initialUrl = null,
  onChange,
  maxMB = 5,
  allowed = ["image/png", "image/jpeg", "image/webp"],
  minSizePx = 0,
}: Props) {
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastBlobUrl = useRef<string | null>(null);

  // limpa URL blob anterior sempre que trocamos
  function setPreviewBlob(url: string | null) {
    if (lastBlobUrl.current && lastBlobUrl.current !== url) {
      URL.revokeObjectURL(lastBlobUrl.current);
    }
    lastBlobUrl.current = url?.startsWith("blob:") ? url : null;
    setPreview(url);
  }

  useEffect(() => {
    return () => {
      if (lastBlobUrl.current) URL.revokeObjectURL(lastBlobUrl.current);
    };
  }, []);

  function pick() {
    inputRef.current?.click();
  }

  function validateFile(file: File): string | null {
    if (!allowed.includes(file.type))
      return "formato invalido (use PNG, JPG ou WEBP)";
    if (file.size > maxMB * 1024 * 1024) return `arquivo maior que ${maxMB} MB`;
    return null;
  }

  async function checkDimensions(file: File): Promise<string | null> {
    if (!minSizePx) return null;
    const url = URL.createObjectURL(file);
    try {
      const ok = await new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () =>
          resolve(img.width >= minSizePx && img.height >= minSizePx);
        img.onerror = () => resolve(false);
        img.src = url;
      });
      return ok ? null : `imagem menor que ${minSizePx}x${minSizePx}px`;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function handleFiles(list: FileList | null) {
    const file = list?.[0] ?? null;
    if (!file) {
      setError(null);
      setPreviewBlob(null);
      onChange?.(null, null);
      return;
    }

    const v1 = validateFile(file);
    if (v1) {
      setError(v1);
      return;
    }

    const v2 = await checkDimensions(file);
    if (v2) {
      setError(v2);
      return;
    }

    setError(null);
    const url = URL.createObjectURL(file);
    setPreviewBlob(url);
    onChange?.(file, url);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    void handleFiles(e.target.files);
  }

  function clear() {
    setError(null);
    setPreviewBlob(null);
    if (inputRef.current) inputRef.current.value = "";
    onChange?.(null, null);
  }

  return (
    <div className="flex items-start gap-4">
      {/* preview circular */}
      <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-200 ring-1 ring-gray-300">
        {preview ? (
          <img
            src={preview}
            alt="pre-visualizacao do avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
            Avatar
          </div>
        )}
      </div>

      <div className="flex-1">
        {/* dropzone acessivel */}
        <div
          id="avatar-drop"
          role="button"
          tabIndex={0}
          onClick={pick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              pick();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            void handleFiles(e.dataTransfer.files);
          }}
          aria-describedby={error ? "avatar-err" : "avatar-hint"}
          aria-invalid={!!error}
          className={`relative rounded-lg border-2 border-dashed px-4 py-5 text-sm
              text-neutral-900 bg-white/80 outline-none transition
              border-blue-300 hover:bg-blue-50/40 focus:ring-4 focus:ring-blue-200
              ${drag ? "bg-blue-50/60 ring-2 ring-blue-200" : ""}`}
        >
          {/* conteudo real por cima da marca d’agua */}
          <p id="avatar-hint" className="relative z-[1]">
            Arraste sua foto aqui (tamanho max: {maxMB} MB)
          </p>
        </div>

        <input
          ref={inputRef}
          id="avatar-file"
          type="file"
          accept={allowed.join(",")}
          className="sr-only"
          onChange={onInputChange}
        />

        {error && (
          <p id="avatar-err" role="alert" className="mt-2 text-xs text-red-600">
            {error}
          </p>
        )}

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={pick}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Enviar foto
          </button>
          <button
            type="button"
            onClick={clear}
            disabled={!preview}
            className="rounded-md border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Remover
          </button>
          {/* status para leitor de tela */}
          <span className="sr-only" role="status" aria-live="polite">
            {preview ? "imagem selecionada" : "nenhuma imagem selecionada"}
          </span>
        </div>
      </div>
    </div>
  );
}
