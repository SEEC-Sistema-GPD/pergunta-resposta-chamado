/*
  Warnings:

  - Made the column `categoria_id` on table `respostas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descricao` on table `respostas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `causa` on table `respostas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resposta` on table `respostas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passos` on table `respostas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "respostas" DROP CONSTRAINT "respostas_categoria_id_fkey";

-- AlterTable
ALTER TABLE "respostas" ALTER COLUMN "categoria_id" SET NOT NULL,
ALTER COLUMN "descricao" SET NOT NULL,
ALTER COLUMN "causa" SET NOT NULL,
ALTER COLUMN "resposta" SET NOT NULL,
ALTER COLUMN "passos" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
