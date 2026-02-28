export const getImageUrl = (imagePath?: string | null) => {
    if (!imagePath) return '';

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

    return `${baseUrl}${imagePath}`;
};
