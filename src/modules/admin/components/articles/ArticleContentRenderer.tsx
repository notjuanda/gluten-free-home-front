import React from 'react';
import type { ArticleContentRendererProps } from '../../types/articles-components.type';

const ArticleContentRenderer: React.FC<ArticleContentRendererProps> = ({ content, className }) => {
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default ArticleContentRenderer;
