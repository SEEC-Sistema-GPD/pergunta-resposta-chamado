import { Request, Response } from "express";
import ldap from "ldapjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid"; // Para gerar sessionId

dotenv.config();

const prisma = new PrismaClient();

export class AuthController {
  async auth(req: Request, res: Response) {
    const { username: cpf, password } = req.body; // Renomeando para cpf
    console.log("Authenticating user:", req.body);
    const ldapUsername = `${cpf}@EDUC.GOVRN`; // Usando CPF como username

    const client = ldap.createClient({
      url: process.env.LDAP_URL!,
      timeout: 5000,
      connectTimeout: 10000,
    });

    // Bind no servidor LDAP
    client.bind(
      process.env.LDAP_BIND_DN!,
      process.env.LDAP_BIND_CREDENTIALS!,
      async (bindErr) => {
        if (bindErr) {
          console.error("LDAP service bind failed:", bindErr);
          client.unbind();
          return res.status(500).send("Falha na conexão com o serviço LDAP");
        } else {
          console.log("LDAP service bind successful");

          const searchFilter = process.env.LDAP_SEARCH_FILTER!.replace(
            "{{cpf}}",
            cpf
          );
          console.log("Search filter:", searchFilter);
          // Substituindo pelo CPF
          const searchOptions = {
            filter: searchFilter,
            scope: "sub",
            attributes: ["dn", "displayName", "mail"], // Inclua 'mail' ou outro atributo único se necessário
          };
          console.log("Search options:", searchOptions);
          // Busca do usuário no LDAP
          client.search(
            process.env.LDAP_SEARCH_BASE!,
            searchOptions,
            async (err, search) => {
              if (err) {
                console.error("LDAP search failed:", err);
                client.unbind();
                return res.status(500).send("Falha na busca LDAP");
              }

              let userFound = false;
              let displayName = cpf; // Valor default caso não encontre no LDAP

              search.on("searchEntry", async (entry) => {
                console.log("User found:", entry.dn.toString());
                userFound = true;

                displayName =
                  entry.attributes.find((attr) => attr.type === "displayName")
                    ?.values[0] || cpf;
                const email =
                  entry.attributes.find((attr) => attr.type === "mail")
                    ?.values[0] || `${cpf}@educ.govrn`;

                // Verificar se o usuário existe na tabela User usando CPF
                console.log("Verificando se o usuário existe no banco de dados...");
                const user = await prisma.usuarios.findUnique({ where: { cpf } });

                if (!user) {
                  client.unbind();
                  return res.status(401).send("Usuário não registrado no sistema.");
                }

                // Encerrar sessão anterior se o usuário estiver logado
                //   if (user.logado) {
                //     // Limpar o sessionId anterior
                //     await prisma.user.update({
                //       where: { id: user.id },
                //       data: { logado: false, sessionId: null },
                //     });
                //     console.log(
                //       `Sessão anterior encerrada para o usuário CPF: ${cpf}`
                //     );
                //   }

                // Verificando as credenciais no LDAP
                client.bind(ldapUsername, password, async (bindErr) => {
                  if (bindErr) {
                    console.error("LDAP user bind failed:", bindErr);
                    client.unbind();
                    return res.status(401).send("Credenciais inválidas");
                  } else {
                    console.log("LDAP user bind successful");
                    client.unbind();

                    // Gerar um sessionId único
                    // const sessionId = uuidv4();

                    // Gerar o JWT com sessionId
                    // const token = jwt.sign(
                    //   // { id: user.id, role: user.role, sessionId }, // Payload
                    //   { id: user.id }, // Payload
                    //   process.env.JWT_SECRET!, // Chave secreta
                    //   { expiresIn: "1h" } // Tempo de expiração
                    // );

                    // Atualizar o status do usuário no banco de dados
                    // await prisma.usuarios.update({
                    //   where: { id: user.id },
                    //   data: { logado: true, sessionId },
                    // });

                    // Enviar o token e o nome do usuário na resposta
                    return res
                      .status(200)
                      .json({
                        message: "Autenticado",
                        // token,
                        displayName,
                        // sessionId,
                      });
                  }
                });
              });

              search.on("error", (err) => {
                console.error("LDAP search error:", err);
                client.unbind();
                return res.status(500).send("Erro na busca LDAP");
              });

              search.on("end", (result) => {
                if (!userFound) {
                  console.warn("Usuário não encontrado");
                  client.unbind();
                  return res.status(401).send("Usuário não encontrado");
                }
              });
            }
          );
        }
      }
    );

    client.on("error", (err) => {
      console.error("LDAP client error:", err);
      return res.status(500).send("Erro no cliente LDAP");
    });
  }
}