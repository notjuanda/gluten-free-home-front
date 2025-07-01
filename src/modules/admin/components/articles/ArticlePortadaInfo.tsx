import React from 'react';
import { FiInfo, FiImage, FiCheckCircle } from 'react-icons/fi';
import type { ArticlePortadaInfoProps } from '../../types/articles-components.type';

const ArticlePortadaInfo: React.FC<ArticlePortadaInfoProps> = ({ hasImage }) => {
    if (hasImage) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                    <FiCheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="text-sm font-medium text-green-800 mb-1">
                            Imagen de portada configurada
                        </h3>
                        <p className="text-sm text-green-700">
                            Este artículo ya tiene una imagen de portada. Puedes cambiarla usando el botón "Cambiar Portada" en la página de detalles del artículo.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
                <FiInfo className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                    <h3 className="text-sm font-medium text-blue-800 mb-1">
                        Imagen de portada
                    </h3>
                    <p className="text-sm text-blue-700 mb-3">
                        Para agregar una imagen de portada a este artículo, primero guarda el artículo y luego usa el botón "Agregar Portada" en la página de detalles.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                        <FiImage className="w-3 h-3" />
                        <span>La imagen de portada se maneja por separado para una mejor experiencia de usuario</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticlePortadaInfo; 