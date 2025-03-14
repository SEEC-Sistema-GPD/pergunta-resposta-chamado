/*
  Warnings:

  - Made the column `createdAt` on table `categorias` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `categorias` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `respostas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `respostas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categorias" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "respostas" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
