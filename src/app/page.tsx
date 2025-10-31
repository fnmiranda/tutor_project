import Image from "next/image";
import ProfessorDashboard from "../pages/dashboard/dashboard";
import PageProfessor from "@/pages/perfil_professor/perfil_professor";
import PersonalForms from "@/components/formulario/forms_personal_data";
export default function Home() {
  return (
    <div className="font-sans ">
      <main className="flex flex-col">
        <ProfessorDashboard />
        <PageProfessor />
        <PersonalForms />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
