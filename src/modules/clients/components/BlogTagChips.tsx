import React from 'react';
import type { Tag } from '@/modules/core/types/tag.type';

interface Props {
    tags: Tag[];
    selected: number | null;
    onSelect: (id: number | null) => void;
}

const BlogTagChips: React.FC<Props> = ({ tags, selected, onSelect }) => {
    return (
        <div className="flex flex-wrap gap-3 mb-4">
        <button
            className={`px-4 py-2 rounded-full border text-sm shadow-sm transition-all duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 ${selected === null ? 'bg-primary text-white scale-105 shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:scale-105'}`}
            onClick={() => onSelect(null)}
        >
            Todos
        </button>
        {tags.map(tag => (
            <button
            key={tag.id}
            className={`px-4 py-2 rounded-full border text-sm shadow-sm transition-all duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 ${selected === tag.id ? 'bg-primary text-white scale-105 shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:scale-105'}`}
            onClick={() => onSelect(tag.id)}
            >
            {tag.nombre}
            </button>
        ))}
        </div>
    );
};

export default BlogTagChips; 