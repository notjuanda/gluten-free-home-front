import { useEffect, useState, useCallback } from "react";
import { getArticle } from "@/modules/core/api/articles.api";
import type { Article } from "@/modules/core/types/article.type";

export function useGetArticle(id?: number) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getArticle(id);
      setArticle(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar el artículo");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const refetch = useCallback(() => {
    fetchArticle();
  }, [fetchArticle]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return { article, loading, error, refetch };
} 