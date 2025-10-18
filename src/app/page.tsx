import Image from "next/image";
import ProfessorDashboard from "../pages/dashboard/dashboard";
import PerfilPage from "../pages/perfil";
import AlunoTabs from "../components/perfil_aluno/AlunoTabs";
export default function Home() {
  return (
    <div className="font-sans ">
      <main className="flex flex-col">
        <ProfessorDashboard />
        <PerfilPage />
        <AlunoTabs />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
