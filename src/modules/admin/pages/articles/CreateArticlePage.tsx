import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { CreateArticleInput, ArticleBlock } from "@/modules/core/types/article.type";
import { PublicationStatus } from "@/modules/core/enums/publication-status.enum";
import { useCreateArticle } from "@/modules/admin/hooks/articles/useCreateArticle";
import CustomBlockEditor from "@/modules/admin/components/articles/CustomBlockEditor";
import ArticlePortadaInfo from "@/modules/admin/components/articles/ArticlePortadaInfo";
import { FiArrowLeft, FiSave, FiFileText, FiCheck, FiX } from "react-icons/fi";

const estados = [
    { value: PublicationStatus.BORRADOR, label: "Borrador" },
    { value: PublicationStatus.PENDIENTE_REVISION, label: "Pendiente de revisión" },
    { value: PublicationStatus.PUBLICADO, label: "Publicado" },
];

// Función para generar slug automáticamente
function generateSlug(titulo: string): string {
    return titulo
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
        .replace(/\s+/g, '-') // Espacios a guiones
        .replace(/-+/g, '-') // Múltiples guiones a uno solo
        .trim()
        .replace(/^-+|-+$/g, ''); // Remover guiones al inicio y final
}

// Función para validar slug
function isValidSlug(slug: string): boolean {
    return /^[a-z0-9-]+$/.test(slug) && slug.length >= 3 && slug.length <= 50;
}

const CreateArticlePage: React.FC = () => {
    const navigate = useNavigate();
    const { create, loading, error } = useCreateArticle();
    const [form, setForm] = useState<Partial<CreateArticleInput>>({
        titulo: "",
        slug: "",
        resumen: "",
        estadoPublicacion: PublicationStatus.BORRADOR,
    });
    const [editorContent, setEditorContent] = useState<ArticleBlock[]>([]);
    const [slugValidation, setSlugValidation] = useState<{
        isValid: boolean;
        message: string;
    }>({ isValid: true, message: "" });

    // Generar slug automáticamente cuando cambia el título
    useEffect(() => {
        if (form.titulo && !form.slug) {
            const generatedSlug = generateSlug(form.titulo);
            setForm(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [form.titulo]);

    // Validar slug en tiempo real
    useEffect(() => {
        if (!form.slug) {
            setSlugValidation({ isValid: true, message: "" });
            return;
        }

        if (!isValidSlug(form.slug)) {
            setSlugValidation({
                isValid: false,
                message: "El slug debe contener solo letras minúsculas, números y guiones (3-50 caracteres)"
            });
        } else {
            setSlugValidation({
                isValid: true,
                message: "Slug válido"
            });
        }
    }, [form.slug]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.titulo?.trim()) {
            alert("El título es obligatorio");
            return;
        }

        if (!form.slug?.trim()) {
            alert("El slug es obligatorio");
            return;
        }

        if (!slugValidation.isValid) {
            alert("Por favor, corrige el slug antes de continuar");
            return;
        }

        const articleData: CreateArticleInput = {
            titulo: form.titulo,
            slug: form.slug,
            contenidoBloques: editorContent,
            resumen: form.resumen ?? "",
            estadoPublicacion: form.estadoPublicacion,
            categoriasIds: form.categoriasIds ?? [],
            tagsIds: form.tagsIds ?? [],
        };

        const result = await create(articleData);
        
        if (result) {
            navigate("/admin/articulos");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate("/admin/articulos")}
                        className="p-2 rounded-lg bg-white/80 hover:bg-white shadow-md transition-colors"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Crear Artículo</h1>
                        <p className="text-gray-600">Completa la información del nuevo artículo</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Información sobre imagen de portada */}
                    <ArticlePortadaInfo hasImage={false} />

                    {/* Información básica */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FiFileText className="w-5 h-5 text-primary" />
                            Información Básica
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Título *
                                </label>
                    <input
                        type="text"
                        name="titulo"
                        value={form.titulo}
                        onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                    placeholder="Título del artículo"
                        required
                    />
                </div>
                            
                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Slug *
                                </label>
                                <div className="relative">
                    <input
                        type="text"
                        name="slug"
                        value={form.slug}
                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary pr-10 ${
                                            slugValidation.isValid 
                                                ? 'border-gray-300 focus:border-primary' 
                                                : 'border-red-300 focus:border-red-500'
                                        }`}
                                        placeholder="url-amigable-del-articulo"
                        required
                    />
                                    {form.slug && (
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            {slugValidation.isValid ? (
                                                <FiCheck className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <FiX className="w-5 h-5 text-red-500" />
                                            )}
                                        </div>
                                    )}
                                </div>
                                {form.slug && (
                                    <p className={`text-xs mt-1 ${
                                        slugValidation.isValid ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {slugValidation.message}
                                    </p>
                                )}
                            </div>
                </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Resumen
                            </label>
                    <textarea
                        name="resumen"
                        value={form.resumen}
                        onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                rows={3}
                                placeholder="Breve descripción del artículo..."
                    />
                </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estado de publicación
                            </label>
                    <select
                        name="estadoPublicacion"
                        value={form.estadoPublicacion}
                        onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    >
                        {estados.map((op) => (
                            <option key={op.value} value={op.value}>{op.label}</option>
                        ))}
                    </select>
                </div>
                    </div>

                    {/* Contenido */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Contenido del Artículo</h2>
                        <CustomBlockEditor 
                            value={editorContent} 
                            onChange={(newContent) => {
                                setEditorContent(newContent);
                            }} 
                        />
                    </div>

                    {/* Errores */}
                    {error && (
                        <div className={`border rounded-lg p-4 ${
                            error.includes('slug') || error.includes('duplicado') || error.includes('único')
                                ? 'bg-orange-50 border-orange-200'
                                : error.includes('permisos') || error.includes('autenticado')
                                ? 'bg-red-50 border-red-200'
                                : 'bg-red-50 border-red-200'
                        }`}>
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0">
                                    {error.includes('slug') || error.includes('duplicado') || error.includes('único') ? (
                                        <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    ) : error.includes('permisos') || error.includes('autenticado') ? (
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-sm font-medium mb-1 ${
                                        error.includes('slug') || error.includes('duplicado') || error.includes('único')
                                            ? 'text-orange-800'
                                            : error.includes('permisos') || error.includes('autenticado')
                                            ? 'text-red-800'
                                            : 'text-red-800'
                                    }`}>
                                        {error.includes('slug') || error.includes('duplicado') || error.includes('único')
                                            ? 'Problema con el slug'
                                            : error.includes('permisos') || error.includes('autenticado')
                                            ? 'Error de autenticación'
                                            : 'Error al crear el artículo'
                                        }
                                    </h3>
                                    <p className={`text-sm ${
                                        error.includes('slug') || error.includes('duplicado') || error.includes('único')
                                            ? 'text-orange-700'
                                            : error.includes('permisos') || error.includes('autenticado')
                                            ? 'text-red-700'
                                            : 'text-red-700'
                                    }`}>
                                        {error}
                                    </p>
                                    
                                    {/* Sugerencias específicas según el tipo de error */}
                                    {(error.includes('slug') || error.includes('duplicado') || error.includes('único')) && (
                                        <div className="mt-3 text-xs text-orange-600">
                                            <p className="font-medium mb-1">💡 Sugerencias para el slug:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Usa solo letras minúsculas, números y guiones</li>
                                                <li>Evita espacios y caracteres especiales</li>
                                                <li>Ejemplos válidos: "mi-primer-articulo", "articulo-sobre-gluten", "receta-2024"</li>
                                                <li>Puedes agregar números o palabras únicas para hacerlo único</li>
                                            </ul>
                                        </div>
                                    )}
                                    
                                    {error.includes('título') && (
                                        <div className="mt-3 text-xs text-red-600">
                                            <p className="font-medium mb-1">💡 Sugerencias para el título:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>El título debe tener entre 3 y 200 caracteres</li>
                                                <li>Usa un título descriptivo y claro</li>
                                                <li>Evita títulos demasiado largos o cortos</li>
                                            </ul>
                                        </div>
                                    )}
                                    
                                    {error.includes('contenido') && (
                                        <div className="mt-3 text-xs text-red-600">
                                            <p className="font-medium mb-1">💡 Sugerencias para el contenido:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>El artículo debe tener contenido en el editor</li>
                                                <li>Agrega al menos un párrafo o encabezado</li>
                                                <li>Usa el editor para escribir el contenido del artículo</li>
                                            </ul>
                                        </div>
                                    )}
                                    
                                    {(error.includes('permisos') || error.includes('autenticado')) && (
                                        <div className="mt-3 text-xs text-red-600">
                                            <p className="font-medium mb-1">🔐 Soluciones:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Verifica que hayas iniciado sesión correctamente</li>
                                                <li>Si el problema persiste, cierra sesión e inicia nuevamente</li>
                                                <li>Contacta al administrador si no tienes permisos</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                </div>
                    )}

                    {/* Botones de acción */}
                    <div className="flex gap-4 justify-end">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/articulos")}
                            className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                <button
                    type="submit"
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                            disabled={loading || !slugValidation.isValid}
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Creando...
                                </>
                            ) : (
                                <>
                                    <FiSave className="w-4 h-4" />
                                    Crear Artículo
                                </>
                            )}
                </button>
                    </div>
            </form>
            </div>
        </div>
    );
};

export default CreateArticlePage; 