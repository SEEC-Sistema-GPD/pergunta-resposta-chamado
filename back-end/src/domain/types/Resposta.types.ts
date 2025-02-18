export type Resposta = {
    id: string;
    categoria_id: string | null;
    titulo: string;
    descricao: string | null;
    causa: string | null;
    resposta: string | null;
    passos: string | null;
    data_criacao: Date | null;
};