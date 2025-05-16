export type Perfil = 'C' | 'R' | 'M'; // Usuário Comum, Administrador Restrito, Administrador Master

export type Usuario = {
  id: number;
  nome: string;
  cpf: string;
  perfil: Perfil;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type UsuarioRequestDTO = {
  perfil: Perfil;
};