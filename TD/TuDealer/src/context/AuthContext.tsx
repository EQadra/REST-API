import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import api, { setAuthToken } from '../utils/axios';
import { User } from '../types/user'; // recomendado

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* ------------------------------------------------
   | Load session on app start
   ------------------------------------------------ */
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('token');

        if (storedToken) {
          await setAuthToken(storedToken); // 🔑 sincroniza axios
          setToken(storedToken);

          const { data } = await api.get('/api/auth/me');
          setUser(data);
        }
      } catch (error) {
        await setAuthToken(null);
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  /* ------------------------------------------------
   | Login
   ------------------------------------------------ */
  const login = async (email: string, password: string) => {
    const { data } = await api.post('/api/auth/login', {
      email,
      password,
    });

    await setAuthToken(data.access_token);

    setToken(data.access_token);
    setUser(data.user);
  };

  /* ------------------------------------------------
   | Logout
   ------------------------------------------------ */
  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (_) {}

    await setAuthToken(null); // 🔑 limpia axios + SecureStore
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ------------------------------------------------
 | Hook
 ------------------------------------------------ */
export const useAuth = () => useContext(AuthContext);
