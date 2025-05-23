-- CreateTable
CREATE TABLE "ramais" (
    "id" SERIAL NOT NULL,
    "setor" TEXT NOT NULL,
    "ramal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ramais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ramais_ramal_key" ON "ramais"("ramal");
