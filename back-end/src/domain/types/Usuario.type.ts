export type Usuario = {
    id: number;
    nome: string;
    super: boolean;
    cpf: string;    
    createdAt: Date;  
    updatedAt: Date;
    deletedAt: Date | null;
};

export type UsuarioRequestDTO = {
    super: boolean;
};