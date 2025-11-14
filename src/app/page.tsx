import Image from "next/image";
import ProfessorDashboard from '../pages/dashboard/dashboard';
import PayModal from "@/components/Payment/PayConfirm/PayModal";

export default function Home() {
  return (
    <div className="font-sans ">
      <main className="flex flex-col">
        <PayModal />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
