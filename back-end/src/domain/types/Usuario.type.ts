export type Usuario = {
    id: number;
    cpf: string;
    createdAt: Date;  
    updatedAt: Date;
    deletedAt: Date | null;
    nome: string;
    super: boolean;
};

export type UsuarioRequestDTO = {
    super: boolean;
};