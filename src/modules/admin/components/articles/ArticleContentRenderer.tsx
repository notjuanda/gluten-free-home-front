import React from 'react';

interface ArticleContentRendererProps {
    content: string; // HTML generado por Draft.js
    className?: string;
}

const ArticleContentRenderer: React.FC<ArticleContentRendererProps> = ({ content, className }) => {
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default ArticleContentRenderer;
