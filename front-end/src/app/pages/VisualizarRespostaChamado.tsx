import { useEffect, useState } from 'react';
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '../components/Accordion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import RespostaService from '../services/RespostaService';
import { parseISO, format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Categoria, Resposta } from '../types/respostas.types';
import { FiltragemPorCategoria } from '../components/Select';
import { Search } from "lucide-react";

export function VisualizarRespostaChamado() {
    const [respostas, setRespostas] = useState<Resposta[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [titulo, setTitulo] = useState('');
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
    const service = new RespostaService();

    useEffect(() => {
        getRespostas();
    }, []);

    useEffect(() => {
        if (titulo.trim() === '') {
            if (categoriaSelecionada && categoriaSelecionada !== "Todas") {
                getRespostasByCategoria(categoriaSelecionada);
            } else {
                getRespostas();
            }
        } else {
            getRespostasByTitulo(titulo);
        }
    }, [titulo, categoriaSelecionada]);


    async function getRespostas() {
        try {
            const res = await service.getRespostas();
            setRespostas(res);

            const categoriasValidas = res
                .map((resposta: Resposta) => resposta.categorias)
                .filter((categoria: string) => categoria !== undefined && categoria !== null);

            setCategorias(categoriasValidas);
        } catch (error) {
            console.error("Erro ao buscar respostas:", error);
        }
    }

    async function getRespostasByTitulo(titulo: string) {
        try {
            let res;
            if (categoriaSelecionada && categoriaSelecionada !== "Todas") {
                res = await service.getRespostasByTituloECategoria(titulo, categoriaSelecionada);
            } else {
                res = await service.getRespostasByTitulo(titulo);
            }
            setRespostas(res);
        } catch (error) {
            console.error("Erro ao buscar respostas por título e categoria:", error);
        }
    }


    async function getRespostasByCategoria(categoria: string) {
        try {
            const categoria_id = categoria === "Todas" ? null : Number(categoria);
            if (categoria_id === null) {
                setCategoriaSelecionada(null);
                await getRespostas();
            } else {
                setCategoriaSelecionada(String(categoria_id));
                const res = await service.getRespostasByCategoria(String(categoria_id));
                setRespostas(res);
            }
        } catch (error) {
            console.error("Erro ao buscar respostas por categoria:", error);
        }
    }

    return (
        <div className='w-screen bg-[#c4d2eb77] h-screen flex flex-col overflow-y-auto space-y-4'>
            <Header />
            <div className='flex flex-col items-center h-fit p-10 space-y-2'>

                {/* Barra de Pesquisa */}
                <div className="relative w-full md:w-1/2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Pesquisar por título..."
                        className="w-full p-2 pl-10 border border-gray-400 rounded-lg focus:outline-none"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>

                <FiltragemPorCategoria categorias={categorias} onChange={getRespostasByCategoria} />
                <div className='flex flex-col items-center space-y-2 mb-8'>
                    {respostas.length > 0 ? (
                        respostas.map((duvida, index) => {
                            const dataCriacao = duvida.createdAt ? parseISO(duvida.createdAt) : null;
                            const dataFormatada = dataCriacao && isValid(dataCriacao)
                                ? format(dataCriacao, "dd/MM/yyyy", { locale: ptBR })
                                : "Data inválida";

                            return (
                                <AccordionRoot key={index}>
                                    <AccordionItem value={`item-${index}`}>
                                        <AccordionTrigger>
                                            <div className='flex w-full justify-between gap-2'>
                                                <p className='flex gap-2 items-center justify-center'>
                                                    {duvida.titulo}
                                                    {duvida.categorias && (
                                                        <span className='bg-[#3D4A7B] text-sm text-white px-2 py-1 rounded-md'>
                                                            {duvida.categorias.nome}
                                                        </span>
                                                    )}
                                                </p>
                                                <p className='text-gray-500'>{dataFormatada}</p>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className='flex flex-col space-y-2'>
                                                <div className='flex flex-col'>
                                                    <p className='font-semibold'>Descrição do problema:</p>
                                                    <p>{duvida.descricao || "Não informado"}</p>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <p className='font-semibold'>Causa do problema:</p>
                                                    <p>{duvida.causa || "Não informado"}</p>
                                                </div>
                                                <div className='flex flex-col space-y-2'>
                                                    <p className='font-semibold'>Resposta padrão:</p>
                                                    <p>{duvida.resposta || "Não informado"}</p>
                                                </div>
                                                <div className='flex flex-col space-y-2'>
                                                    <p className='font-semibold'>Passos para resolução:</p>
                                                    <p>{duvida.passos || "Não informado"}</p>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </AccordionRoot>
                            );
                        })
                    ) : (
                        <p className="text-gray-600 text-center mt-4">Nenhuma resposta encontrada.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
