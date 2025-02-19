type Categoria = {
    id: string;
    nome: string;
}

type Resposta = {
    id: string;
    categoria_id: string;
    titulo: string;
    descricao: string;
    causa: string;
    resposta: string;
    passos: string;
    data_criacao: string; 
    categorias: Categoria;
}

export type { Categoria, Resposta };