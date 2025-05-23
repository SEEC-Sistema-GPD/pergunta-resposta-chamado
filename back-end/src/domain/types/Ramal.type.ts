export type Ramal = {
    id: number;
    setor: string;
    ramal: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type RamalRequestDTO = {
    setor: string;
    ramal: string;
};