import { useState } from "react";
import { createArticle } from "@/modules/core/api/articles.api";
import type { CreateArticleInput, Article } from "@/modules/core/types/article.type";

export function useCreateArticle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (input: CreateArticleInput): Promise<Article | null> => {
    setLoading(true);
    setError(null);
    try {
      const article = await createArticle(input);
      return article;
    } catch (err: any) {
      // Manejar errores específicos del backend
      if (err.response?.data?.message) {
        // Error del backend con mensaje específico
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        // Error del backend con campo error
        setError(err.response.data.error);
      } else if (err.response?.status === 409) {
        // Conflict - slug duplicado
        setError("El slug ya está en uso. Por favor, usa un slug único.");
      } else if (err.response?.status === 400) {
        // Bad Request - validación fallida
        if (err.response.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Datos inválidos. Verifica la información del artículo.");
        }
      } else if (err.response?.status === 401) {
        setError("No estás autenticado. Inicia sesión nuevamente.");
      } else if (err.response?.status === 403) {
        setError("No tienes permisos para crear artículos.");
      } else if (err.response?.status === 404) {
        setError("Recurso no encontrado. Verifica la información.");
      } else if (err.response?.status >= 500) {
        setError("Error del servidor. Intenta nuevamente más tarde.");
      } else if (err.message?.includes('llave duplicada') || err.message?.includes('duplicate key')) {
        setError("El slug ya existe. Por favor, usa un slug único.");
      } else if (err.message?.includes('viola restricción de unicidad')) {
        setError("El slug ya está en uso. Intenta con otro slug.");
      } else if (err.message?.includes('slug')) {
        setError("Error con el slug del artículo. Verifica que sea único y válido.");
      } else if (err.message?.includes('titulo')) {
        setError("Error con el título del artículo. Verifica que sea válido.");
      } else if (err.message?.includes('contenido')) {
        setError("Error con el contenido del artículo. Verifica que no esté vacío.");
      } else if (err.message?.includes('usuario')) {
        setError("Error de autenticación. Inicia sesión nuevamente.");
      } else if (err.message?.includes('permisos')) {
        setError("No tienes permisos para crear artículos.");
      } else if (err.message?.includes('network') || err.message?.includes('fetch')) {
        setError("Error de conexión. Verifica tu internet e intenta nuevamente.");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Error inesperado al crear el artículo. Intenta nuevamente.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
} 