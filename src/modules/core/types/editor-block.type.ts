// Tipos para nuestro editor de bloques personalizado
export type BlockType = 
  | 'paragraph'
  | 'heading1'
  | 'heading2' 
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6'
  | 'image'
  | 'list-ordered'
  | 'list-unordered'
  | 'quote'
  | 'code';

export interface TextFormat {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  link?: string;
}

export interface TextSegment {
  text: string;
  format: TextFormat;
}

export interface EditorBlock {
  id: string;
  type: BlockType;
  content: TextSegment[];
  data?: Record<string, any>;
  order: number;
}

// Tipos específicos para cada bloque
export interface ParagraphBlock extends EditorBlock {
  type: 'paragraph';
}

export interface HeadingBlock extends EditorBlock {
  type: 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5' | 'heading6';
}

export interface ImageBlock extends EditorBlock {
  type: 'image';
  data: {
    url: string;
    alt: string;
    caption?: string;
  };
}

export interface ListBlock extends EditorBlock {
  type: 'list-ordered' | 'list-unordered';
  data: {
    items: string[];
  };
}

export interface QuoteBlock extends EditorBlock {
  type: 'quote';
  data: {
    author?: string;
  };
}

export interface CodeBlock extends EditorBlock {
  type: 'code';
  data: {
    language?: string;
  };
}

// Tipo para el editor completo
export interface EditorState {
  blocks: EditorBlock[];
  selectedBlockId?: string;
  selectedTextRange?: {
    start: number;
    end: number;
  };
} 