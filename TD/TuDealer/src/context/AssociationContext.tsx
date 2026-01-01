import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import api from '../utils/axios';
import { Association } from '../types/association';

interface AssociationContextProps {
  associations: Association[];
  association: Association | null;
  loading: boolean;
  error: string | null;

  fetchAssociations: () => Promise<void>;
  fetchAssociationById: (id: number) => Promise<void>;
  createAssociation: (data: Partial<Association>) => Promise<Association>;
  deleteAssociation: (id: number) => Promise<void>;
}

const AssociationContext = createContext<AssociationContextProps>(
  {} as AssociationContextProps
);

export const AssociationProvider = ({ children }: { children: ReactNode }) => {
  const [associations, setAssociations] = useState<Association[]>([]);
  const [association, setAssociation] = useState<Association | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GET /associations
  const fetchAssociations = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get('/api/associations');
      setAssociations(res.data.data ?? res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar asociaciones');
    } finally {
      setLoading(false);
    }
  };

  // GET /associations/{id}
  const fetchAssociationById = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/api/associations/${id}`);
      setAssociation(res.data.data ?? res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar la asociación');
    } finally {
      setLoading(false);
    }
  };

  // POST /associations
  const createAssociation = async (
    data: Partial<Association>
  ): Promise<Association> => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/api/associations', data);
      const newAssociation = res.data.data ?? res.data;

      setAssociations((prev) => [...prev, newAssociation]);
      return newAssociation;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear asociación');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // DELETE /associations/{id}
  const deleteAssociation = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/api/associations/${id}`);
      setAssociations((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar asociación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AssociationContext.Provider
      value={{
        associations,
        association,
        loading,
        error,
        fetchAssociations,
        fetchAssociationById,
        createAssociation,
        deleteAssociation,
      }}
    >
      {children}
    </AssociationContext.Provider>
  );
};

export const useAssociations = () => useContext(AssociationContext);
