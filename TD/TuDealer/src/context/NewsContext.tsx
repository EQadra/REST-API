import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import api from '../utils/axios';
import { News } from '../types/news';
import { CreateNewsPayload } from '../types/createNews';

interface NewsContextProps {
  news: News[];
  singleNews: News | null;
  loading: boolean;
  error: string | null;

  fetchNews: (type?: string) => Promise<void>;
  fetchNewsById: (id: number) => Promise<void>;
  createNews: (data: CreateNewsPayload) => Promise<News>;
  updateNews: (
    id: number,
    data: CreateNewsPayload
  ) => Promise<News>;
  deleteNews: (id: number) => Promise<void>;
}

const NewsContext = createContext<NewsContextProps>(
  {} as NewsContextProps
);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [news, setNews] = useState<News[]>([]);
  const [singleNews, setSingleNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* -----------------------------
   | GET /news?type=doctor|lawyer|shop|association
   ----------------------------- */
  const fetchNews = async (type?: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get('/api/news', {
        params: type ? { type } : {},
      });

      setNews(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar noticias');
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
   | GET /news/{id}
   ----------------------------- */
  const fetchNewsById = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/api/news/${id}`);
      setSingleNews(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar noticia');
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
   | POST /news
   ----------------------------- */
  const createNews = async (
    data: CreateNewsPayload
  ): Promise<News> => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/api/news', data);
      const created = res.data;

      setNews((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear noticia');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
   | PUT /news/{id}
   ----------------------------- */
  const updateNews = async (
    id: number,
    data: CreateNewsPayload
  ): Promise<News> => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.put(`/api/news/${id}`, data);
      const updated = res.data;

      setNews((prev) =>
        prev.map((n) => (n.id === id ? updated : n))
      );

      if (singleNews?.id === id) {
        setSingleNews(updated);
      }

      return updated;
    } catch (err: any) {
      setError(err.response?.data?.message || 'No autorizado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
   | DELETE /news/{id}
   ----------------------------- */
  const deleteNews = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/api/news/${id}`);
      setNews((prev) => prev.filter((n) => n.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'No autorizado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <NewsContext.Provider
      value={{
        news,
        singleNews,
        loading,
        error,
        fetchNews,
        fetchNewsById,
        createNews,
        updateNews,
        deleteNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
