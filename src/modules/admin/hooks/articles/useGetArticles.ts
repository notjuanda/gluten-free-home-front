import { useEffect, useState } from "react";
import { getArticles } from "@/modules/core/api/articles.api";
import type { Article } from "@/modules/core/types/article.type";

export function useGetArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (err: any) {
        setError(err.message || "Error al cargar los artículos");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return { articles, loading, error };
} 