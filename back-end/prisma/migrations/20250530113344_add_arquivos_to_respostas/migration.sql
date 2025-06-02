-- CreateTable
CREATE TABLE "arquivos" (
    "id" SERIAL NOT NULL,
    "nomeOriginal" TEXT NOT NULL,
    "nomeSalvo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tamanho" INTEGER NOT NULL,
    "mimetype" TEXT NOT NULL,
    "respostaId" INTEGER NOT NULL,

    CONSTRAINT "arquivos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "arquivos" ADD CONSTRAINT "arquivos_respostaId_fkey" FOREIGN KEY ("respostaId") REFERENCES "respostas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
