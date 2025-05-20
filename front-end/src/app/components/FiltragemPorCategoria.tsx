import { Categoria } from '../types/respostas.types';

interface FiltragemPorCategoriaProps {
    categorias: Categoria[];
    onChange: (categoriaId: string) => void;
}

export const FiltragemPorCategoria = ({ categorias, onChange }: FiltragemPorCategoriaProps) => {
    const uniqueCategorias = Array.from(new Map(categorias.map(categoria => [categoria.id, categoria])).values());

    return (
        <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs md:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="Todas">Todas as categorias</option>
            {uniqueCategorias.map((categoria, index) => (
                <option key={index} value={categoria.id}>{categoria.nome}</option>
            ))}
        </select>
    );
};
