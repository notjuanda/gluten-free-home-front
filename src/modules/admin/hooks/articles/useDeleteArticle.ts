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
      setError(err.message || "Error al eliminar el artículo");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
} 