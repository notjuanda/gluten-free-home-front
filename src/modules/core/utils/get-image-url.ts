const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) {
        return '/logo-gluten-free-home.png'; 
    }
    if (imageUrl.startsWith('http') || imageUrl.startsWith('blob:')) {
        return imageUrl;
    }
    return `${API_BASE_URL.replace(/\/$/, '')}/${imageUrl.replace(/^\//, '')}`;
}; 