"use client";

import { useEffect, useRef, useState } from "react";
import './fileUpload.css'; 

import { FaFilePdf, FaUpload } from "react-icons/fa";

type Props = {
    initialUrl?: string | null;
    onChange?: (file: File | null, previewUrl: string | null) => void;
};

export function FileUpload({ initialUrl = null, onChange }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(
        () => () => {
            if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
        },
        [preview]
    );

    function handlePick() {
        inputRef.current?.click();
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;

        // Limpa o preview antigo (se for um blob)
        if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);

        if (!file) {
            setPreview(null);
            setFile(null); // MUDANÇA: Limpar o estado do arquivo
            onChange?.(null, null);
            return;
        }

        // MUDANÇA: Lógica de preview
        setFile(file); // Guarda o objeto File
        let newPreviewUrl: string | null = null;

        if (file.type.startsWith("image/")) {
            // Se for imagem, cria o preview (blob)
            newPreviewUrl = URL.createObjectURL(file);
            setPreview(newPreviewUrl);
        } else {
            // Se for PDF (ou outro), não gera preview visual
            setPreview(null);
        }

        onChange?.(file, newPreviewUrl); // Avisa o pai
    }

    function clear() {
        // Limpa o preview (se for um blob)
        if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);

        setPreview(null);
        setFile(null); // MUDANÇA: Limpar o estado do arquivo
        if (inputRef.current) inputRef.current.value = "";
        onChange?.(null, null);
    }

    return (
        <div className="file-upload-container">
            {/* MUDANÇA: UI do preview atualizada */}
            <div className="file-preview-wrapper">
                {/* Caso 1: Temos um preview (imagem inicial ou blob) */}
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="file-preview-image"
                    />
                    /* Caso 2: Sem preview, mas temos um arquivo (é um PDF) */
                ) : file ? (
                    <div className="file-placeholder-icon">
                        <FaFilePdf />
                        <span>{file.name}</span>
                    </div>
                    /* Caso 3: Estado vazio (sem arquivo e sem preview) */
                ) : (
                    <div className="file-placeholder">
                        <FaUpload />
                        <span>Nenhum arquivo</span>
                    </div>
                )}
            </div>

            <div className="button-group">
                <input
                    ref={inputRef}
                    type="file"
                    // MUDANÇA: Aceita pdf e imagem
                    accept="image/*, application/pdf"
                    className="hidden-input"
                    onChange={handleFileChange}
                />
                <button
                    type="button"
                    onClick={handlePick}
                    className="btn btn-primary"
                >
                    Selecionar arquivo
                </button>
                <button
                    type="button"
                    onClick={clear}
                    className="btn btn-secondary"
                >
                    Remover
                </button>
            </div>
        </div>
    );
}