import React, { useRef, useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { uploadBlockImage } from '../../../core/api/articles.api';
import { FiBold, FiItalic, FiList, FiType, FiMessageSquare, FiCode, FiImage, FiLink, FiX, FiChevronUp, FiChevronDown, FiTrash2, FiPlus } from 'react-icons/fi';
import { TextSelection } from 'prosemirror-state';

interface TipTapEditorProps {
    value: any;
    onChange: (json: any) => void;
}

const DEFAULT_CONTENT = {
    type: 'doc',
    content: [
        { type: 'paragraph', content: [{ type: 'text', text: '\u00A0' }] }
    ]
};

// Función auxiliar para extraer texto del contenido de TipTap
const extractTextFromContent = (content: any[]): string => {
    if (!content || !Array.isArray(content)) return '';
    
    return content.map((node: any) => {
        if (node.type === 'text') {
            // Reemplazar espacios no rompibles con espacios normales
            return node.text.replace(/\u00A0/g, ' ');
        } else if (node.type === 'link') {
            // Manejar enlaces - extraer el texto del contenido del enlace
            return node.content ? extractTextFromContent(node.content) : '';
        } else if (node.type === 'paragraph') {
            // Manejar párrafos anidados (en listas)
            return node.content ? extractTextFromContent(node.content) : '';
        } else if (node.content) {
            // Para cualquier otro nodo con contenido, extraer el texto
            return extractTextFromContent(node.content);
        }
        return '';
    }).join('');
};

// Función para convertir bloques del backend al formato de TipTap
const convertBackendToTipTapFormat = (backendBlocks: any[]): any => {
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
                            text: extractTextFromContent(node.content),
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
                return {
                    type: 'heading',
                    attrs: { level: data.attrs?.level || 1 },
                    content: [{ type: 'text', text: data.content || '\u00A0' }]
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
                                        text: extractTextFromContent(node.content),
                                        marks: [
                                            {
                                                type: 'link',
                                                attrs: { href: node.attrs?.href || '' }
                                            }
                                        ]
                                    };
                                } else if (node.type === 'paragraph') {
                                    // Si hay un párrafo anidado, extraer su contenido directamente
                                    return Array.isArray(node.content) ? node.content.map((nestedNode: any) => {
                                        if (nestedNode.type === 'text') {
                                            return { type: 'text', text: nestedNode.text || '\u00A0' };
                                        } else if (nestedNode.type === 'link') {
                                            return {
                                                type: 'text',
                                                text: extractTextFromContent(nestedNode.content),
                                                marks: [
                                                    {
                                                        type: 'link',
                                                        attrs: { href: nestedNode.attrs?.href || '' }
                                                    }
                                                ]
                                            };
                                        }
                                        return nestedNode;
                                    }) : [{ type: 'text', text: '\u00A0' }];
                                }
                                return node;
                            }).flat().filter((node: any) => {
                                // Filtrar nodos de texto vacíos
                                if (node.type === 'text') {
                                    return node.text && node.text.trim() !== '';
                                }
                                return true;
                            }) : [{ type: 'text', text: extractTextFromContent(item.content) || '\u00A0' }]
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
                                        text: extractTextFromContent(node.content),
                                        marks: [
                                            {
                                                type: 'link',
                                                attrs: { href: node.attrs?.href || '' }
                                            }
                                        ]
                                    };
                                } else if (node.type === 'paragraph') {
                                    // Si hay un párrafo anidado, extraer su contenido directamente
                                    return Array.isArray(node.content) ? node.content.map((nestedNode: any) => {
                                        if (nestedNode.type === 'text') {
                                            return { type: 'text', text: nestedNode.text || '\u00A0' };
                                        } else if (nestedNode.type === 'link') {
                                            return {
                                                type: 'text',
                                                text: extractTextFromContent(nestedNode.content),
                                                marks: [
                                                    {
                                                        type: 'link',
                                                        attrs: { href: nestedNode.attrs?.href || '' }
                                                    }
                                                ]
                                            };
                                        }
                                        return nestedNode;
                                    }) : [{ type: 'text', text: '\u00A0' }];
                                }
                                return node;
                            }).flat().filter((node: any) => {
                                // Filtrar nodos de texto vacíos
                                if (node.type === 'text') {
                                    return node.text && node.text.trim() !== '';
                                }
                                return true;
                            }) : [{ type: 'text', text: extractTextFromContent(item.content) || '\u00A0' }]
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
        content: content.length > 0 ? content : [{ type: 'paragraph', content: [{ type: 'text', text: '\u00A0' }] }]
    };
};

// Función para convertir el contenido de TipTap al formato del backend
const convertTipTapToBackendFormat = (tiptapContent: any): any[] => {
    if (!tiptapContent || !tiptapContent.content) return [];
    
    return tiptapContent.content.map((block: any, index: number) => {
        const { type, content, attrs } = block;
        const safeContent = Array.isArray(content) ? content : [];
        
        // Generar ID único
        const id = `block-${Date.now()}-${index}`;
        
        switch (type) {
            case 'paragraph':
                const paragraphContent = safeContent.map((node: any) => {
                    if (node.type === 'text') {
                        // Verificar si el texto tiene marks de enlace
                        if (node.marks && Array.isArray(node.marks)) {
                            const linkMark = node.marks.find((mark: any) => mark.type === 'link');
                            if (linkMark) {
                                return { 
                                    type: 'link', 
                                    attrs: { href: linkMark.attrs?.href || '' },
                                    content: [{ type: 'text', text: node.text.replace(/\u00A0/g, ' ') }]
                                };
                            }
                        }
                        return { type: 'text', text: node.text.replace(/\u00A0/g, ' ') };
                    } else if (node.type === 'link') {
                        const linkResult = { 
                            type: 'link', 
                            attrs: { href: node.attrs?.href || '' },
                            content: Array.isArray(node.content) ? node.content.map((linkContent: any) => {
                                if (linkContent.type === 'text') {
                                    return { type: 'text', text: linkContent.text.replace(/\u00A0/g, ' ') };
                                }
                                return linkContent;
                            }) : []
                        };
                        return linkResult;
                    }
                    return node;
                });
                return {
                    id,
                    type: 'paragraph',
                    data: {
                        content: paragraphContent
                    },
                    order: index + 1
                };
                
            case 'heading':
                return {
                    id,
                    type: 'heading',
                    data: {
                        attrs: { level: attrs?.level || 1 },
                        content: extractTextFromContent(safeContent)
                    },
                    order: index + 1
                };
                
            case 'bulletList':
                return {
                    id,
                    type: 'bulletList',
                    data: {
                        content: safeContent.map((item: any) => ({
                            type: 'listItem',
                            content: [{
                                type: 'paragraph',
                                content: [{ type: 'text', text: extractTextFromContent(item.content) }]
                            }]
                        }))
                    },
                    order: index + 1
                };
                
            case 'orderedList':
                return {
                    id,
                    type: 'orderedList',
                    data: {
                        content: safeContent.map((item: any) => ({
                            type: 'listItem',
                            content: [{
                                type: 'paragraph',
                                content: [{ type: 'text', text: extractTextFromContent(item.content) }]
                            }]
                        }))
                    },
                    order: index + 1
                };
                
            case 'blockquote':
                return {
                    id,
                    type: 'blockquote',
                    data: {
                        content: extractTextFromContent(safeContent)
                    },
                    order: index + 1
                };
                
            case 'codeBlock':
                return {
                    id,
                    type: 'codeBlock',
                    data: {
                        content: extractTextFromContent(safeContent)
                    },
                    order: index + 1
                };
                
            case 'image':
                return {
                    id,
                    type: 'image',
                    data: {
                        attrs: {
                            src: attrs?.src || '',
                            alt: attrs?.alt || ''
                        },
                        caption: attrs?.title || ''
                    },
                    order: index + 1
                };
                
            default:
                return {
                    id,
                    type: 'paragraph',
                    data: {
                        content: extractTextFromContent(safeContent)
                    },
                    order: index + 1
                };
        }
    });
};

const TipTapEditor: React.FC<TipTapEditorProps> = ({ value, onChange }) => {
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageAlt, setImageAlt] = useState('');
    const [imageCaption, setImageCaption] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [showLinkModal, setShowLinkModal] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');

    // Estado para el bloque seleccionado
    const [selectedBlockPos, setSelectedBlockPos] = useState<number | null>(null);
    const [showBlockControls, setShowBlockControls] = useState(false);

    const [currentValue, setCurrentValue] = useState<any>(() => {
        if (value && Array.isArray(value) && value.length > 0) {
            return convertBackendToTipTapFormat(value);
        }
        return DEFAULT_CONTENT;
    });

    const safeContent = currentValue;

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Configurar para que Enter funcione correctamente
                paragraph: {
                    HTMLAttributes: {
                        class: 'editor-paragraph',
                    },
                },
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                    HTMLAttributes: {
                        class: 'editor-heading',
                    },
                },
                bulletList: {
                    HTMLAttributes: {
                        class: 'editor-bullet-list',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'editor-ordered-list',
                    },
                },
                listItem: {
                    HTMLAttributes: {
                        class: 'editor-list-item',
                    },
                },
                blockquote: {
                    HTMLAttributes: {
                        class: 'editor-blockquote',
                    },
                },
                codeBlock: {
                    HTMLAttributes: {
                        class: 'editor-code-block',
                    },
                },
            }),
            Link.configure({ 
                openOnClick: true,
                HTMLAttributes: {
                    class: 'editor-link',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
                validate: href => /^https?:\/\//.test(href),
                protocols: ['http', 'https', 'mailto', 'tel'],
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'editor-image',
                },
            }),
        ],
        content: safeContent,
        onUpdate({ editor }) {
            const json = editor.getJSON();
            // Convertir el contenido de TipTap al formato del backend
            const backendBlocks = convertTipTapToBackendFormat(json);
            onChange(backendBlocks);
        },
        onSelectionUpdate({ editor }) {
            // Detectar el bloque actual basado en la selección
            const { from } = editor.state.selection;
            let blockPos = null;
            
            editor.state.doc.descendants((node, pos) => {
                if (node.type.name === 'doc') return true;
                // Solo considerar nodos de bloque (no inline)
                if (node.isBlock && from >= pos && from <= pos + node.nodeSize) {
                    blockPos = pos;
                    return false;
                }
                return true;
            });
            
            // Solo actualizar si realmente cambió el bloque seleccionado
            if (blockPos !== selectedBlockPos && blockPos !== null) {
                setSelectedBlockPos(blockPos);
            }
        },
        editorProps: {
            handleKeyDown: (view, event) => {
                // Manejar Enter para crear nuevos bloques desde cualquier tipo de bloque
                if (event.key === 'Enter' && !event.shiftKey) {
                    const { state } = view;
                    const { selection } = state;
                    const { $from } = selection;
                    
                    // Si estamos en una cita, salir de ella y crear un párrafo
                    if ($from.parent.type.name === 'blockquote') {
                        const pos = $from.after();
                        if (pos !== undefined) {
                            view.dispatch(state.tr.insert(pos, state.schema.nodes.paragraph.create()));
                            view.dispatch(state.tr.setSelection(TextSelection.near(state.doc.resolve(pos + 1))));
                            return true;
                        }
                    }
                    
                    // Si estamos en una lista, crear nuevo item de lista
                    if ($from.parent.type.name === 'listItem') {
                        // Dejar que TipTap maneje esto normalmente
                        return false;
                    }
                    
                    // Si estamos en un código, salir y crear párrafo
                    if ($from.parent.type.name === 'codeBlock') {
                        const pos = $from.after();
                        if (pos !== undefined) {
                            view.dispatch(state.tr.insert(pos, state.schema.nodes.paragraph.create()));
                            view.dispatch(state.tr.setSelection(TextSelection.near(state.doc.resolve(pos + 1))));
                            return true;
                        }
                    }
                }
                
                return false;
            },
            attributes: {
                class: 'prose max-w-none focus:outline-none min-h-[200px]',
            },
        },
    });

    // Actualizar el editor cuando cambie el value externo
    useEffect(() => {
        if (value && Array.isArray(value) && value.length > 0) {
            const tipTapContent = convertBackendToTipTapFormat(value);
            // Solo actualizar si el contenido es realmente diferente
            const currentContent = editor?.getJSON();
            const isContentDifferent = JSON.stringify(currentContent) !== JSON.stringify(tipTapContent);
            
            if (isContentDifferent) {
                setCurrentValue(tipTapContent);
                if (editor) {
                    // Guardar la posición actual del cursor
                    const { from } = editor.state.selection;
                    editor.commands.setContent(tipTapContent);
                    // Restaurar la posición del cursor si es válida
                    if (from < editor.state.doc.content.size) {
                        editor.commands.setTextSelection(from);
                    }
                }
            }
        } else {
            setCurrentValue(DEFAULT_CONTENT);
            if (editor) {
                editor.commands.setContent(DEFAULT_CONTENT);
            }
        }
    }, [value, editor]);

    // Modal para subir imagen al backend
    const handleImageUpload = async () => {
        if (!imageFile || !editor) return;
        setUploadingImage(true);
        try {
            const result = await uploadBlockImage(imageFile);
            // Construir la URL completa
            const imageUrl = result.url.startsWith('http') ? result.url : `${import.meta.env.VITE_API_BASE_URL}${result.url}`;
            editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt, title: imageCaption }).run();
            setShowImageModal(false);
            setImageFile(null);
            setImageAlt('');
            setImageCaption('');
        } catch (error) {
            console.error('Error al subir imagen:', error);
            alert('Error al subir la imagen');
        } finally {
            setUploadingImage(false);
        }
    };

    // Modal para agregar link
    const handleAddLink = () => {
        if (linkUrl && editor) {
            // Si hay texto seleccionado, aplicar el enlace a esa selección
            if (editor.state.selection.empty) {
                // Si no hay selección, insertar el enlace como texto
                editor.chain().focus().insertContent({
                    type: 'link',
                    attrs: { href: linkUrl },
                    content: [{ type: 'text', text: linkUrl }]
                }).run();
            } else {
                // Si hay selección, aplicar el enlace a la selección
                editor.chain().focus().setLink({ href: linkUrl }).run();
            }
            setShowLinkModal(false);
            setLinkUrl('');
        }
    };

    // Función para agregar un nuevo bloque al final
    const addParagraphBlock = () => {
        if (!editor) return;
        
        // Obtener la posición del final del documento
        const { state } = editor;
        const endPos = state.doc.content.size;
        
        // Insertar el nuevo párrafo al final
        editor.chain()
            .focus()
            .insertContentAt(endPos, { type: 'paragraph', content: [{ type: 'text', text: '\u00A0' }] })
            .run();
        
        // Mover el cursor al nuevo bloque
        setTimeout(() => {
            editor.commands.focus('end');
        }, 10);
    };

    // Función para cambiar el tipo de bloque actual
    const changeBlockType = (type: string, attrs: any = {}) => {
        if (!editor || selectedBlockPos === null) return;
        
        const { state } = editor;
        const node = state.doc.nodeAt(selectedBlockPos);
        if (!node) return;

        // Enfocar el bloque seleccionado primero
        editor.chain().focus().setNodeSelection(selectedBlockPos).run();

        if (type === 'paragraph') {
            editor.chain().focus().setNode('paragraph').run();
        } else if (type.startsWith('heading')) {
            const level = parseInt(type.replace('heading', ''));
            editor.chain().focus().setNode('heading', { level }).run();
        } else if (type === 'bulletList') {
            // Para listas, necesitamos envolver el contenido en bulletList y listItem
            editor.chain().focus().wrapIn('bulletList').run();
        } else if (type === 'blockquote') {
            editor.chain().focus().wrapIn('blockquote').run();
        } else if (type === 'codeBlock') {
            editor.chain().focus().setNode('codeBlock').run();
        }
        
        // Enfocar el editor después del cambio
        setTimeout(() => {
            editor.commands.focus();
        }, 10);
    };

    // Función para mover bloque arriba
    const moveBlockUp = () => {
        if (!editor || selectedBlockPos === null) return;
        
        const { state } = editor;
        const node = state.doc.nodeAt(selectedBlockPos);
        if (!node) return;

        // Encontrar el bloque anterior
        let prevPos = -1;
        state.doc.descendants((n, pos) => {
            if (pos < selectedBlockPos && n.type === node.type) {
                prevPos = pos;
            }
        });

        if (prevPos >= 0) {
            const tr = state.tr.delete(selectedBlockPos, selectedBlockPos + node.nodeSize)
                .insert(prevPos, node.copy(node.content));
            editor.view.dispatch(tr);
            setSelectedBlockPos(prevPos);
        }
    };

    // Función para mover bloque abajo
    const moveBlockDown = () => {
        if (!editor || selectedBlockPos === null) return;
        
        const { state } = editor;
        const node = state.doc.nodeAt(selectedBlockPos);
        if (!node) return;

        // Encontrar el siguiente bloque
        let nextPos = -1;
        state.doc.descendants((n, pos) => {
            if (pos > selectedBlockPos && nextPos === -1 && n.type === node.type) {
                nextPos = pos;
            }
        });

        if (nextPos > 0) {
            const tr = state.tr.delete(selectedBlockPos, selectedBlockPos + node.nodeSize)
                .insert(nextPos, node.copy(node.content));
            editor.view.dispatch(tr);
            setSelectedBlockPos(nextPos);
        }
    };

    // Función para eliminar bloque
    const deleteBlock = () => {
        if (!editor || selectedBlockPos === null) return;
        
        const { state } = editor;
        const node = state.doc.nodeAt(selectedBlockPos);
        if (!node) return;

        // Solo eliminar si hay más de un bloque
        if (state.doc.childCount > 1) {
            editor.chain().focus().setNodeSelection(selectedBlockPos).deleteSelection().run();
        }
    };

    // Obtener el tipo de bloque actual
    const getCurrentBlockType = () => {
        if (!editor || selectedBlockPos === null) return 'paragraph';
        const node = editor.state.doc.nodeAt(selectedBlockPos);
        return node?.type.name || 'paragraph';
    };

    // Inyectar estilos CSS para el editor
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .editor-heading {
                font-weight: 600;
                margin: 1em 0 0.5em 0;
                line-height: 1.2;
            }
            .editor-heading[data-level="1"] { 
                font-size: 2.5em !important; 
                font-weight: 700 !important;
            }
            .editor-heading[data-level="2"] { 
                font-size: 2em !important; 
                font-weight: 600 !important;
            }
            .editor-heading[data-level="3"] { 
                font-size: 1.5em !important; 
                font-weight: 600 !important;
            }
            .editor-heading[data-level="4"] { 
                font-size: 1.25em !important; 
                font-weight: 500 !important;
            }
            .editor-heading[data-level="5"] { 
                font-size: 1.1em !important; 
                font-weight: 500 !important;
            }
            .editor-heading[data-level="6"] { 
                font-size: 1em !important; 
                font-weight: 500 !important;
            }
            
            /* Estilos adicionales para asegurar que se apliquen */
            .ProseMirror h1 {
                font-size: 2.5em !important;
                font-weight: 700 !important;
                line-height: 1.2 !important;
            }
            .ProseMirror h2 {
                font-size: 2em !important;
                font-weight: 600 !important;
                line-height: 1.2 !important;
            }
            .ProseMirror h3 {
                font-size: 1.5em !important;
                font-weight: 600 !important;
                line-height: 1.2 !important;
            }
            .ProseMirror h4 {
                font-size: 1.25em !important;
                font-weight: 500 !important;
                line-height: 1.2 !important;
            }
            .ProseMirror h5 {
                font-size: 1.1em !important;
                font-weight: 500 !important;
                line-height: 1.2 !important;
            }
            .ProseMirror h6 {
                font-size: 1em !important;
                font-weight: 500 !important;
                line-height: 1.2 !important;
            }
            
            .editor-bullet-list {
                list-style-type: disc;
                margin: 0.5em 0;
                padding-left: 1.5em;
            }
            
            .editor-ordered-list {
                list-style-type: decimal;
                margin: 0.5em 0;
                padding-left: 1.5em;
            }
            
            .editor-list-item {
                margin: 0.25em 0;
            }
            
            .editor-blockquote {
                border-left: 4px solid #3b82f6;
                margin: 1em 0;
                padding-left: 1em;
                font-style: italic;
                color: #6b7280;
            }
            
            .editor-code-block {
                background-color: #f3f4f6;
                border-radius: 0.375rem;
                padding: 1rem;
                margin: 0.5em 0;
                overflow-x: auto;
                font-family: 'Courier New', Courier, monospace;
                font-size: 0.875em;
                line-height: 1.5;
            }
            
            .editor-link {
                color: #3b82f6 !important;
                text-decoration: underline !important;
                cursor: pointer !important;
            }
            
            .editor-link:hover {
                color: #2563eb !important;
                text-decoration: underline !important;
            }
            
            .editor-link:visited {
                color: #7c3aed !important;
            }
            
            /* Asegurar que los enlaces sean clickeables */
            .ProseMirror a {
                color: #3b82f6 !important;
                text-decoration: underline !important;
                cursor: pointer !important;
            }
            
            .ProseMirror a:hover {
                color: #2563eb !important;
            }
            
            .ProseMirror a:visited {
                color: #7c3aed !important;
            }
            
            .editor-image {
                max-width: 100%;
                height: auto;
                border-radius: 0.5rem;
                margin: 1em 0;
            }
            
            .editor-paragraph {
                margin: 0.5em 0;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="space-y-4">
            {/* Barra de herramientas principal */}
            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => addParagraphBlock()}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                    >
                        <FiType className="w-4 h-4" />
                        Párrafo
                    </button>
                    
                    {[1, 2, 3, 4, 5, 6].map(level => (
                        <button
                            key={level}
                            type="button"
                            onClick={() => {
                                if (!editor) return;
                                const { state } = editor;
                                const endPos = state.doc.content.size;
                                editor.chain()
                                    .focus()
                                    .insertContentAt(endPos, { 
                                        type: 'heading', 
                                        attrs: { level }, 
                                        content: [{ type: 'text', text: '\u00A0' }] 
                                    })
                                    .run();
                                setTimeout(() => {
                                    editor.commands.focus('end');
                                }, 10);
                            }}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                            style={{ fontSize: `${Math.max(0.8, 1.4 - level * 0.1)}em` }}
                        >
                            <FiType className="w-4 h-4" />
                            H{level}
                        </button>
                    ))}
                    
                    <button
                        type="button"
                        onClick={() => {
                            if (!editor) return;
                            const { state } = editor;
                            const endPos = state.doc.content.size;
                            editor.chain()
                                .focus()
                                .insertContentAt(endPos, { 
                                    type: 'bulletList', 
                                    content: [{ 
                                        type: 'listItem', 
                                        content: [{ 
                                            type: 'paragraph', 
                                            content: [{ type: 'text', text: '\u00A0' }] 
                                        }] 
                                    }] 
                                })
                                .run();
                            setTimeout(() => {
                                editor.commands.focus('end');
                            }, 10);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                    >
                        <FiList className="w-4 h-4" />
                        Lista
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => {
                            if (!editor) return;
                            const { state } = editor;
                            const endPos = state.doc.content.size;
                            editor.chain()
                                .focus()
                                .insertContentAt(endPos, { 
                                    type: 'blockquote', 
                                    content: [{ 
                                        type: 'paragraph', 
                                        content: [{ type: 'text', text: '\u00A0' }] 
                                    }] 
                                })
                                .run();
                            setTimeout(() => {
                                editor.commands.focus('end');
                            }, 10);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                    >
                        <FiMessageSquare className="w-4 h-4" />
                        Cita
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => {
                            if (!editor) return;
                            const { state } = editor;
                            const endPos = state.doc.content.size;
                            editor.chain()
                                .focus()
                                .insertContentAt(endPos, { 
                                    type: 'codeBlock', 
                                    content: [{ type: 'text', text: '\u00A0' }] 
                                })
                                .run();
                            setTimeout(() => {
                                editor.commands.focus('end');
                            }, 10);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                    >
                        <FiCode className="w-4 h-4" />
                        Código
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => setShowImageModal(true)}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                    >
                        <FiImage className="w-4 h-4" />
                        Imagen
                    </button>
                </div>

                {/* Barra de formato */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        className="p-2 hover:bg-gray-200 rounded"
                        title="Negrita"
                    >
                        <FiBold className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        className="p-2 hover:bg-gray-200 rounded"
                        title="Cursiva"
                    >
                        <FiItalic className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowLinkModal(true)}
                        className="p-2 hover:bg-gray-200 rounded"
                        title="Enlace"
                    >
                        <FiLink className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Área del editor */}
            <div className="bg-white border border-gray-300 rounded-lg min-h-[400px] relative">
                {/* Controles de bloque flotantes */}
                {selectedBlockPos !== null && (
                    <div className="absolute left-1/2 -top-10 -translate-x-1/2 flex flex-row gap-1 p-2 bg-white/90 rounded-xl shadow-lg border border-gray-200 z-20 items-center w-max max-w-full overflow-x-auto">
                        {/* Opciones de tipo de bloque */}
                        <button 
                            type="button" 
                            onClick={() => changeBlockType('paragraph')} 
                            className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all" 
                            title="Párrafo"
                        >
                            <FiType className="w-4 h-4" />
                        </button>
                        {[1,2,3,4,5,6].map(level => (
                            <button 
                                key={level} 
                                type="button" 
                                onClick={() => changeBlockType(`heading${level}`, { level })} 
                                className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all" 
                                title={`Encabezado H${level}`}
                                style={{ 
                                    fontSize: `${Math.max(0.7, 1.2 - level * 0.08)}em`,
                                    fontWeight: level <= 3 ? '600' : '500'
                                }}
                            >
                                T{level}
                            </button>
                        ))}
                        <button 
                            type="button" 
                            onClick={() => changeBlockType('bulletList')} 
                            className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all" 
                            title="Lista"
                        >
                            <FiList className="w-4 h-4" />
                        </button>
                        <button 
                            type="button" 
                            onClick={() => changeBlockType('blockquote')} 
                            className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all" 
                            title="Cita"
                        >
                            <FiMessageSquare className="w-4 h-4" />
                        </button>
                        <button 
                            type="button" 
                            onClick={() => changeBlockType('codeBlock')} 
                            className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all" 
                            title="Código"
                        >
                            <FiCode className="w-4 h-4" />
                        </button>
                        <div className="mx-2 border-l border-gray-200 h-6" />
                        {/* Mover y eliminar */}
                        <button 
                            type="button" 
                            onClick={moveBlockUp} 
                            className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:scale-110 transition-all" 
                            title="Mover arriba"
                        >
                            <FiChevronUp className="w-4 h-4" />
                        </button>
                        <button 
                            type="button" 
                            onClick={moveBlockDown} 
                            className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:scale-110 transition-all" 
                            title="Mover abajo"
                        >
                            <FiChevronDown className="w-4 h-4" />
                        </button>
                        <button 
                            type="button" 
                            onClick={deleteBlock} 
                            className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 hover:scale-110 transition-all" 
                            title="Eliminar bloque"
                        >
                            <FiTrash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Editor principal */}
                <div className="p-4">
                    <EditorContent 
                        editor={editor} 
                        className="prose max-w-none focus:outline-none" 
                        data-testid="tiptap-editor"
                        style={{
                            minHeight: '200px',
                            lineHeight: '1.6'
                        }}
                    />

                </div>
                
                {/* Botón para agregar bloque al final */}
                <div className="p-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={addParagraphBlock}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                    >
                        <FiPlus className="w-4 h-4" />
                        Agregar bloque de texto
                    </button>
                </div>
            </div>

            {/* Modal para subir imagen */}
            {showImageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Subir Imagen</h3>
                            <button type="button" onClick={() => setShowImageModal(false)} className="text-gray-400 hover:text-gray-600"><FiX /></button>
                        </div>
                        <div className="space-y-4">
                            <input 
                                ref={fileInputRef} 
                                type="file" 
                                accept="image/*" 
                                onChange={e => setImageFile(e.target.files?.[0] || null)} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                            />
                            <input 
                                type="text" 
                                value={imageAlt} 
                                onChange={e => setImageAlt(e.target.value)} 
                                placeholder="Texto alternativo" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                            />
                            <input 
                                type="text" 
                                value={imageCaption} 
                                onChange={e => setImageCaption(e.target.value)} 
                                placeholder="Pie de foto (opcional)" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                            />
                            <div className="flex gap-2 pt-4">
                                <button type="button" onClick={() => setShowImageModal(false)} className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">Cancelar</button>
                                <button type="button" onClick={handleImageUpload} disabled={!imageFile || uploadingImage} className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50">{uploadingImage ? 'Subiendo...' : 'Subir'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para agregar enlace */}
            {showLinkModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Agregar Enlace</h3>
                            <button type="button" onClick={() => setShowLinkModal(false)} className="text-gray-400 hover:text-gray-600"><FiX /></button>
                        </div>
                        <div className="space-y-4">
                            <input type="url" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://ejemplo.com" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                            <div className="flex gap-2 pt-4">
                                <button type="button" onClick={() => setShowLinkModal(false)} className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">Cancelar</button>
                                <button type="button" onClick={handleAddLink} disabled={!linkUrl} className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50">Agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TipTapEditor; 