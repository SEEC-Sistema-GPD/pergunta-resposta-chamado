import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { Resposta } from '../types/respostas.types';

interface CardRespostasProps {
    resposta: Resposta;
    isExpanded: boolean;
    onToggle: () => void;
    dataFormatada: string;
}

export function CardRespostas({ resposta, isExpanded, onToggle, dataFormatada }: CardRespostasProps) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Se futuramente for necessário baixar o arquivo diretamente no card, descomentar o código abaixo
    // function handleDownload(nomeSalvo: string, nomeOriginal: string, event: React.MouseEvent<HTMLButtonElement>) {
    //     event.preventDefault();

    //     const url = `${backendUrl}/api/respostas/download/${nomeSalvo}`;

    //     fetch(url)
    //         .then(async (response) => {
    //             if (!response.ok) throw new Error("Falha no download");

    //             const blob = await response.blob();
    //             const urlBlob = window.URL.createObjectURL(blob);
    //             const link = document.createElement('a');
    //             link.href = urlBlob;
    //             link.download = nomeOriginal;
    //             document.body.appendChild(link);
    //             link.click();
    //             link.remove();
    //             window.URL.revokeObjectURL(urlBlob);

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Sucesso!',
    //                 html: `O arquivo <strong>${nomeOriginal}</strong> foi baixado com sucesso.`,
    //                 confirmButtonText: 'OK',
    //             });
    //         })
    //         .catch(() => {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Erro!',
    //                 html: `Não foi possível baixar o arquivo <strong>${nomeOriginal}</strong>.`,
    //                 confirmButtonText: 'OK',
    //             });
    //         });
    // }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 w-full">
            <div
                className="flex justify-between items-start cursor-pointer"
                onClick={onToggle}
            >
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800">{resposta.titulo}</h3>
                    {resposta.categorias?.nome && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded w-fit">
                            {resposta.categorias.nome}
                        </span>
                    )}
                </div>

                <div className="flex flex-col items-end gap-2">
                    <span className="text-sm text-gray-500">{dataFormatada}</span>
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                </div>
            </div>

            {isExpanded && (
                <div className="mt-4 space-y-4 text-gray-700">
                    <div>
                        <h4 className="text-base md:text-lg font-medium mb-1">Descrição do Problema</h4>
                        <p className="whitespace-pre-wrap">{resposta.descricao || "Não informada"}</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-1">Causa do Problema</h4>
                        <p className="whitespace-pre-wrap">{resposta.causa || "Não informada"}</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-1">Passos para Resolução</h4>
                        <p className="whitespace-pre-wrap">{resposta.passos || "Não informado(s)"}</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-1">Resposta Padrão</h4>
                        <p className="whitespace-pre-wrap">{resposta.resposta || "Não informada"}</p>
                    </div>

                    {resposta.arquivos && resposta.arquivos.length > 0 && (
                        <div>
                            <h4 className="text-lg font-medium mb-1">Anexo(s)</h4>
                            <ul className="text-sm">
                                {resposta.arquivos.map((arquivo, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center rounded min-h-[48px]"
                                    >
                                        <p className="text-gray-800 truncate max-w-[70%]">{arquivo.nomeOriginal}</p>

                                        <a
                                            href={`${backendUrl}${arquivo.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <button
                                                className="w-[120px] h-[30px] text-sm cursor-pointer bg-[#3D4A7B] text-white px-4 py-2 rounded-lg hover:bg-[#2b365b] transition flex items-center justify-center gap-2"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Visualizar
                                            </button>
                                        </a>

                                        {/* Se futuramente for necessário baixar o arquivo diretamente no card, descomentar o código abaixo */}
                                        {/* <button
                                            onClick={(e) => handleDownload(arquivo.nomeSalvo, arquivo.nomeOriginal, e)}
                                        >
                                            <Download className="cursor-pointer w-5 h-5 stroke-[#3D4A7B] hover:stroke-[#2b365b]" />
                                        </button>  */}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
