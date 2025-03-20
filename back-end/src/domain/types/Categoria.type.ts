export type Categoria = {
    id: number;
    nome: string;
    createdAt: Date;  
    updatedAt: Date | null;
    deletedAt: Date | null;
};

export type CategoriaRequestDTO = {
    nome: string;
    createdAt: Date; 
    updatedAt: Date; 
};