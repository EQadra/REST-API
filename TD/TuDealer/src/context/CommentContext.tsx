import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import api from '../utils/axios';
import { Comment } from '../types/comment';
import { CreateCommentPayload } from '../types/createComment';

interface CommentContextProps {
  comments: Comment[];
  loading: boolean;
  error: string | null;

  fetchComments: () => Promise<void>;
  createComment: (data: CreateCommentPayload) => Promise<Comment>;
  deleteComment: (id: number) => Promise<void>;
}

const CommentContext = createContext<CommentContextProps>(
  {} as CommentContextProps
);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * GET /comments
   */
  const fetchComments = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get('/api/comments');
      setComments(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar comentarios');
    } finally {
      setLoading(false);
    }
  };

  /**
   * POST /comments
   */
  const createComment = async (
    data: CreateCommentPayload
  ): Promise<Comment> => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/api/comments', data);
      const newComment = res.data.data;

      setComments((prev) => [newComment, ...prev]);
      return newComment;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear comentario');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE /comments/{id}
   */
  const deleteComment = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/api/comments/${id}`);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'No autorizado o error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        error,
        fetchComments,
        createComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => useContext(CommentContext);
