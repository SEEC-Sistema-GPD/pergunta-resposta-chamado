-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "nome" TEXT NOT NULL,
    "super" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_usuarios" ("cpf", "createdAt", "deletedAt", "id", "nome", "updatedAt") SELECT "cpf", "createdAt", "deletedAt", "id", "nome", "updatedAt" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");
CREATE UNIQUE INDEX "usuarios_nome_key" ON "usuarios"("nome");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
