-- AlterTable
ALTER TABLE "Duvida" ADD COLUMN     "valorSugerido" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "curso" TEXT,
ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "formacao" TEXT,
ADD COLUMN     "instituicao" TEXT;

-- CreateTable
CREATE TABLE "Proposta" (
    "id" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "mensagem" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "duvidaId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proposta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_duvidaId_fkey" FOREIGN KEY ("duvidaId") REFERENCES "Duvida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
