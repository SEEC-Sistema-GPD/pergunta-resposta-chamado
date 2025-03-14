/*
  Warnings:

  - The primary key for the `categorias` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `categorias` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `respostas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `respostas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id]` on the table `categorias` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `respostas` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `categoria_id` on the `respostas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "respostas" DROP CONSTRAINT "respostas_categoria_id_fkey";

-- AlterTable
ALTER TABLE "categorias" DROP CONSTRAINT "categorias_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "categorias_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "respostas" DROP CONSTRAINT "respostas_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "categoria_id",
ADD COLUMN     "categoria_id" INTEGER NOT NULL,
ADD CONSTRAINT "respostas_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_id_key" ON "categorias"("id");

-- CreateIndex
CREATE UNIQUE INDEX "respostas_id_key" ON "respostas"("id");

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
