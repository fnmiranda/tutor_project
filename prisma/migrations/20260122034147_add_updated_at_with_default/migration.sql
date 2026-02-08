/*
  Warnings:

  - You are about to drop the column `cep` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Duvida" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Proposta" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "cep",
DROP COLUMN "endereco",
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "especialidades" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "estado" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
