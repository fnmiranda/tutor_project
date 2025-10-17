import Image from "next/image";
import LoginPage from '../pages/Autenticação/Cadastro/cadastro';

export default function Home() {
  return (
    <div className="font-sans ">
      <main className="flex flex-col">
        <LoginPage/>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
       
      </footer>
    </div>
  );
}
