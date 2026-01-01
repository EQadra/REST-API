import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axios';
import { Shop } from '../types/shop';
import { CreateShopPayload } from '../types/createShop';

type ShopContextType = {
  shops: Shop[];
  loading: boolean;
  fetchShops: () => Promise<void>;
  createShop: (payload: CreateShopPayload) => Promise<Shop | null>;
  deleteShop: (id: number) => Promise<boolean>;
};

const ShopContext = createContext<ShopContextType>({} as ShopContextType);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /* -----------------------------
   | Fetch all shops
   ----------------------------- */
  const fetchShops = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Shop[]>('/api/shops');
      setShops(data);
    } catch (error) {
      console.error('Error fetching shops', error);
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
   | Create a new shop
   ----------------------------- */
  const createShop = async (payload: CreateShopPayload) => {
    try {
      const { data } = await api.post<{ message: string; data: Shop }>('/api/shops', payload);
      setShops(prev => [data.data, ...prev]);
      return data.data;
    } catch (error) {
      console.error('Error creating shop', error);
      return null;
    }
  };

  /* -----------------------------
   | Delete shop (owner/admin)
   ----------------------------- */
  const deleteShop = async (id: number) => {
    try {
      await api.delete(`/api/shops/${id}`);
      setShops(prev => prev.filter(s => s.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting shop', error);
      return false;
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  return (
    <ShopContext.Provider
      value={{
        shops,
        loading,
        fetchShops,
        createShop,
        deleteShop,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

/* -----------------------------
 | Hook
 ----------------------------- */
export const useShops = () => useContext(ShopContext);
