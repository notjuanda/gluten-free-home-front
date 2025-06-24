import { useEffect, useState } from "react";
import { getArticle } from "@/modules/core/api/articles.api";
import type { Article } from "@/modules/core/types/article.type";

export function useGetArticle(id?: number) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getArticle(id)
      .then(setArticle)
      .catch((err) => setError(err.message || "Error al cargar el artículo"))
      .finally(() => setLoading(false));
  }, [id]);

  return { article, loading, error };
} 