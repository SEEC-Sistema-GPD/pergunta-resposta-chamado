import { Perfil } from "../../domain/types/Usuario.type";

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        cpf: string;
        perfil: Perfil;
      };
    }
  }
}

export {};
