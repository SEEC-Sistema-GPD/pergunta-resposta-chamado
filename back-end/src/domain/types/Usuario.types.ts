export type Usuario = {
    id: number;
    username: string;
    loginCode: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
};