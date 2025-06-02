export type Arquivo = {
    id: number;
    nomeOriginal: string;
    nomeSalvo: string;
    url: string;
    tamanho: number;
    mimetype: string;
    respostaId: number;
};

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
    arquivos: Arquivo[];
};

export type RespostaRequestDTO = {
    titulo: string;
    descricao: string;
    causa: string;
    resposta: string;
    passos: string;
    categoria_id: number;

    arquivos?: {
        nomeOriginal: string;
        nomeSalvo: string;
        url: string;
        tamanho: number;
        mimetype: string;
    }[];
};
