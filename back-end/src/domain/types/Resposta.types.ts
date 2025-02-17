export type Resposta = {
    id: string;
    titulo: string;
    descricao?: string;
    causa?: string;
    resposta?: string;
    passos?: string;
    usuario_id: number;
    categoria_id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
};