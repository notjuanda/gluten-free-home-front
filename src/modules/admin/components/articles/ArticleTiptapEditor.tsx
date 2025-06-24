import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import type { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { FiBold, FiItalic, FiType, FiList, FiImage, FiCode, FiMessageSquare } from 'react-icons/fi';

interface ArticleTiptapEditorProps {
    value?: JSONContent;
    onChange?: (content: JSONContent) => void;
}

const ArticleTiptapEditor: React.FC<ArticleTiptapEditorProps> = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Escribe el contenido del artículo aquí...'
            }),
            Image,
        ],
        content: value || '',
        onUpdate({ editor }) {
            onChange?.(editor.getJSON());
        },
        editorProps: {
            attributes: {
                class: 'ProseMirror min-h-[200px] max-w-none focus:outline-none p-4 bg-white rounded-b-lg border border-t-0 border-primary/20',
            },
        },
    });

    // Si cambia el value externo, actualiza el editor
    useEffect(() => {
        if (editor && value) {
            editor.commands.setContent(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    if (!editor) return <div>Cargando editor...</div>;

    return (
        <div className="rounded-lg shadow border border-primary/20 bg-white">
            <div className="sticky top-0 z-10 flex flex-wrap gap-1 px-2 py-2 bg-gray-50 border-b border-primary/10 rounded-t-lg">
                <button type="button" title="Negrita" onClick={() => editor.chain().focus().toggleBold().run()} className={`toolbar-btn ${editor.isActive('bold') ? 'text-primary' : ''}`}><FiBold /></button>
                <button type="button" title="Cursiva" onClick={() => editor.chain().focus().toggleItalic().run()} className={`toolbar-btn ${editor.isActive('italic') ? 'text-primary' : ''}`}><FiItalic /></button>
                <button type="button" title="Encabezado 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`toolbar-btn ${editor.isActive('heading', { level: 1 }) ? 'text-primary' : ''}`}><FiType className="inline" />1</button>
                <button type="button" title="Encabezado 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'text-primary' : ''}`}><FiType className="inline" />2</button>
                <button type="button" title="Lista" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`toolbar-btn ${editor.isActive('bulletList') ? 'text-primary' : ''}`}><FiList /></button>
                <button type="button" title="Lista numerada" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`toolbar-btn ${editor.isActive('orderedList') ? 'text-primary' : ''}`}><FiList /></button>
                <button type="button" title="Cita" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`toolbar-btn ${editor.isActive('blockquote') ? 'text-primary' : ''}`}><FiMessageSquare /></button>
                <button type="button" title="Código" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`toolbar-btn ${editor.isActive('codeBlock') ? 'text-primary' : ''}`}><FiCode /></button>
                <button type="button" title="Imagen" onClick={() => {
                    const url = window.prompt('URL de la imagen');
                    if (url) {
                        editor.chain().focus().setImage({ src: url }).run();
                    }
                }} className="toolbar-btn"><FiImage /></button>
            </div>
            <EditorContent editor={editor} />
            <style>{`
                .toolbar-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.5rem;
                    border-radius: 0.375rem;
                    background: transparent;
                    transition: background 0.15s;
                    font-size: 1.1rem;
                }
                .toolbar-btn:hover {
                    background: #f1f5f9;
                }
                .ProseMirror > * {
                    margin-bottom: 1.1rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 1px 4px 0 #e5e7eb;
                    padding: 0.5rem 0.75rem;
                    background: #fafbfc;
                }
                .ProseMirror img {
                    max-width: 100%;
                    border-radius: 0.5rem;
                    margin: 0.5rem 0;
                    box-shadow: 0 1px 4px 0 #e5e7eb;
                }
            `}</style>
        </div>
    );
};

export default ArticleTiptapEditor; 