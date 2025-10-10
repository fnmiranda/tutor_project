import { useState } from "react";
import ProfileForm from "./ProfileForm";
import StarIcon from "../../components/icons/StarIcon";

type Tab = "estatisticas" | "dados" | "portfolio";

export default function PerfilTabs() {
  const [tab, setTab] = useState<Tab>("estatisticas");

  return (
    <section className="space-y-6">
      {/* Tabs */}
      <nav className="flex gap-2 border-b border-slate-200">
        <TabButton id="estatisticas" current={tab} onClick={setTab}>
          Estatísticas
        </TabButton>
        <TabButton id="dados" current={tab} onClick={setTab}>
          Dados
        </TabButton>
        <TabButton id="portfolio" current={tab} onClick={setTab}>
          Portfólio
        </TabButton>
      </nav>

      {/* Conteúdo */}
      {tab === "estatisticas" && <PerfilEstatisticas />}
      {tab === "dados" && <ProfileForm />}
      {tab === "portfolio" && <PerfilPortfolio />}
    </section>
  );
}

function TabButton(props: {
  id: Tab;
  current: Tab;
  onClick: (t: Tab) => void;
  children: React.ReactNode;
}) {
  const active = props.current === props.id;
  return (
    <button
      type="button"
      onClick={() => props.onClick(props.id)}
      className={[
        "px-3 py-2 text-sm rounded-t-md",
        active
          ? "bg-slate-100 font-medium border border-b-transparent border-slate-200"
          : "text-slate-600 hover:text-slate-800",
      ].join(" ")}
    >
      {props.children}
    </button>
  );
}

/** --- Conteúdo: Estatísticas (mock) quando for pegar do banco de dados de verdade tem que mexer nisso aqui --- */
function PerfilEstatisticas() {
  const cards = [
    { label: "Dúvidas respondidas", value: 47 },
    { label: "Dúvidas ativas", value: 8 },
    { label: "Alunos ajudados", value: 23 },
    { label: "Satisfação média", value: "4,7/5" },
  ];

  const reviews = [
    {
      id: 1,
      materia: "Física de reatores",
      texto:
        "Domínio completo do assunto e super atencioso. Tirou minhas dúvidas e explicou o passo a passo da resolução…",
      nome: "Ana",
      dias: 2,
      nota: 5,
    },
    {
      id: 2,
      materia: "Física de reatores",
      texto: "MUITO bom, indico demais",
      nome: "Ana",
      dias: 4,
      nota: 5,
    },
    {
      id: 3,
      materia: "(Ensino Médio) Matemática",
      texto:
        "O tutor resolveu muito bem a atividade, explicou os exercícios passo a passo e entregou muito antes do…",
      nome: "Luciana",
      dias: 15,
      nota: 5,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Cards superiores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-3xl font-bold text-blue-600 flex items-center gap-2">
              {c.value}
              {c.label === "Satisfação média" && (
                <StarIcon className="w-6 h-6 text-amber-400" />
              )}
            </p>
            <p className="text-slate-600">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Avaliações (antes do Resumo) */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Avaliações</h3>
          <button className="text-violet-600 text-sm hover:underline">
            Ver todas (mock)
          </button>
        </div>

        {/* carrossel no mobile, grid em md+ */}
        <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="min-w-[280px] max-w-[320px] md:min-w-0 md:max-w-none flex-shrink-0 border border-slate-200 rounded-lg p-4"
            >
              <p className="text-xs text-slate-500 mb-2">{r.materia}</p>

              {/* clamp de 3 linhas */}
              <p
                className="text-slate-700"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {r.texto}
              </p>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500" />
                  <div className="text-sm">
                    <p className="text-slate-800">{r.nome}</p>
                    <p className="text-slate-500 text-xs">Há {r.dias} dias</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${i < r.nota ? "" : "opacity-30"}`}
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Resumo (últimos 30 dias) */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-medium mb-2">Resumo (últimos 30 dias)</h3>
        <ul className="list-disc pl-5 text-slate-700 space-y-1">
          <li>Taxa de abandonos: 2% (mock)</li>
          <li>Taxa de aceitação: 92% (mock)</li>
        </ul>
      </div>
    </div>
  );
}
/** --- Conteúdo: Portfólio (mock simples) --- */
function PerfilPortfolio() {
  type Item = {
    id: number;
    titulo: string;
    tipo: "PDF" | "Vídeo" | "Link" | "Arquivo";
    url?: string; // pode ser blob: para preview
    status: "pending" | "saved";
    file?: File; // mock: guardo o File para futuro upload real
  };

  const [itens, setItens] = useState<Item[]>([
    {
      id: 1,
      titulo: "Apostila de Derivadas",
      tipo: "PDF",
      url: "#",
      status: "saved",
    },
    {
      id: 2,
      titulo: "Novo item (mock)",
      tipo: "Link",
      url: "#",
      status: "pending",
    },
  ]);

  const [dragActive, setDragActive] = useState(false);

  // --- helpers ---
  function guessTypeFromName(name: string): Item["tipo"] {
    const ext = name.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return "PDF";
    if (["mp4", "mov", "mkv", "avi", "webm"].includes(ext ?? ""))
      return "Vídeo";
    return "Arquivo";
  }

  function addFiles(files: FileList) {
    const newOnes: Item[] = Array.from(files).map((file) => ({
      id: Date.now() + Math.floor(Math.random() * 1000),
      titulo: file.name.replace(/\.[^/.]+$/, ""),
      tipo: guessTypeFromName(file.name),
      url: URL.createObjectURL(file), // preview (mock)
      status: "pending",
      file,
    }));
    setItens((prev) => [...newOnes, ...prev]);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  }
  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(true);
  }
  function onDragLeave() {
    setDragActive(false);
  }

  function saveItem(id: number) {
    setItens((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: "saved" } : it))
    );
  }
  function discardItem(id: number) {
    setItens((prev) => {
      const gone = prev.find((it) => it.id === id);
      if (gone?.url?.startsWith("blob:")) URL.revokeObjectURL(gone.url);
      return prev.filter((it) => it.id !== id);
    });
  }
  function saveAll() {
    setItens((prev) =>
      prev.map((it) =>
        it.status === "pending" ? { ...it, status: "saved" } : it
      )
    );
  }

  const pendingCount = itens.filter((i) => i.status === "pending").length;

  return (
    <div className="space-y-4">
      {/* Barra de ações + dropzone */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={[
          "relative rounded-lg p-4 border-2 flex items-center justify-between",
          dragActive
            ? "border-blue-400 bg-blue-50"
            : "border-dashed border-slate-300",
        ].join(" ")}
      >
        <div className="flex items-center gap-2">
          <p className="text-sm text-slate-600">
            Arraste arquivos aqui ou use o botão →
          </p>
          {pendingCount > 0 && (
            <span className="text-xs text-slate-500">
              {pendingCount} pendente{pendingCount > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="fileInput"
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />
          <label
            htmlFor="fileInput"
            className="bg-slate-600 text-white px-3 py-2 rounded-md cursor-pointer"
          >
            Adicionar item (mock)
          </label>

          {pendingCount > 0 && (
            <button
              onClick={saveAll}
              className="px-3 py-2 rounded-md border border-slate-300 text-sm"
            >
              Salvar todos
            </button>
          )}
        </div>

        {dragActive && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-blue-600 text-sm font-medium">
            Solte para adicionar
          </div>
        )}
      </div>

      {/* Lista/grade de itens */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {itens.map((it) => {
          const pending = it.status === "pending";
          return (
            <article
              key={it.id}
              className={[
                "bg-white p-4 rounded-lg shadow-sm border",
                pending
                  ? "border-slate-300 border-dashed opacity-60"
                  : "border-transparent",
              ].join(" ")}
            >
              <p className="text-sm text-slate-500">{it.tipo}</p>
              <h4 className="font-medium text-slate-800">{it.titulo}</h4>
              {it.url && (
                <a
                  href={it.url}
                  target="_blank"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Abrir
                </a>
              )}

              <div className="mt-3 flex items-center justify-end gap-2">
                {pending ? (
                  <>
                    <button
                      onClick={() => discardItem(it.id)}
                      className="text-slate-600 hover:text-slate-800 text-sm"
                    >
                      Descartar
                    </button>
                    <button
                      onClick={() => saveItem(it.id)}
                      className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-md"
                    >
                      Salvar
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-green-600 font-medium">
                    Salvo
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
