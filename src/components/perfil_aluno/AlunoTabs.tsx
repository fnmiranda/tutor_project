import { useState } from "react";

type Tab = "perfil" | "conta" | "carteira";

export default function AlunoTabs() {
  const [tab, setTab] = useState<Tab>("perfil");

  return (
    <section className="space-y-6">
      {/* Abas */}
      <nav className="flex gap-2" role="tablist">
        <TabButton id="perfil" current={tab} onClick={setTab}>
          Perfil
        </TabButton>
        <TabButton id="conta" current={tab} onClick={setTab}>
          Conta
        </TabButton>
        <TabButton id="carteira" current={tab} onClick={setTab}>
          Carteira
        </TabButton>
      </nav>

      {/* Conteúdo */}
      {tab === "perfil" && <AlunoPerfil />}
      {tab === "conta" && <AlunoConta />}
      {tab === "carteira" && <AlunoCarteira />}
    </section>
  );
}

function TabButton({
  id,
  current,
  onClick,
  children,
}: {
  id: Tab;
  current: Tab;
  onClick: (t: Tab) => void;
  children: React.ReactNode;
}) {
  const active = current === id;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => onClick(id)}
      className="transition-colors"
    >
      {children}
    </button>
  );
}

/* --------- Conteúdos --------- */

function AlunoPerfil() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Coluna esquerda: plano e upsell */}
      <aside className="space-y-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-2xl"></div>
            <div>
              <p className="text-sm text-slate-500">Meu plano</p>
              <p className="font-medium">Silva</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Coluna direita: informações acadêmicas */}
      <section className="md:col-span-2 bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-semibold">Informações acadêmicas</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Qual instituição você estuda?
            </label>
            <input
              type="text"
              placeholder="Ex.: IME - Instituto Militar de Engenharia"
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Qual é o seu curso?
            </label>
            <input
              type="text"
              placeholder="Ex.: Engenharia de Computação"
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Estado
              </label>
              <select className="w-full rounded-md border border-slate-300 px-3 py-2">
                <option>UF</option>
                <option>RJ</option>
                <option>SP</option>
                <option>MG</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Cidade
              </label>
              <select className="w-full rounded-md border border-slate-300 px-3 py-2">
                <option>Selecione</option>
              </select>
            </div>
          </div>

          <button className="mt-2 inline-flex bg-teal-600 hover:bg-teal-700 text-white rounded-full px-4 py-2">
            Salvar alterações
          </button>
        </div>
      </section>
    </div>
  );
}

function AlunoConta() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Dados pessoais */}
      <section className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-semibold">Dados pessoais</h3>

        <div>
          <label className="block text-sm text-slate-600 mb-1">Nome</label>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            defaultValue="Aluno Exemplo"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">E-mail</label>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50"
            defaultValue="aluno@exemplo.com"
            disabled
          />
          <p className="text-xs text-green-600 mt-1">✓ Verificado</p>
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">Celular</label>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50"
            defaultValue="(21) 98123-1234"
            disabled
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-rose-600 mt-1">✗ Não verificado</p>
            <button className="text-xs text-violet-700 hover:underline">
              Verificar agora
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">País</label>
          <select className="w-full rounded-md border border-slate-300 px-3 py-2">
            <option>Brasil</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">Moeda: Real (BRL)</p>
        </div>

        <button className="inline-flex bg-teal-600 hover:bg-teal-700 text-white rounded-full px-4 py-2">
          Salvar alterações
        </button>
      </section>

      {/* Criar senha */}
      <section className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-semibold">Criar uma senha</h3>

        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Nova senha
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Confirmar nova senha
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </div>

        <p className="text-xs text-slate-500">
          ✓ 1 letra &nbsp; ✓ 1 número &nbsp; ✓ 8 caracteres
        </p>

        <button className="inline-flex bg-teal-600 hover:bg-teal-700 text-white rounded-full px-4 py-2">
          Salvar alterações
        </button>
      </section>
    </div>
  );
}

function AlunoCarteira() {
  return (
    <section className="bg-white rounded-lg shadow-sm p-10 text-center space-y-4">
      <div className="text-6xl">#</div>
      <p className="text-slate-600">
        Sem transações ainda. Envie uma tarefa ou assine o Premium para começar.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-5 py-2">
          Enviar tarefa
        </button>
      </div>
    </section>
  );
}
