import type { ArticleBlock } from '../types/article.type';
import type { EditorBlock, BlockType, TextSegment } from '../types/editor-block.type';
// Convertir bloques del backend a bloques del editor
export function backendBlocksToEditorBlocks(backendBlocks: ArticleBlock[]): EditorBlock[] {
    return backendBlocks.map((block, index) => {
        const { id, type, data, order } = block;
        
        // Convertir según el tipo
        switch (type) {
        case 'paragraph':
            return {
            id,
            type: 'paragraph' as BlockType,
            content: parseTextContent(data.content || ''),
            order: order || index + 1
            };
            
        case 'heading':
            const level = data.attrs?.level || 1;
            return {
            id,
            type: `heading${level}` as BlockType,
            content: parseTextContent(data.content || ''),
            order: order || index + 1
            };
            
        case 'image':
            return {
            id,
            type: 'image' as BlockType,
            content: [],
            data: {
                url: data.attrs?.src || data.url || '',
                alt: data.attrs?.alt || data.alt || '',
                caption: data.caption || ''
            },
            order: order || index + 1
            };
            
        case 'bulletList':
            return {
            id,
            type: 'list-unordered' as BlockType,
            content: [],
            data: {
                items: data.content?.map((item: any) => item.content?.[0]?.content?.[0]?.text || '') || []
            },
            order: order || index + 1
            };
            
        case 'orderedList':
            return {
            id,
            type: 'list-ordered' as BlockType,
            content: [],
            data: {
                items: data.content?.map((item: any) => item.content?.[0]?.content?.[0]?.text || '') || []
            },
            order: order || index + 1
            };
            
        case 'blockquote':
            return {
            id,
            type: 'quote' as BlockType,
            content: parseTextContent(data.content || ''),
            data: {
                author: data.author || ''
            },
            order: order || index + 1
            };
            
        case 'codeBlock':
            return {
            id,
            type: 'code' as BlockType,
            content: parseTextContent(data.content || ''),
            data: {
                language: data.language || ''
            },
            order: order || index + 1
            };
            
        default:
            return {
            id,
            type: 'paragraph' as BlockType,
            content: parseTextContent(data.content || ''),
            order: order || index + 1
            };
        }
    });
}

// Convertir bloques del editor a bloques del backend
export function editorBlocksToBackendBlocks(editorBlocks: EditorBlock[]): ArticleBlock[] {
    return editorBlocks.map((block, index) => {
        const { id, type, content, data, order } = block;
        
        // Convertir según el tipo
        switch (type) {
        case 'paragraph':
            return {
            id,
            type: 'paragraph',
            data: {
                content: contentToText(content)
            },
            order: order || index + 1
            };
            
        case 'heading1':
        case 'heading2':
        case 'heading3':
        case 'heading4':
        case 'heading5':
        case 'heading6':
            const level = parseInt(type.replace('heading', ''));
            return {
            id,
            type: 'heading',
            data: {
                attrs: { level },
                content: contentToText(content)
            },
            order: order || index + 1
            };
            
        case 'image':
            return {
            id,
            type: 'image',
            data: {
                attrs: {
                src: data?.url || '',
                alt: data?.alt || ''
                },
                caption: data?.caption || ''
            },
            order: order || index + 1
            };
            
        case 'list-unordered':
            return {
            id,
            type: 'bulletList',
            data: {
                content: (data?.items || []).map((item: string) => ({
                type: 'listItem',
                content: [{
                    type: 'paragraph',
                    content: [{ type: 'text', text: item }]
                }]
                }))
            },
            order: order || index + 1
            };
            
        case 'list-ordered':
            return {
            id,
            type: 'orderedList',
            data: {
                content: (data?.items || []).map((item: string) => ({
                type: 'listItem',
                content: [{
                    type: 'paragraph',
                    content: [{ type: 'text', text: item }]
                }]
                }))
            },
            order: order || index + 1
            };
            
        case 'quote':
            return {
            id,
            type: 'blockquote',
            data: {
                content: contentToText(content),
                author: data?.author || ''
            },
            order: order || index + 1
            };
            
        case 'code':
            return {
            id,
            type: 'codeBlock',
            data: {
                content: contentToText(content),
                language: data?.language || ''
            },
            order: order || index + 1
            };
            
        default:
            return {
            id,
            type: 'paragraph',
            data: {
                content: contentToText(content)
            },
            order: order || index + 1
            };
        }
    });
    }

    // Función auxiliar para parsear contenido de texto con formato
    function parseTextContent(content: any): TextSegment[] {
    if (typeof content === 'string') {
        return [{ text: content, format: {} }];
    }
    
    if (Array.isArray(content)) {
        return content.map((item: any) => {
        if (typeof item === 'string') {
            return { text: item, format: {} };
        }
        
        if (item.type === 'text') {
            const format: any = {};
            if (item.marks) {
            item.marks.forEach((mark: any) => {
                switch (mark.type) {
                case 'bold':
                    format.bold = true;
                    break;
                case 'italic':
                    format.italic = true;
                    break;
                case 'underline':
                    format.underline = true;
                    break;
                case 'link':
                    format.link = mark.attrs?.href || '';
                    break;
                }
            });
            }
            return { text: item.text || '', format };
        }
        
        return { text: '', format: {} };
        });
    }
    
    return [{ text: '', format: {} }];
}

// Función auxiliar para convertir contenido a texto plano
function contentToText(content: TextSegment[]): string {
    return content.map(segment => segment.text).join('');
}

// Función para generar ID único
export function generateBlockId(): string {
    return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
} 