"use client";
import { useParams } from "next/navigation";
import DuvidaDetalhe from "../../../components/professorDashboard/DuvidaDetalhe";

export default function DuvidaPage() {
  const params = useParams();
  const duvidaId = params?.id ? (params.id as string) : "";

  return <DuvidaDetalhe duvidaId={duvidaId} />;
}