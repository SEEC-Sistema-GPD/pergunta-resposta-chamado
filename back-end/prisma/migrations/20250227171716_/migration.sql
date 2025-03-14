-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deleted_records" (
    "id" TEXT NOT NULL,
    "categoria_id" TEXT,
    "titulo" TEXT,
    "descricao" TEXT,
    "causa" TEXT,
    "resposta" TEXT,
    "passos" TEXT,
    "data_exclusao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deleted_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "operacao" TEXT,
    "resposta_id" TEXT,
    "usuario" TEXT,
    "data_operacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "descricao" TEXT,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "respostas" (
    "id" TEXT NOT NULL,
    "categoria_id" TEXT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "causa" TEXT,
    "resposta" TEXT,
    "passos" TEXT,
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "respostas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "login_code" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "categorias"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "sqlite_autoindex_usuarios_1" ON "usuarios"("username");

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
