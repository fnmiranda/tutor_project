import Link from "next/link";
import { TbError404Off } from "react-icons/tb";
export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col min-h-screen items-center justify-center gap-2 p-20 text-black">
        <span className="flex flex-row gap-4 items-center text-8xl italic font-bold font-mono">ERROR <TbError404Off size={128}/></span>
        <h1 className="text-2xl italic">Not Found in Tuno</h1>
        <p className="italic mb-8">Could not find requested page</p>
        <Link className="flex w-80 bg-blue-600 rounded-2xl p-2 text-white text- justify-center" href="..">Return to anterior path</Link>
      </div>
    </div>
  );
}
