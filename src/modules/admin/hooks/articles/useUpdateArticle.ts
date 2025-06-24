import { useState } from "react";
import { updateArticle } from "@/modules/core/api/articles.api";
import type { UpdateArticleInput, Article } from "@/modules/core/types/article.type";

export function useUpdateArticle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: number, input: UpdateArticleInput): Promise<Article | null> => {
    setLoading(true);
    setError(null);
    try {
      const article = await updateArticle(id, input);
      return article;
    } catch (err: any) {
      setError(err.message || "Error al actualizar el artículo");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
} 