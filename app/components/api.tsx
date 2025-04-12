
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

// Konfigurasi Axios default
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor untuk handling error
api.interceptors.response.use(
  response => response,
  (error: AxiosError<any>) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ message: 'Request timeout' });
    }
    return Promise.reject(error.response?.data || { message: 'Unknown error' });
  }
);

// Hook untuk pengecekan autentikasi
export const useAuthCheck = (): boolean | null => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get<{ authenticated: boolean }>("/check-auth");
        setIsAuthenticated(data.authenticated);
      } catch {
        console.log('false');
        setIsAuthenticated(false);
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  return isAuthenticated;
};

// Fungsi untuk generate gambar dari prompt
export const generateImageWithGemini = async ({ prompt }: { prompt: string }): Promise<any> => {
  try {
    const response = await api.post<{ imageUrl: string }>("/generate-image", { prompt });
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || error.message || error);
    throw new Error(error.message || "Unknown error");
  }
};

// Fungsi untuk generate teks dari prompt
export const generateTextWithGemini = async ({ prompt }: { prompt: string }): Promise<any> => {
  try {
    const response = await api.post<{ generatedText: string }>("/generate-text", { prompt });
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || error.message || error);
    throw new Error(error.message || "Unknown error");
  }
};

// Fungsi untuk menambahkan konten ke database
export const addContentToDatabase = async ({
  title,
  desc,
  imagesLink,
  captions
}: {
  title: string;
  desc: string;
  imagesLink: string;
  captions: string[];
}): Promise<any> => {
  try {
    const response = await api.post('/add-content', { title, desc, imagesLink, captions });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Fungsi untuk mengambil konten dari database
export const showContentsToViewPage = async (): Promise<any[]> => {
  try {
    const response = await api.get<{ contents: any[] }>('/get-contents');
    return response.data.contents;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const changePaidStatus  = async({ 
  title,
  desc,
  }: {
  title: string;
  desc: string;
  }): 
  Promise<any[]> => {
  try {
    const response = await api.post('/changePaidStatus', { title, desc}); // POST ke endpoint update
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const showDetailedContent = async (id : string): Promise<any[]> => {
  try {
    const response = await api.post('/get-content', {id});
    return response.data.content;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Fungsi untuk logout akun Google
export const googleLogout = async (): Promise<void> => {
  try {
    const response = await api.post('/googleLogout');
    console.log(response.data);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Logout failed");
  }
};
