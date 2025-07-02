import { useState } from "react";
import { deleteArticle } from "@/modules/core/api/articles.api";

export function useDeleteArticle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteArticle(id);
      return true;
    } catch (err: any) {
      // Manejar errores específicos del backend
      if (err.response?.data?.message) {
        // Error del backend con mensaje específico
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        // Error del backend con campo error
        setError(err.response.data.error);
      } else if (err.response?.status === 400) {
        // Bad Request - datos inválidos
        if (err.response.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Datos inválidos para eliminar el artículo.");
        }
      } else if (err.response?.status === 401) {
        setError("No estás autenticado. Inicia sesión nuevamente.");
      } else if (err.response?.status === 403) {
        setError("No tienes permisos para eliminar artículos.");
      } else if (err.response?.status === 404) {
        setError("Artículo no encontrado. Es posible que ya haya sido eliminado.");
      } else if (err.response?.status >= 500) {
        setError("Error del servidor. Intenta nuevamente más tarde.");
      } else if (err.message?.includes('network') || err.message?.includes('fetch')) {
        setError("Error de conexión. Verifica tu internet e intenta nuevamente.");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Error inesperado al eliminar el artículo. Intenta nuevamente.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
} 