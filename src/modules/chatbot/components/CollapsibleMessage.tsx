import React, { useState } from 'react';

interface CollapsibleMessageProps {
    text: string;
    maxLength?: number;
}

// Utilidad para convertir URLs en <a>
function linkify(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
        if (urlRegex.test(part)) {
            return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{part}</a>;
        }
        return part;
    });
}

export const CollapsibleMessage: React.FC<CollapsibleMessageProps> = ({ text, maxLength = 180 }) => {
    const [expanded, setExpanded] = useState(false);

    if (text.length <= maxLength) {
        return <span>{linkify(text)}</span>;
    }

    return (
        <span>
        {expanded ? linkify(text) : linkify(text.slice(0, maxLength) + '...')}
        <button
            className="ml-2 text-blue-500 underline text-xs"
            onClick={() => setExpanded(!expanded)}
            type="button"
        >
            {expanded ? 'Ver menos' : 'Ver más'}
        </button>
        </span>
    );
}; 