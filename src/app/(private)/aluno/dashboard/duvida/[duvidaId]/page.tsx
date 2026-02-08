'use client';

import { DuvidaDetalheAluno } from '@/components/AlunoDashboard/DuvidaDetalheAluno/DuvidaDetalheAluno';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function DuvidaDetalhePage() {
  const params = useParams();
  const [duvidaId, setDuvidaId] = useState<string>();
  useEffect(() => {
    // Verificamos se o params existe e qual o nome da chave
    // Dica: dê um console.log(params) para ver o nome exato da chave!
    if (params) {
      // console.log("Parâmetros da URL:", params);
      const id = params.id || params.duvidaId;
      setDuvidaId(id as string);
    }
  }, [params]);

  if (!duvidaId) {
    return <div>Carregando ID da atividade...</div>;
  }

  return (
      <DuvidaDetalheAluno duvidaId={duvidaId} />
  );
}
