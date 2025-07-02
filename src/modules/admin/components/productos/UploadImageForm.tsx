import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload, FiX } from 'react-icons/fi';
import { useUploadProductImage } from '../../hooks/productos/useUploadProductImage';
import type { UploadImageFormProps, FormData } from '../../types/products-components.type';

export default function UploadImageForm({ productId, productName, onSuccess }: UploadImageFormProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { register, handleSubmit, reset } = useForm<FormData>();

    const uploadMutation = useUploadProductImage({
        productId,
        onSuccess: () => {
            setSelectedFile(null);
            setPreviewUrl(null);
            reset();
            onSuccess?.();
        },
        onError: (error) => {
            console.error('Error al subir imagen:', error);
        }
    });

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                alert('Por favor selecciona un archivo de imagen válido.');
                return;
            }

            // Validar tamaño (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('La imagen debe ser menor a 5MB.');
                return;
            }

            setSelectedFile(file);
            
            // Crear preview
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onSubmit = (data: FormData) => {
        if (!selectedFile) {
            alert('Por favor selecciona una imagen.');
            return;
        }

        uploadMutation.mutate({
            file: selectedFile,
            textoAlt: data.textoAlt || undefined
        });
    };

    return (
        <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Subir Nueva Imagen</h3>
            <p className="text-sm text-muted-foreground mb-4">
                Producto: <span className="font-medium text-foreground">{productName}</span>
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* File Input */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Seleccionar Imagen *
                    </label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                            disabled={uploadMutation.isPending}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadMutation.isPending}
                            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <FiUpload className="w-8 h-8" />
                            <span>Haz clic para seleccionar una imagen</span>
                            <span className="text-xs">JPG, PNG, GIF (máx. 5MB)</span>
                        </button>
                    </div>
                </div>

                {/* Preview */}
                {previewUrl && (
                    <div className="relative">
                        <label className="block text-sm font-medium mb-2">Vista Previa</label>
                        <div className="relative inline-block">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="max-w-full h-32 object-cover rounded-lg border border-border"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveFile}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                title="Remover imagen"
                            >
                                <FiX className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Alt Text */}
                <div>
                    <label htmlFor="textoAlt" className="block text-sm font-medium mb-2">
                        Texto Alternativo (Opcional)
                    </label>
                    <input
                        {...register('textoAlt')}
                        type="text"
                        id="textoAlt"
                        placeholder="Descripción de la imagen para accesibilidad"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        disabled={uploadMutation.isPending}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!selectedFile || uploadMutation.isPending}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                    {uploadMutation.isPending ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Subiendo...
                        </>
                    ) : (
                        'Subir Imagen'
                    )}
                </button>
            </form>
        </div>
    );
} 