"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export const DEFAULT_SUBJECTS: Record<string, string[]> = {
  Graduacao: [
    "Calculo I",
    "Calculo II",
    "Calculo III",
    "Calculo IV",
    "Fisica I",
    "Fisica II",
    "Fisica III",
    "Fisica IV",
    "Algebra Linear",
    "Geometria Analitica",
    "Equacoes Diferenciais",
    "Probabilidade e Estatistica",
    "Resistencia dos Materiais",
    "Eletromagnetismo",
    "Termodinamica",
    "Mecanica dos Fluidos",
  ],
  "Ensino Medio": ["Fisica (EM)", "Matematica (EM)", "Quimica (EM)"],
  "Ensino Fundamental": ["Matematica (EF)", "Ciencias (EF)"],
};

type MateriasFieldProps = {
  id?: string;
  label?: string;
  value: string[]; // materias escolhidas
  onChange: (next: string[]) => void; // devolve array
  catalog?: Record<string, string[]>; // opcional, default abaixo
  placeholder?: string;
};

export default function MateriasField({
  id = "materias",
  label = "Materias",
  value,
  onChange,
  catalog = DEFAULT_SUBJECTS,
  placeholder = "Clique para escolher...",
}: MateriasFieldProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // string exibida (CSV)
  const csv = useMemo(() => value.join(", "), [value]);

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          readOnly
          value={csv}
          title={csv} // mostra a lista completa no hover
          onClick={() => setOpen(true)}
          role="button"
          aria-haspopup="dialog"
          aria-controls="materias-modal"
          className="w-full rounded-md border border-gray-300 px-3 pr-28 py-2
               text-sm outline-none focus:ring-2 focus:ring-black/10
               cursor-pointer bg-white overflow-hidden whitespace-nowrap text-ellipsis"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border px-2 py-1 text-xs z-10"
          aria-label="Abrir seletor de materias"
        >
          Escolher
        </button>
      </div>

      {open && (
        <MateriasModal
          initial={value}
          catalog={catalog}
          onClose={() => setOpen(false)}
          onApply={(next) => {
            onChange(next);
            setOpen(false);
            inputRef.current?.focus();
          }}
        />
      )}
    </div>
  );
}

/* ============== Modal acessivel ============== */
/* =================== Modal Acessivel (SUBSTITUIR) =================== */
function MateriasModal({
  initial,
  catalog,
  onClose,
  onApply,
}: {
  initial: string[];
  catalog: Record<string, string[]>;
  onClose: () => void;
  onApply: (sel: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState<Set<string>>(new Set(initial));
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const titleId = "materias-title";

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    // foca a busca apos montar
    requestAnimationFrame(() => searchRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  const flatList = useMemo(() => {
    const all = Object.entries(catalog).flatMap(([cat, items]) =>
      items.map((name) => ({ cat, name }))
    );
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter(
      ({ name, cat }) =>
        name.toLowerCase().includes(q) || cat.toLowerCase().includes(q)
    );
  }, [catalog, query]);

  function toggle(name: string) {
    setSel((s) => {
      const n = new Set(s);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });
  }
  function clearAll() {
    setSel(new Set());
  }
  function selectAllVisible() {
    const n = new Set(sel);
    flatList.forEach(({ name }) => n.add(name));
    setSel(n);
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        id="materias-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="absolute left-1/2 top-1/2 w-[min(680px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 shadow-xl outline-none"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 id={titleId} className="text-lg font-semibold">
            Selecionar materias
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border px-2 py-1 text-sm"
          >
            Fechar
          </button>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault(); // impede submit do form pai
            }}
            placeholder="Buscar (ex.: Calculo, Fisica, EM...)"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
          <button
            type="button"
            onClick={selectAllVisible}
            className="rounded-md border px-2 py-2 text-sm"
          >
            Selecionar visiveis
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="rounded-md border px-2 py-2 text-sm"
          >
            Limpar
          </button>
        </div>

        <div className="max-h-[50vh] overflow-auto rounded-md border p-3">
          {Object.entries(catalog).map(([cat, items]) => {
            const q = query.toLowerCase();
            const vis = items.filter(
              (n) =>
                !q ||
                n.toLowerCase().includes(q) ||
                cat.toLowerCase().includes(q)
            );
            if (!vis.length) return null;
            return (
              <div key={cat} className="mb-4">
                <div className="mb-2 text-sm font-medium text-gray-600">
                  {cat}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {vis.map((name) => {
                    const id = `mat-${name.replace(/\W+/g, "-")}`;
                    return (
                      <label
                        key={name}
                        htmlFor={id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          id={id}
                          type="checkbox"
                          className="size-4"
                          checked={sel.has(name)}
                          onChange={() => toggle(name)}
                        />
                        {name}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {flatList.length === 0 && (
            <p className="text-sm text-gray-500">Nenhuma materia encontrada.</p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {sel.size} selecionada(s)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-3 py-2 text-sm"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => onApply(Array.from(sel).sort())}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
