import { useState } from "react";
import { uploadArticlePortada } from "@/modules/core/api/articles.api";

export function useUploadArticlePortada() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadPortada = async (id: number, file: File, textoAlt?: string) => {
        setLoading(true);
        setError(null);
        try {
            const result = await uploadArticlePortada(id, file, textoAlt);
            return result;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Error al subir la imagen";
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { uploadPortada, loading, error };
} 