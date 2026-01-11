// src/app/perfil/editar/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "@/components/Cards";
import Button from "@/components/Button";
import AvatarUpload from "@/components/Perfil/AvatarUpload/AvatarUpload";
import ProfileForm from "@/components/ProfileForm";

export default function EditarPerfilProfessorPage() {
  const router = useRouter();
  const handleSaved = () => router.push(".."); // volta para /perfil (relativo)

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Perfil</h1>
        {/* relativo a /perfil/editar → /perfil */}
        <Link href="..">
          <Button aria-label="Voltar">Voltar</Button>
        </Link>
      </div>

      <Card title="Foto do Perfil">
        <AvatarUpload />
        <p className="mt-2 text-xs text-gray-500">
          PNG ou JPG até 2&nbsp;MB. (Mock — sem envio ainda)
        </p>
      </Card>

      <ProfileForm onSaved={handleSaved} />
    </main>
  );
}
