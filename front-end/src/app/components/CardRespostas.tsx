import { ChevronDown, ChevronUp } from 'lucide-react';
import { Resposta } from '../types/respostas.types';
import Swal from 'sweetalert2';

interface CardRespostasProps {
    resposta: Resposta;
    isExpanded: boolean;
    onToggle: () => void;
    dataFormatada: string;
}

export function CardRespostas({ resposta, isExpanded, onToggle, dataFormatada }: CardRespostasProps) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    function handleDownload(nomeSalvo: string, nomeOriginal: string, event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();

        const url = `${backendUrl}/api/respostas/download/${nomeSalvo}`;

        fetch(url)
            .then(async (response) => {
                if (!response.ok) throw new Error("Falha no download");

                const blob = await response.blob();
                const urlBlob = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = urlBlob;
                link.download = nomeOriginal;
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(urlBlob);

                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    html: `O arquivo <strong>${nomeOriginal}</strong> foi baixado com sucesso.`,
                    confirmButtonText: 'OK',
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    html: `Não foi possível baixar o arquivo <strong>${nomeOriginal}</strong>.`,
                    confirmButtonText: 'OK',
                });
            });
    }

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
                        <h4 className="text-base md:text-lg font-medium mb-1">Descrição do problema</h4>
                        <p className="whitespace-pre-wrap">{resposta.descricao || "Não informado"}</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-1">Causa do problema</h4>
                        <p className="whitespace-pre-wrap">{resposta.causa || "Não informada"}</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-1">Resposta padrão</h4>
                        <p className="whitespace-pre-wrap">{resposta.resposta || "Não informada"}</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-1">Passos para resolução</h4>
                        <p className="whitespace-pre-wrap">{resposta.passos || "Não informados"}</p>
                    </div>

                    {resposta.arquivos && resposta.arquivos.length > 0 && (
                        <div>
                            <h4 className="text-lg font-medium mb-1">Anexos</h4>
                            <ul className="list-disc list-inside text-blue-600 text-sm">
                                {resposta.arquivos.map((arquivo, index) => (
                                    <li key={index}>
                                        <a
                                            href={`${backendUrl}${arquivo.url}`}
                                            onClick={(e) => handleDownload(arquivo.nomeSalvo, arquivo.nomeOriginal, e)}
                                            className="underline hover:text-blue-800"
                                            rel="noopener noreferrer"
                                        >
                                            {arquivo.nomeOriginal}
                                        </a>
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
