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
        catch (error) {
            alert('Erro ao buscar respostas');
        }
    }


    async getRespostaById(id: string) {
        const response = await this.httpCliente.get(`${this.url}/api/respostas/${id}`);
        if (!response) {
            throw new Error('Erro ao buscar respostas');
        }
        return response.data;
    }

    async getRespostasByCategoria(categoria: any) {
        const response = await this.httpCliente.get(`${this.url}/api/respostas/categoria/${categoria}`);
        if (!response) {
            throw new Error('Erro ao buscar respostas');
        }
        return response;
    }
}