import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiLink, FiImage, FiType, FiList, FiMessageSquare, FiCode, FiPlus, FiTrash2, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { uploadBlockImage } from '@/modules/core/api/articles.api';
import { backendBlocksToEditorBlocks, editorBlocksToBackendBlocks, generateBlockId } from '@/modules/core/utils/block-converter';
import type { EditorBlock, BlockType, TextSegment, TextFormat } from '@/modules/core/types/editor-block.type';
import type { CustomBlockEditorProps } from '../../types/articles-components.type';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const CustomBlockEditor: React.FC<CustomBlockEditorProps> = ({ value = [], onChange }) => {
    const [blocks, setBlocks] = useState<EditorBlock[]>([]);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageAlt, setImageAlt] = useState('');
    const [imageCaption, setImageCaption] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');    
    // Bandera para evitar sincronización cruzada
    const [isUpdatingFromValue, setIsUpdatingFromValue] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const blockRefs = useRef<Record<string, HTMLTextAreaElement | HTMLInputElement | null>>({});

    // Inicializar bloques desde el valor
    useEffect(() => {
        if (isUpdatingFromValue) return; // Evitar sincronización cruzada
        
        if (value && value.length > 0) {
            const editorBlocks = backendBlocksToEditorBlocks(value);
            if (JSON.stringify(editorBlocks) !== JSON.stringify(blocks)) {
                setIsUpdatingFromValue(true);
                setBlocks(editorBlocks);
                setTimeout(() => setIsUpdatingFromValue(false), 0);
            }
        } else if (blocks.length === 0) {
            setIsUpdatingFromValue(true);
            setBlocks([{
                id: generateBlockId(),
                type: 'paragraph',
                content: [{ text: '', format: {} }],
                order: 1
            }]);
            setTimeout(() => setIsUpdatingFromValue(false), 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(value)]);

    // Notificar cambios al padre
    useEffect(() => {
        if (isUpdatingFromValue) return; // Evitar sincronización cruzada
        
        if (blocks.length > 0) {
            const backendBlocks = editorBlocksToBackendBlocks(blocks);
            if (JSON.stringify(backendBlocks) !== JSON.stringify(value)) {
                onChange?.(backendBlocks);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(blocks)]);

    // Enfocar el nuevo bloque al agregar
    useEffect(() => {
        if (selectedBlockId && blockRefs.current[selectedBlockId]) {
        blockRefs.current[selectedBlockId]?.focus();
        }
    }, [selectedBlockId]);

    // Funciones de manipulación de bloques
    const addBlock = useCallback((type: BlockType, afterId?: string) => {
        const newBlock: EditorBlock = {
        id: generateBlockId(),
        type,
        content: [{ text: '', format: {} }],
        order: 1
        };

        if (type === 'image') {
        newBlock.data = { url: '', alt: '', caption: '' };
        } else if (type === 'list-ordered' || type === 'list-unordered') {
        newBlock.data = { items: [''] };
        } else if (type === 'quote') {
        newBlock.data = { author: '' };
        } else if (type === 'code') {
        newBlock.data = { language: '' };
        }

        setBlocks(prev => {
        if (!afterId) {
            return [...prev, newBlock];
        }
        
        const index = prev.findIndex(b => b.id === afterId);
        if (index === -1) return [...prev, newBlock];
        
        const newBlocks = [...prev];
        newBlocks.splice(index + 1, 0, newBlock);
        
        // Reordenar
        return newBlocks.map((block, i) => ({ ...block, order: i + 1 }));
        });
        
        setSelectedBlockId(newBlock.id);
    }, []);

    const deleteBlock = useCallback((id: string) => {
        setBlocks(prev => {
        const newBlocks = prev.filter(b => b.id !== id);
        if (newBlocks.length === 0) {
            // Siempre mantener al menos un bloque
            return [{
            id: generateBlockId(),
            type: 'paragraph',
            content: [{ text: '', format: {} }],
            order: 1
            }];
        }
        return newBlocks.map((block, i) => ({ ...block, order: i + 1 }));
        });
    }, []);

    const moveBlock = useCallback((id: string, direction: 'up' | 'down') => {
        setBlocks(prev => {
        const index = prev.findIndex(b => b.id === id);
        if (index === -1) return prev;
        
        const newBlocks = [...prev];
        if (direction === 'up' && index > 0) {
            [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
        } else if (direction === 'down' && index < newBlocks.length - 1) {
            [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
        }
        
        return newBlocks.map((block, i) => ({ ...block, order: i + 1 }));
        });
    }, []);

    // Funciones de formato de texto
    const applyFormat = useCallback((format: Partial<TextFormat>) => {
        if (!selectedBlockId) return;
        
        setBlocks(prev => prev.map(block => {
        if (block.id !== selectedBlockId) return block;
        
        const newContent = [...block.content];
        if (newContent.length > 0) {
            newContent[0] = {
            ...newContent[0],
            format: { ...newContent[0].format, ...format }
            };
        }
        
        return { ...block, content: newContent };
        }));
    }, [selectedBlockId]);

    // Función para subir imagen
    const handleImageUpload = async () => {
        if (!imageFile) return;
        
        setUploadingImage(true);
        try {
        const result = await uploadBlockImage(imageFile);
        const imageUrl = result.url.startsWith('http') ? result.url : `${API_URL}${result.url}`;
        
        addBlock('image');
        setBlocks(prev => prev.map(block => {
            if (block.type === 'image' && !block.data?.url) {
            return {
                ...block,
                data: {
                url: imageUrl,
                alt: imageAlt,
                caption: imageCaption
                }
            };
            }
            return block;
        }));
        
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

    // Función para actualizar contenido de bloque
    const updateBlockContent = useCallback((id: string, content: TextSegment[]) => {
        setBlocks(prev => prev.map(block => 
        block.id === id ? { ...block, content } : block
        ));
    }, []);

    // Función para actualizar datos de bloque
    const updateBlockData = useCallback((id: string, data: any) => {
        setBlocks(prev => prev.map(block => 
        block.id === id ? { ...block, data: { ...block.data, ...data } } : block
        ));
    }, []);

    // Función para renderizar un segmento de texto SOLO con formato de link
    const renderFormattedSegment = (segment: any, i: number) => {
        let el: React.ReactNode = segment.text;
        if (segment.format?.link) el = <a key={`l-${i}`} href={segment.format.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{el}</a>;
        return <React.Fragment key={i}>{el}</React.Fragment>;
    };

    // Renderizar bloque individual
    const renderBlock = (block: EditorBlock) => {
        const isSelected = selectedBlockId === block.id;
        
        return (
        <div
            key={block.id}
            className={`relative group border-l-4 transition-all ${
            isSelected 
                ? 'border-primary bg-primary/5' 
                : 'border-transparent hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedBlockId(block.id)}
        >
            {/* Barra de herramientas del bloque */}
            {isSelected && (
            <div className="absolute left-1/2 -top-10 -translate-x-1/2 flex flex-row gap-1 p-2 bg-white/90 rounded-xl shadow-lg border border-gray-200 z-20 items-center w-max max-w-full overflow-x-auto">
                {/* Opciones de tipo de bloque */}
                <button type="button" onClick={() => {
                  updateBlockContent(block.id, [{ text: '', format: {} }]);
                  updateBlockData(block.id, undefined);
                  setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, type: 'paragraph' as BlockType } : b));
                }} className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all" title="Párrafo"><FiType className="w-4 h-4" /></button>
                {[1,2,3,4,5,6].map(level => (
                  <button key={level} type="button" onClick={() => {
                    updateBlockContent(block.id, [{ text: '', format: {} }]);
                    updateBlockData(block.id, undefined);
                    setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, type: (`heading${level}` as BlockType) } : b));
                  }} className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all" title={`Encabezado H${level}`}>T{level}</button>
                ))}
                <button type="button" onClick={() => {
                  updateBlockData(block.id, { items: [''] });
                  setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, type: 'list-unordered' as BlockType } : b));
                }} className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all" title="Lista"><FiList className="w-4 h-4" /></button>
                <button type="button" onClick={() => {
                  updateBlockData(block.id, { author: '' });
                  setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, type: 'quote' as BlockType } : b));
                }} className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all" title="Cita"><FiMessageSquare className="w-4 h-4" /></button>
                <button type="button" onClick={() => {
                  updateBlockData(block.id, { language: '' });
                  setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, type: 'code' as BlockType } : b));
                }} className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all" title="Código"><FiCode className="w-4 h-4" /></button>
                <button type="button" onClick={() => {
                  updateBlockData(block.id, { url: '', alt: '', caption: '' });
                  setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, type: 'image' as BlockType } : b));
                }} className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all" title="Imagen"><FiImage className="w-4 h-4" /></button>
                <div className="mx-2 border-l border-gray-200 h-6" />
                <button type="button" onClick={() => setShowLinkModal(true)} className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 hover:scale-110 transition-all" title="Agregar enlace"><FiLink className="w-4 h-4" /></button>
                <div className="mx-2 border-l border-gray-200 h-6" />
                {/* Mover y eliminar */}
                <button type="button" onClick={() => moveBlock(block.id, 'up')} className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:scale-110 transition-all" title="Mover arriba"><FiChevronUp className="w-4 h-4" /></button>
                <button type="button" onClick={() => moveBlock(block.id, 'down')} className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:scale-110 transition-all" title="Mover abajo"><FiChevronDown className="w-4 h-4" /></button>
                <button type="button" onClick={() => deleteBlock(block.id)} className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 hover:scale-110 transition-all" title="Eliminar bloque"><FiTrash2 className="w-4 h-4" /></button>
            </div>
            )}

            {/* Contenido del bloque */}
            <div className="p-4">
            {block.type === 'paragraph' && (
                <textarea
                ref={el => { blockRefs.current[block.id] = el; }}
                className="w-full min-h-[2.5rem] px-2 py-1 border border-gray-300 rounded-md resize-vertical focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={block.content[0]?.text || ''}
                onChange={e => updateBlockContent(block.id, [{ text: e.target.value, format: block.content[0]?.format || {} }])}
                placeholder="Escribe un párrafo..."
                onFocus={() => setSelectedBlockId(block.id)}
                />
            )}

            {block.type.startsWith('heading') && (
                <input
                ref={el => { blockRefs.current[block.id] = el; }}
                className="w-full px-2 py-1 border border-gray-300 rounded-md font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={block.content[0]?.text || ''}
                onChange={e => updateBlockContent(block.id, [{ text: e.target.value, format: block.content[0]?.format || {} }])}
                placeholder={`Encabezado ${block.type.replace('heading', '')}`}
                onFocus={() => setSelectedBlockId(block.id)}
                />
            )}

            {block.type === 'image' && (
                <div className="space-y-2">
                {block.data?.url ? (
                    <div className="relative">
                    <img
                        src={block.data.url}
                        alt={block.data.alt}
                        className="max-w-full h-auto rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="URL de la imagen"
                        value={block.data.url}
                        onChange={(e) => updateBlockData(block.id, { url: e.target.value })}
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Texto alternativo"
                        value={block.data.alt}
                        onChange={(e) => updateBlockData(block.id, { alt: e.target.value })}
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Pie de foto (opcional)"
                        value={block.data.caption}
                        onChange={(e) => updateBlockData(block.id, { caption: e.target.value })}
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FiImage className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Haz clic en el botón de imagen para subir una</p>
                    </div>
                )}
                </div>
            )}

            {(block.type === 'list-ordered' || block.type === 'list-unordered') && (
                <div className="space-y-2">
                {(block.data?.items || ['']).map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                    <span className="text-gray-500 w-4">
                        {block.type === 'list-ordered' ? `${index + 1}.` : '•'}
                    </span>
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                        const newItems = [...(block.data?.items || [])];
                        newItems[index] = e.target.value;
                        updateBlockData(block.id, { items: newItems });
                        }}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded-md"
                        placeholder="Elemento de la lista"
                    />
                    <button
                        type="button"
                        onClick={() => {
                        const newItems = (block.data?.items || []).filter((_: string, i: number) => i !== index);
                        updateBlockData(block.id, { items: newItems });
                        }}
                        className="text-red-500 hover:text-red-700"
                    >
                        <FiTrash2 className="w-4 h-4" />
                    </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => {
                    const newItems = [...(block.data?.items || []), ''];
                    updateBlockData(block.id, { items: newItems });
                    }}
                    className="text-primary hover:text-primary-dark text-sm"
                >
                    + Agregar elemento
                </button>
                </div>
            )}

            {block.type === 'quote' && (
                <div className="border-l-4 border-primary pl-4 space-y-2">
                {isSelected ? (
                    <textarea
                        className="w-full min-h-[2.5rem] px-2 py-1 border border-gray-300 rounded-md italic focus:outline-none focus:ring-2 focus:ring-primary/30"
                        value={block.content[0]?.text || ''}
                        onChange={e => updateBlockContent(block.id, [{ text: e.target.value, format: block.content[0]?.format || {} }])}
                        placeholder="Escribe una cita..."
                        onFocus={() => setSelectedBlockId(block.id)}
                    />
                ) : (
                    <div className="min-h-[1.5rem] italic">
                    {block.content.map(renderFormattedSegment)}
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Autor (opcional)"
                    value={block.data?.author || ''}
                    onChange={(e) => updateBlockData(block.id, { author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                </div>
            )}

            {block.type === 'code' && (
                <div className="space-y-2">
                <input
                    type="text"
                    placeholder="Lenguaje (opcional)"
                    value={block.data?.language || ''}
                    onChange={(e) => updateBlockData(block.id, { language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                {isSelected ? (
                    <textarea
                        className="w-full font-mono bg-gray-100 p-3 rounded-md min-h-[80px] resize-y"
                        value={block.content?.[0]?.text || ''}
                        onChange={e => {
                            const newContent = [...block.content];
                            newContent[0] = {
                                ...newContent[0],
                                text: e.target.value,
                                format: block.content?.[0]?.format || {}
                            };
                            updateBlockContent(block.id, newContent);
                        }}
                        placeholder="Escribe tu código aquí..."
                    />
                ) : (
                    <pre className="w-full font-mono bg-gray-100 p-3 rounded-md min-h-[80px] whitespace-pre-wrap text-green-700">
                        {block.content?.[0]?.text || ''}
                    </pre>
                )}
                </div>
            )}
            </div>
        </div>
        );
    };

    return (
        <div className="space-y-4">
        {/* Barra de herramientas principal */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
            <div className="flex flex-wrap gap-2">
            <button
                type="button"
                onClick={() => addBlock('paragraph')}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
            >
                <FiType className="w-4 h-4" />
                Párrafo
            </button>
            
            {[1, 2, 3, 4, 5, 6].map(level => (
                <button
                key={level}
                type="button"
                onClick={() => addBlock(`heading${level}` as BlockType)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                >
                <FiType className="w-4 h-4" />
                H{level}
                </button>
            ))}
            
            <button
                type="button"
                onClick={() => addBlock('list-unordered')}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
            >
                <FiList className="w-4 h-4" />
                Lista
            </button>
            
            <button
                type="button"
                onClick={() => addBlock('quote')}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
            >
                <FiMessageSquare className="w-4 h-4" />
                Cita
            </button>
            
            <button
                type="button"
                onClick={() => addBlock('code')}
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

            {/* Barra de formato (solo para bloques de texto) */}
            {selectedBlockId && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                <button
                type="button"
                onClick={() => setShowLinkModal(true)}
                className="p-2 hover:bg-gray-200 rounded"
                title="Enlace"
                >
                <FiLink className="w-4 h-4" />
                </button>
            </div>
            )}
        </div>

        {/* Área de bloques */}
        <div ref={editorRef} className="bg-white border border-gray-300 rounded-lg min-h-[400px]">
            {blocks.map(renderBlock)}
            
            {/* Botón para agregar bloque al final */}
            <div className="p-4 border-t border-gray-200">
            <button
                type="button"
                onClick={() => addBlock('paragraph')}
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
                <button
                    type="button"
                    onClick={() => setShowImageModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                >
                    ×
                </button>
                </div>
                
                <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar imagen
                    </label>
                    <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texto alternativo
                    </label>
                    <input
                    type="text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Describe la imagen..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pie de foto (opcional)
                    </label>
                    <input
                    type="text"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    placeholder="Pie de foto..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                
                <div className="flex gap-2 pt-4">
                    <button
                    type="button"
                    onClick={() => setShowImageModal(false)}
                    className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                    Cancelar
                    </button>
                    <button
                    type="button"
                    onClick={handleImageUpload}
                    disabled={!imageFile || uploadingImage}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
                    >
                    {uploadingImage ? 'Subiendo...' : 'Subir'}
                    </button>
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
                <button
                    type="button"
                    onClick={() => setShowLinkModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                >
                    ×
                </button>
                </div>
                
                <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL del enlace
                    </label>
                    <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://ejemplo.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                
                <div className="flex gap-2 pt-4">
                    <button
                    type="button"
                    onClick={() => setShowLinkModal(false)}
                    className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                    Cancelar
                    </button>
                    <button
                    type="button"
                    onClick={() => {
                        applyFormat({ link: linkUrl });
                        setShowLinkModal(false);
                        setLinkUrl('');
                    }}
                    disabled={!linkUrl}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
                    >
                    Agregar
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default CustomBlockEditor; 