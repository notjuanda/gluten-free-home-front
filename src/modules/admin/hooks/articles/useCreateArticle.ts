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
      setError(err.message || "Error al crear el artículo");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
} 