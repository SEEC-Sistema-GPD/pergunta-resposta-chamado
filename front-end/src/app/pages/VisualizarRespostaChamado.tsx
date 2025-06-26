import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import RespostaService from '../services/RespostaService';
import { parseISO, format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Categoria, Resposta } from '../types/respostas.types';
import { FiltragemPorCategoria } from '../components/FiltragemPorCategoria';
import { CardRespostas } from '../components/CardRespostas';
import { BarraDePesquisa } from '../components/BarraDePesquisa';
import { useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';

export function VisualizarRespostaChamado() {
    const [respostas, setRespostas] = useState<Resposta[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [titulo, setTitulo] = useState('');
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const navigate = useNavigate();
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
                const res = await service.getRespostasByCategoria(categoria_id);
                setRespostas(res);
            }
        } catch (error) {
            console.error("Erro ao buscar respostas por categoria:", error);
        }
    }

    return (
        <div className='w-screen bg-[#c4d2eb77] min-h-screen flex flex-col space-y-4'>
            <Header />
            <div className='flex flex-col items-center'>

                <div className="flex flex-col md:flex-row justify-center items-center p-2 gap-4 w-full md:w-[55%]">
                    {/* Barra de Pesquisa */}
                    <div className="w-full md:w-[60%]">
                        <BarraDePesquisa
                            value={titulo}
                            onChange={setTitulo}
                            placeholder="Pesquisar por título..."
                        />
                    </div>

                    {/* Filtro por Categoria */}
                    <div className="w-full md:w-[40%]">
                        <FiltragemPorCategoria
                            categorias={categorias}
                            onChange={getRespostasByCategoria}
                        />
                    </div>

                    {/* Botão de Ramais */}
                    <div>
                        <button
                            onClick={() => navigate('/gerenciar-telefones')}
                            className="cursor-pointer bg-[#3D4A7B] text-white px-4 py-2 rounded-lg hover:bg-[#2b365b] transition flex items-center gap-2"
                        >
                            <FaPhoneAlt className="text-lg" />
                            Telefones
                        </button>
                    </div>
                </div>

                <div className='flex flex-col items-center space-y-2 p-2 w-full md:w-[55%]'>
                    {respostas.length > 0 ? (
                        respostas.map((resposta, index) => {
                            const isExpanded = expandedIndex === index;

                            const dataCriacao = resposta.createdAt ? parseISO(resposta.createdAt) : null;
                            const dataFormatada = dataCriacao && isValid(dataCriacao)
                                ? format(dataCriacao, "dd/MM/yyyy HH:mm", { locale: ptBR })
                                : "Data inválida";

                            const handleToggle = () => {
                                setExpandedIndex(isExpanded ? null : index);
                            };

                            return (
                                <CardRespostas
                                    key={resposta.id || index}
                                    resposta={resposta}
                                    isExpanded={isExpanded}
                                    onToggle={handleToggle}
                                    dataFormatada={dataFormatada}
                                />
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
