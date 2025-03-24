import { ChevronDown, ChevronUp } from 'lucide-react';
import { Resposta } from '../types/respostas.types';

interface CardRespostasProps {
    resposta: Resposta;
    isExpanded: boolean;
    onToggle: () => void;
    dataFormatada: string;
}

export function CardRespostas({ resposta, isExpanded, onToggle, dataFormatada }: CardRespostasProps) {
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
                        <p>{resposta.descricao || "Não informado"}</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-1">Causa do problema</h4>
                        <p>{resposta.causa || "Não informada"}</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-1">Resposta padrão</h4>
                        <p>{resposta.resposta || "Não informada"}</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-1">Passos para resolução</h4>
                        <p>{resposta.passos || "Não informados"}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
