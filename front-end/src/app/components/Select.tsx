import React from 'react';
import { Categoria } from '../types/respostas.types';

interface FiltragemPorCategoriaProps {
    categorias: Categoria[];
    onChange: (categoriaId: string) => void;
}

export const FiltragemPorCategoria = ({ categorias, onChange }: FiltragemPorCategoriaProps) => {
    const uniqueCategorias = Array.from(new Map(categorias.map(categoria => [categoria.id, categoria])).values());

    return (
        <div className='md:w-3xl flex justify-between items-center'>
            <p className='px-2 py-1.5 text-sm font-semibold'>Filtrar por categoria</p>
            <select
                className='flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-slate-300 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="Todas">Todas</option>
                {uniqueCategorias.map((categoria, index) => (
                    <option key={index} value={categoria.id}>{categoria.nome}</option>
                ))}
            </select>
        </div>
    );
};


