export type Resposta = {
    id: number;
    titulo: string;
    descricao: string;
    causa: string;
    resposta: string;
    passos: string;
    categoria_id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};


export type RespostaRequestDTO = {
    titulo: string;
    descricao: string;
    causa: string;
    resposta: string;
    passos: string;
    categoria_id: number;
};