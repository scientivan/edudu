import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import type { ContentItemProps } from "@/app/components/explore/ContentCard";

// =====================
// TIPE DATA
// =====================
interface AuthResponse {
  authenticated: boolean;
}

interface ImageResponse {
  imageUrl: string;
}


export interface Content {
  title: string;
  desc: string;
  imagesLink: string;
  captions: string[];
  likeCount : number,
  watchCount : number
}

interface ContentsResponse {
  contents: Content[];
}

interface ErrorResponse {
  message?: string;
}


// =====================
// KONFIGURASI AXIOS
// =====================
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// =====================
// INTERCEPTOR
// =====================
api.interceptors.response.use(
  response => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ message: 'Request timeout' });
    }
    return Promise.reject(error.response?.data || { message: 'Unknown error' });
  }
);

// =====================
// HOOK CEK AUTH
// =====================
export const useAuthCheck = (): boolean | null => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get<AuthResponse>("/check-auth");
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

// =====================
// FUNGSI API
// =====================

export const generateImageWithGemini = async (
  { prompt }: { prompt: string }
): Promise<ImageResponse> => {
  const response = await api.post<ImageResponse>("/generate-image", { prompt });
  return response.data;
};

export const generateTextWithGemini = async (
  { prompt }: { prompt: string }
): Promise<String> => {
  const response = await api.post<String>("/generate-text", { prompt });
  return response.data;
};

export const addContentToDatabase = async (
  content: Content
): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/add-content', content);
  return response.data;
};

export const showContentsToViewPage = async (): Promise<Content[]> => {
  const response = await api.get<ContentsResponse>('/get-contents');
  return response.data.contents;
};

export const changePaidStatus = async (
  data: Pick<Content, "title" | "desc">
): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/changePaidStatus', data);
  return response.data;
};

// export const showDetailedContent = async (
//   id: string
// ): Promise<Content[]> => {
//   const response = await api.post<DetailResponse>('/get-content', { id });
//   return response.data.content;
// };

export const showDetailedContent = async (id: string): Promise<ContentItemProps[]> => {
  try {
    const response = await api.post('/get-content', { id });
    return response.data.content;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// export const googleLogout = async (): Promise<void> => {
//   try {
//     await api.post('/googleLogout');
//   } catch (error) {
//     const err = error as AxiosError<ErrorResponse>;
//     throw new Error(err.response?.data?.message || "Logout failed");
//   }
// };
