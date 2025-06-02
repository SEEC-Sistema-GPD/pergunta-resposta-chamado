import AxiosAdapter from "../../infra/AxiosAdapter";
import IHttpClient from "../../infra/IHttpClient";

export default class RespostaService {
    httpCliente: IHttpClient;
    url: string;

    constructor() {
        this.httpCliente = new AxiosAdapter();
        this.url = import.meta.env.VITE_BACKEND_URL || "";
    }

    async getRespostas() {
        try {
            const response = await this.httpCliente.get(`${this.url}/api/respostas`);
            if (!response) {
                alert('Erro ao buscar respostas');
            }
            return response;
        }
        catch {
            alert('Erro ao buscar respostas');
        }
    }

    async getRespostaById(id: number) {
        const response = await this.httpCliente.get(`${this.url}/api/respostas/${id}`);
        if (!response) {
            throw new Error('Erro ao buscar respostas');
        }
        return response.data;
    }

    async getRespostasByCategoria(categoria: number) {
        const response = await this.httpCliente.get(`${this.url}/api/respostas/categoria/${categoria}`);
        if (!response) {
            throw new Error('Erro ao buscar respostas');
        }
        return response;
    }

    async getRespostasByTitulo(titulo: string) {
        const response = await this.httpCliente.get(`${this.url}/api/respostas/titulo/${titulo}`);
        if (!response) {
            throw new Error('Erro ao buscar respostas');
        }
        return response;
    }

    async getRespostasByTituloECategoria(titulo: string, categoria_id: string) {
        const categoria_id_number = parseInt(categoria_id, 10); 
        if (isNaN(categoria_id_number)) {
            throw new Error("ID da categoria inválido");
        }
        const response = await this.httpCliente.get(`${this.url}/api/respostas/titulo/${titulo}/categoria/${categoria_id_number}`);
        return response;
    }
}