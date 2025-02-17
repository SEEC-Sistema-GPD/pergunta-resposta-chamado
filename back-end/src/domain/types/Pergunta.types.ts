import { StatusPergunta } from '../enums/StatusPergunta.enum';

export type Pergunta = {
    id: string;
    titulo: string;
    conteudo?: string;
    status: StatusPergunta;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
};