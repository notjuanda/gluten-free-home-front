import React from 'react';
import type { ArticlePreviewRendererProps } from '../../types/articles-components.type';

// Función auxiliar para renderizar contenido de texto o arrays de texto
const renderContent = (content: any): string => {
    if (typeof content === 'string') return content;
    if (typeof content === 'object' && content !== null) {
        if (Array.isArray(content)) {
            // Si es un array de objetos tipo texto
            return content.map(renderContent).join(' ');
        }
        if (content.content && typeof content.content === 'string') {
            return content.content;
        }
        if (content.text && typeof content.text === 'string') {
            return content.text;
        }
        return JSON.stringify(content);
    }
    return String(content || '');
};

// Función para renderizar un segmento de texto SOLO con formato de link
const renderFormattedSegment = (segment: any, i: number) => {
    let el: React.ReactNode = segment.text;
    if (segment.format?.link) el = <a key={`l-${i}`} href={segment.format.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{el}</a>;
    return <React.Fragment key={i}>{el}</React.Fragment>;
};

// Renderizado recursivo de bloques (para listas anidadas y otros)
const renderBlockRecursively = (block: any, key?: React.Key): React.ReactNode => {
    if (!block) return null;
    // Compatibilidad con ambos formatos: editor y backend
    const type = block.type;
    const data = block.data || {};
    const content = block.content || [];

    // HEADINGS
    if (type.startsWith('heading')) {
        const level = parseInt(type.replace('heading', '')) || 1;
        const Tag = `h${level}`;
        return React.createElement(
            Tag,
            { key, className: `font-bold text-gray-900 mb-${7-level} mt-8 first:mt-0` },
            Array.isArray(content) ? content.map(renderFormattedSegment) : ''
        );
    }
    if (type === 'heading') {
        const level = data.attrs?.level || 1;
        const Tag = `h${level}`;
        const contentArr = Array.isArray(data.content) ? data.content : [];
        return React.createElement(
            Tag,
            { key, className: `font-bold text-gray-900 mb-${7-level} mt-8 first:mt-0` },
            contentArr.map(renderFormattedSegment)
        );
    }

    // PÁRRAFO
    if (type === 'paragraph') {
        // Soporta tanto content (editor) como data.content (backend)
        const segs = Array.isArray(content) && content.length > 0 ? content : (Array.isArray(data.content) ? data.content : [{ text: data.content || '', format: {} }]);
        return <p key={key} className="text-gray-700 leading-relaxed mb-6 text-lg">{segs.map ? segs.map(renderFormattedSegment) : renderContent(segs)}</p>;
    }

    // LISTAS
    if (type === 'list-unordered' || type === 'bulletList') {
        const items = data.items || (data.content ? data.content.map((item: any) => item.content?.[0]?.content?.[0]?.text || renderContent(item.content)) : []);
        return (
            <ul key={key} className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                {items.map((item: string, idx: number) => <li key={idx} className="text-lg leading-relaxed">{item}</li>)}
            </ul>
        );
    }
    if (type === 'list-ordered' || type === 'orderedList') {
        const items = data.items || (data.content ? data.content.map((item: any) => item.content?.[0]?.content?.[0]?.text || renderContent(item.content)) : []);
        return (
            <ol key={key} className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
                {items.map((item: string, idx: number) => <li key={idx} className="text-lg leading-relaxed">{item}</li>)}
            </ol>
        );
    }

    // CITA
    if (type === 'quote' || type === 'blockquote') {
        const author = data.author || '';
        const quoteContent = Array.isArray(content) && content.length > 0
            ? content.map(renderFormattedSegment)
            : (Array.isArray(data.content) ? data.content.map(renderFormattedSegment) : renderContent(data.content));
        return (
            <blockquote key={key} className="border-l-4 border-primary pl-4 italic text-gray-700 my-6">
                <div>{quoteContent}</div>
                {author && <footer className="text-right text-sm text-gray-500 mt-2">— {author}</footer>}
            </blockquote>
        );
    }

    // CÓDIGO
    if (type === 'code' || type === 'codeBlock') {
        const language = data.language || data.language || '';
        const codeContent = Array.isArray(content) && content.length > 0
            ? content.map(seg => seg.text).join('\n')
            : (data.content || '');
        return (
            <div key={key} className="my-6">
                {language && (
                    <div className="bg-gray-800 text-white px-4 py-2 rounded-t-lg text-sm font-mono">
                        {language}
                    </div>
                )}
                <pre className="bg-gray-900 text-green-400 p-4 rounded-b-lg overflow-x-auto">
                    <code className="text-sm font-mono">
                        {codeContent}
                    </code>
                </pre>
            </div>
        );
    }

    // IMAGEN
    if (type === 'image') {
        const src = data.url || data.attrs?.src || '';
        const alt = data.alt || data.attrs?.alt || 'Imagen del artículo';
        const caption = data.caption || data.caption || '';
        return (
            <figure key={key} className="my-12 flex flex-col items-center">
                <div className="bg-gray-100 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 w-full max-w-3xl">
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-auto object-contain rounded-2xl transition-all duration-300"
                        style={{ maxHeight: 480 }}
                    />
                </div>
                {caption && (
                    <figcaption className="text-center text-base text-gray-500 mt-3 italic max-w-2xl mx-auto">
                        {caption}
                    </figcaption>
                )}
            </figure>
        );
    }

    // Fallback
    return null;
};

const ArticlePreviewRenderer: React.FC<ArticlePreviewRendererProps> = ({ blocks }) => {
    if (!blocks || blocks.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>No hay contenido para mostrar</p>
            </div>
        );
    }
    return (
        <article className="prose prose-lg max-w-none">
            <div className="space-y-4">
                {blocks.map((block, index) => renderBlockRecursively(block, index))}
            </div>
        </article>
    );
};

export default ArticlePreviewRenderer; 