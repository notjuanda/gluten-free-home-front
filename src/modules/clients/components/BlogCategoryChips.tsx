import React from 'react';
import type { BlogCategory } from '@/modules/core/types/blog-category.type';

interface Props {
    categories: BlogCategory[];
    selected: number | null;
    onSelect: (id: number | null) => void;
}

const BlogCategoryChips: React.FC<Props> = ({ categories, selected, onSelect }) => {
    return (
        <div className="flex flex-wrap gap-3 mb-4">
        <button
            className={`px-4 py-2 rounded-full border text-sm shadow-sm transition-all duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 ${selected === null ? 'bg-primary text-white scale-105 shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:scale-105'}`}
            onClick={() => onSelect(null)}
        >
            Todas
        </button>
        {categories.map(cat => (
            <button
            key={cat.id}
            className={`px-4 py-2 rounded-full border text-sm shadow-sm transition-all duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 ${selected === cat.id ? 'bg-primary text-white scale-105 shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:scale-105'}`}
            onClick={() => onSelect(cat.id)}
            >
            {cat.nombre}
            </button>
        ))}
        </div>
    );
};

export default BlogCategoryChips; 