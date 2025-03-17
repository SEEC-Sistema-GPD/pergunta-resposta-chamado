import { Request, Response } from "express";
import ldap from "ldapjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

export class AuthController {
  async auth(req: Request, res: Response) {
    const { cpf: cpf, password: password } = req.body;
    const ldapUsername = `${cpf}@EDUC.GOVRN`;

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
          console.log("LDAP service bind successful (bind)");
          const searchFilter = process.env.LDAP_SEARCH_FILTER!.replace(
            "{{cpf}}",
            cpf
          );
          console.log("Search filter:", searchFilter);
          const searchOptions: ldap.SearchOptions = {
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

                // Verificando as credenciais no LDAP
                client.bind(ldapUsername, password, async (bindErr) => {
                  if (bindErr) {
                    console.error("LDAP user bind failed:", bindErr);
                    client.unbind();
                    return res.status(401).send("Credenciais inválidas");
                  } else {
                    console.log("LDAP user bind successful (auth)");
                    client.unbind();

                    // Gerar o JWT
                    const token = jwt.sign(
                      { id: user.id, cpf: user.cpf },  // Payload: informações que você quer embutir
                      process.env.JWT_SECRET!,         // Chave secreta para assinar o token
                      { expiresIn: '1h' }              // Tempo de expiração do token
                    );

                    // Atualizar o status do usuário no banco de dados
                    // await prisma.usuarios.update({
                    //   where: { id: user.id },
                    //   data: { logado: true, sessionId },
                    // });

                    console.log("displayName gerado:", displayName);
                    // Enviar o token e o nome do usuário na resposta
                    return res
                      .status(200)
                      .json({
                        message: "Autenticado via LDAP",
                        token,
                        displayName,
                      });

                    // Opcional: Armazene o token em um cookie (httpOnly para segurança):
                    // res.cookie("token", token, {
                    //   httpOnly: true,
                    //   maxAge: 3600000, // 1 hora em milissegundos
                    // });
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