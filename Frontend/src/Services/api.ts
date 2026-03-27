const API_BASE_URL = 'http://localhost:8000';
const IMAGE_BASE_URL = 'http://localhost:8000/images';

export interface Photo {
    id: number | string;
    src: string;
    title: string;
    height: string;
}

export const uploadFile = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Process and store results
        // Backend returns: { matches: string[], all: string[] }
        
        const matches: Photo[] = (data.matches || []).map((filename: string, index: number) => ({
            id: `match-${index}`,
            src: `${IMAGE_BASE_URL}/${filename}`,
            title: filename,
            height: 'auto'
        }));

        const allPhotos: Photo[] = (data.all || []).map((filename: string, index: number) => ({
            id: `all-${index}`,
            src: `${IMAGE_BASE_URL}/${filename}`,
            title: filename,
            height: 'auto'
        }));

        sessionStorage.setItem('facefindr_matches', JSON.stringify(matches));
        sessionStorage.setItem('facefindr_all', JSON.stringify(allPhotos));

        return { success: true, count: matches.length };
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export const fetchYourPhotos = async (): Promise<Photo[]> => {
    const stored = sessionStorage.getItem('facefindr_matches');
    return stored ? JSON.parse(stored) : [];
};

export const fetchAllPhotos = async (): Promise<Photo[]> => {
    const stored = sessionStorage.getItem('facefindr_all');
    // If not in storage, we might want to fetch from backend if we had a dedicated endpoint
    // For now, rely on upload populating this, or fallback to empty/mock if strictly needed.
    // If empty, maybe the user hasn't uploaded yet. 
    return stored ? JSON.parse(stored) : [];
};

export const signup = async (email: string, password: string): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || `Signup failed: ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, message: data.message };
    } catch (error: any) {
        console.error('Error during signup:', error);
        throw error;
    }
};
