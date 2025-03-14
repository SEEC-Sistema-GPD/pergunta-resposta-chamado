/*
  Warnings:

  - You are about to drop the column `data_criacao` on the `respostas` table. All the data in the column will be lost.
  - You are about to drop the column `login_code` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `deleted_records` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "respostas" DROP CONSTRAINT "respostas_categoria_id_fkey";

-- DropIndex
DROP INDEX "sqlite_autoindex_usuarios_1";

-- AlterTable
ALTER TABLE "respostas" DROP COLUMN "data_criacao",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "login_code",
DROP COLUMN "username",
ADD COLUMN     "cpf" TEXT NOT NULL;

-- DropTable
DROP TABLE "deleted_records";

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
