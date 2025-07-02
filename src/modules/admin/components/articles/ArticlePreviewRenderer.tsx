import React from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import type { ArticlePreviewRendererProps } from '../../types/articles-components.type';

// Función para convertir bloques del backend al formato de TipTap
const convertBackendToTipTapFormat = (backendBlocks: any[]): any => {
    if (!backendBlocks || backendBlocks.length === 0) {
        return {
            type: 'doc',
            content: [
                { type: 'paragraph', content: [{ type: 'text', text: '\u00A0' }] }
            ]
        };
    }

    const content = backendBlocks.map((block, index) => {
        const { type, data } = block;
        
        switch (type) {
            case 'paragraph':
                const paragraphContent = Array.isArray(data.content) ? data.content.map((node: any) => {
                    if (node.type === 'text') {
                        return { type: 'text', text: node.text || '\u00A0' };
                    } else if (node.type === 'link') {
                        // Convertir a nodo de texto con mark de link
                        return {
                            type: 'text',
                            text: node.content?.[0]?.text || 'Enlace',
                            marks: [
                                {
                                    type: 'link',
                                    attrs: { href: node.attrs?.href || '' }
                                }
                            ]
                        };
                    }
                    return node;
                }) : [{ type: 'text', text: data.content || '\u00A0' }];
                return {
                    type: 'paragraph',
                    content: paragraphContent
                };
                
            case 'heading':
                const headingContent = Array.isArray(data.content) ? data.content.map((node: any) => {
                    if (node.type === 'text') {
                        return { type: 'text', text: node.text || '\u00A0' };
                    } else if (node.type === 'link') {
                        return {
                            type: 'text',
                            text: node.content?.[0]?.text || 'Enlace',
                            marks: [
                                {
                                    type: 'link',
                                    attrs: { href: node.attrs?.href || '' }
                                }
                            ]
                        };
                    }
                    return node;
                }) : [{ type: 'text', text: data.content || '\u00A0' }];
                return {
                    type: 'heading',
                    attrs: { level: data.attrs?.level || 1 },
                    content: headingContent
                };
                
            case 'bulletList':
                return {
                    type: 'bulletList',
                    content: data.content?.map((item: any) => ({
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: Array.isArray(item.content) ? item.content.map((node: any) => {
                                if (node.type === 'text') {
                                    return { type: 'text', text: node.text || '\u00A0' };
                                } else if (node.type === 'link') {
                                    return {
                                        type: 'text',
                                        text: node.content?.[0]?.text || 'Enlace',
                                        marks: [
                                            {
                                                type: 'link',
                                                attrs: { href: node.attrs?.href || '' }
                                            }
                                        ]
                                    };
                                }
                                return node;
                            }) : [{ type: 'text', text: '\u00A0' }]
                        }]
                    })) || [{
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [{ type: 'text', text: '\u00A0' }]
                        }]
                    }]
                };
                
            case 'orderedList':
                return {
                    type: 'orderedList',
                    content: data.content?.map((item: any) => ({
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: Array.isArray(item.content) ? item.content.map((node: any) => {
                                if (node.type === 'text') {
                                    return { type: 'text', text: node.text || '\u00A0' };
                                } else if (node.type === 'link') {
                                    return {
                                        type: 'text',
                                        text: node.content?.[0]?.text || 'Enlace',
                                        marks: [
                                            {
                                                type: 'link',
                                                attrs: { href: node.attrs?.href || '' }
                                            }
                                        ]
                                    };
                                }
                                return node;
                            }) : [{ type: 'text', text: '\u00A0' }]
                        }]
                    })) || [{
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [{ type: 'text', text: '\u00A0' }]
                        }]
                    }]
                };
                
            case 'blockquote':
                return {
                    type: 'blockquote',
                    content: [{
                        type: 'paragraph',
                        content: [{ type: 'text', text: data.content || '\u00A0' }]
                    }]
                };
                
            case 'codeBlock':
                return {
                    type: 'codeBlock',
                    content: [{ type: 'text', text: data.content || '\u00A0' }]
                };
                
            case 'image':
                return {
                    type: 'image',
                    attrs: {
                        src: data.attrs?.src || '',
                        alt: data.attrs?.alt || '',
                        title: data.caption || ''
                    }
                };
                
            default:
                return {
                    type: 'paragraph',
                    content: [{ type: 'text', text: '\u00A0' }]
                };
        }
    });

    return {
        type: 'doc',
        content
    };
};

// CSS extra para la vista previa (solo afecta la vista previa, no el editor)
const previewCustomStyles = `
.tiptap-preview h1 { font-size: 2.5em; font-weight: 700; margin-bottom: 0.6em; }
.tiptap-preview h2 { font-size: 2em; font-weight: 700; margin-bottom: 0.5em; }
.tiptap-preview h3 { font-size: 1.5em; font-weight: 700; margin-bottom: 0.4em; }
.tiptap-preview h4 { font-size: 1.25em; font-weight: 600; margin-bottom: 0.3em; }
.tiptap-preview h5 { font-size: 1.1em; font-weight: 600; margin-bottom: 0.2em; }
.tiptap-preview h6 { font-size: 1em; font-weight: 600; margin-bottom: 0.1em; }
.tiptap-preview ul, .tiptap-preview ol { margin: 1em 0; padding-left: 1.5em; }
.tiptap-preview ul li, .tiptap-preview ol li { margin-bottom: 0.2em; }
.tiptap-preview ul p, .tiptap-preview ol p { margin-bottom: 0; display: inline; }
`;

const ArticlePreviewRenderer: React.FC<ArticlePreviewRendererProps> = ({ blocks }) => {
    const tipTapContent = convertBackendToTipTapFormat(blocks);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: {
                    HTMLAttributes: {
                        class: 'text-gray-700 leading-relaxed mb-6 text-lg',
                    },
                },
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                    HTMLAttributes: {
                        class: '', // Usamos CSS para los tamaños
                    },
                },
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc list-inside',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal list-inside',
                    },
                },
                listItem: {
                    HTMLAttributes: {
                        class: '',
                    },
                },
                blockquote: {
                    HTMLAttributes: {
                        class: 'border-l-4 border-primary pl-4 italic text-gray-700 my-6',
                    },
                },
                codeBlock: {
                    HTMLAttributes: {
                        class: 'bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-6',
                    },
                },
            }),
            Link.configure({ 
                openOnClick: true,
                HTMLAttributes: {
                    class: 'text-blue-600 underline hover:text-blue-800 cursor-pointer',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
                validate: href => /^https?:\/\//.test(href),
                protocols: ['http', 'https', 'mailto', 'tel'],
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'w-full h-auto object-contain rounded-2xl transition-all duration-300 my-12',
                    style: 'max-height: 480px;',
                },
            }),
        ],
        content: tipTapContent,
        editable: false, // Modo de solo lectura
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none tiptap-preview',
            },
        },
    });

    if (!blocks || blocks.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>No hay contenido para mostrar</p>
            </div>
        );
    }
    
    return (
        <article className="prose prose-lg max-w-none tiptap-preview">
            <style>{previewCustomStyles}</style>
            <EditorContent editor={editor} />
        </article>
    );
};

export default ArticlePreviewRenderer; 