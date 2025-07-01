import React, { useState, useRef } from 'react';
import { FiX, FiImage, FiUpload } from 'react-icons/fi';
import { uploadArticlePortada } from "@/modules/core/api/articles.api";
import type { ArticlePortadaModalProps } from '../../types/articles-components.type';

const ArticlePortadaModal: React.FC<ArticlePortadaModalProps> = ({
    isOpen,
    onClose,
    articleId,
    currentImageUrl,
    onSuccess,
}) => {
    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
    const [textoAlt, setTextoAlt] = useState('');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona solo archivos de imagen');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!fileInputRef.current?.files?.[0]) {
            alert('Por favor selecciona una imagen');
            return;
        }

        setUploading(true);
        try {
            await uploadArticlePortada(articleId, fileInputRef.current.files[0], textoAlt);
            onSuccess?.();
            onClose();
        } catch (error) {
            console.error('Error al subir imagen:', error);
            alert('Error al subir la imagen. Intenta de nuevo.');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setPreviewUrl(null);
        setTextoAlt('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Imagen de Portada</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Current image preview */}
                    {currentImageUrl && (
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Imagen actual</h4>
                            <div className="relative">
                                <img
                                    src={currentImageUrl}
                                    alt="Imagen actual"
                                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                />
                            </div>
                        </div>
                    )}

                    {/* Upload area */}
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                            {currentImageUrl ? 'Reemplazar imagen' : 'Agregar imagen'}
                        </h4>
                        
                        {previewUrl ? (
                            <div className="relative">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <FiX className="w-3 h-3" />
                                </button>
                            </div>
                        ) : (
                            <div
                                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                                    dragActive
                                        ? 'border-primary bg-primary/5'
                                        : 'border-gray-300 hover:border-primary/50'
                                }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <FiImage className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                                <div className="text-sm text-gray-600">
                                    <p className="font-medium">
                                        Arrastra una imagen aquí o{' '}
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="text-primary hover:text-primary-dark underline"
                                        >
                                            selecciona un archivo
                                        </button>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        PNG, JPG, GIF hasta 10MB
                                    </p>
                                </div>
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileInput}
                            className="hidden"
                        />
                    </div>

                    {/* Alt text */}
                    {previewUrl && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Texto Alternativo (Alt)
                            </label>
                            <input
                                type="text"
                                value={textoAlt}
                                onChange={(e) => setTextoAlt(e.target.value)}
                                placeholder="Describe la imagen para accesibilidad..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            />
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={!previewUrl || uploading}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                        {uploading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Subiendo...
                            </>
                        ) : (
                            <>
                                <FiUpload className="w-4 h-4 mr-2" />
                                {currentImageUrl ? 'Reemplazar' : 'Subir'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArticlePortadaModal; 