import React, { useState, useRef } from 'react';
import { FiX, FiImage } from 'react-icons/fi';
import type { ArticlePortadaUploadProps } from '../../types/articles-components.type';

const ArticlePortadaUpload: React.FC<ArticlePortadaUploadProps> = ({
    currentImageUrl,
    onImageUpload,
    loading = false,
}) => {
    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
    const [textoAlt, setTextoAlt] = useState('');
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

        onImageUpload(file, textoAlt);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const removeImage = () => {
        setPreviewUrl(null);
        setTextoAlt('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagen de Portada
                </label>
                
                {previewUrl ? (
                    <div className="relative group">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <FiX className="w-4 h-4" />
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
                        <FiImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
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

            {loading && (
                <div className="flex items-center justify-center py-4">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                    <span className="text-sm text-gray-600">Subiendo imagen...</span>
                </div>
            )}
        </div>
    );
};

export default ArticlePortadaUpload; 