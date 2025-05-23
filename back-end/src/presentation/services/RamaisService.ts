import { RamalRequestDTO } from '../../domain/types/Ramal.type.ts';
import { RamaisRepository } from '../repositories/RamaisRepository.ts';

export class RamaisService {
    private ramaisRepository: RamaisRepository;

    constructor() {
        this.ramaisRepository = new RamaisRepository();
    }

    async findAll() {
        const ramais = await this.ramaisRepository.findAll();
        return ramais.length ? ramais : { message: 'Nenhum ramal encontrado' };
    }

    async findById(id: number) {
        const ramal = await this.ramaisRepository.findById(id);
        return ramal || { message: 'Ramal não encontrado' };
    }

    async create(dto: RamalRequestDTO) {
        const existente = await this.ramaisRepository.findByRamal(dto.ramal);
        if (existente) {
            throw { status: 409, message: 'Este ramal já está cadastrado.' };
        }

        return await this.ramaisRepository.create(dto);
    }

    async update(id: number, dto: RamalRequestDTO) {
        const ramalAtual = await this.ramaisRepository.findById(id);
        if (!ramalAtual) {
            return { message: 'Ramal não encontrado' };
        }

        if (ramalAtual.ramal.toLowerCase() !== dto.ramal.toLowerCase()) {
            const existente = await this.ramaisRepository.findByRamal(dto.ramal);
            if (existente) {
                throw { status: 409, message: 'Este ramal já está cadastrado.' };
            }
        }

        return await this.ramaisRepository.update(id, dto);
    }

    async delete(id: number) {
        const ramal = await this.ramaisRepository.delete(id);
        if (!ramal) {
            return { message: 'Erro ao deletar ramal' };
        }

        return { message: 'Ramal excluído com sucesso!' };
    }
}
