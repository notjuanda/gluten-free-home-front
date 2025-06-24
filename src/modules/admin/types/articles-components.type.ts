import type { Article } from "@/modules/core/types/article.type";

export interface ArticlesListProps {
  articles: Article[];
  loading?: boolean;
  error?: string | null;
} 