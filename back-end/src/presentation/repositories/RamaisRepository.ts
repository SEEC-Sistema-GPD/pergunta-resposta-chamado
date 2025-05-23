import { Ramal, RamalRequestDTO } from '../../domain/types/Ramal.type.ts';
import { prisma } from "../../infra/database/prisma.ts";

export class RamaisRepository {
    async findAll(): Promise<Ramal[]> {
        return prisma.ramais.findMany({
            where: { deletedAt: null },
        });
    }

    async findById(id: number): Promise<Ramal | null> {
        return prisma.ramais.findUnique({ where: { id } });
    }

    async create(dto: RamalRequestDTO): Promise<Ramal> {
        return prisma.ramais.create({
            data: {
                setor: dto.setor,
                ramal: dto.ramal,
            },
        });
    }

    async update(id: number, dto: RamalRequestDTO): Promise<Ramal> {
        return prisma.ramais.update({
            where: { id },
            data: {
                setor: dto.setor,
                ramal: dto.ramal,
            },
        });
    }

    async delete(id: number): Promise<Ramal> {
        return prisma.ramais.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }

    async findByRamal(ramal: string): Promise<Ramal | null> {
        return prisma.ramais.findFirst({
            where: {
                ramal: {
                    equals: ramal,
                    mode: 'insensitive',
                },
                deletedAt: null,
            },
        });
    }
}
