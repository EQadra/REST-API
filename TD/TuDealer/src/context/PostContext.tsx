import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axios';
import { Post } from '../types/post';
import { CreatePostPayload } from '../types/createPost';
import { PostResponse } from '../types/PostResponse';

type PostContextType = {
  posts: Post[];
  loading: boolean;
  fetchPosts: () => Promise<void>;
  createPost: (payload: CreatePostPayload) => Promise<Post | null>;
  deletePost: (id: number) => Promise<boolean>;
};

const PostContext = createContext<PostContextType>({} as PostContextType);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /* -----------------------------
   | Fetch all posts
   ----------------------------- */
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Post[]>('/api/posts');
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts', error);
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
   | Create a new post
   ----------------------------- */
  const createPost = async (payload: CreatePostPayload) => {
    try {
      const { data } = await api.post<PostResponse>('/api/posts', payload);
      setPosts(prev => [data.data, ...prev]);
      return data.data;
    } catch (error) {
      console.error('Error creating post', error);
      return null;
    }
  };

  /* -----------------------------
   | Delete post (owner/admin)
   ----------------------------- */
  const deletePost = async (id: number) => {
    try {
      await api.delete(`/api/posts/${id}`);
      setPosts(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting post', error);
      return false;
    }
  };

  /* -----------------------------
   | Load posts on mount
   ----------------------------- */
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        fetchPosts,
        createPost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

/* -----------------------------
 | Hook
 ----------------------------- */
export const usePosts = () => useContext(PostContext);
