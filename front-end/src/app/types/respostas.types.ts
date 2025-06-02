export type { Categoria, Resposta, Arquivo };

type Categoria = {
  id: string;
  nome: string;
};

type Arquivo = {
  nomeOriginal: string;
  nomeSalvo: string;
  url: string;
  tamanho: number;
  mimetype: string;
};

type Resposta = {
  id: string;
  categoria_id: string;
  titulo: string;
  descricao: string;
  causa: string;
  resposta: string;
  passos: string;
  createdAt: string;
  categorias: Categoria;
  arquivos?: Arquivo[];
};
