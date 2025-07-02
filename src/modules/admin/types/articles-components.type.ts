import type { Article, ArticleBlock } from "@/modules/core/types/article.type";

export interface ArticlesListProps {
  articles: Article[];
  loading?: boolean;
  error?: string | null;
  refetch?: () => void;
} 

export interface ArticlePortadaUploadProps {
  currentImageUrl?: string;
  onImageUpload: (file: File, textoAlt?: string) => Promise<void>;
  loading?: boolean;
}

export interface ArticleContentRendererProps {
  className?: string;
}

export interface ArticleDeleteButtonProps {
  id: number;
  title: string;
  onDeleted: () => void;
}
export interface ArticlePortadaInfoProps {
    hasImage: boolean;
}

export interface ArticlePortadaModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleId: number;
  currentImageUrl?: string;
  onSuccess?: () => void;
}

export interface ArticlePreviewRendererProps {
  blocks: ArticleBlock[];
}
