import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import api from '../utils/axios';
import { Doctor } from '../types/doctor';
import { CreateDoctorPayload } from '../types/createDoctor';

interface DoctorContextProps {
  doctors: Doctor[];
  doctor: Doctor | null;
  loading: boolean;
  error: string | null;

  fetchDoctors: () => Promise<void>;
  fetchDoctorById: (id: number) => Promise<void>;
  createDoctor: (data: CreateDoctorPayload) => Promise<Doctor>;
  updateDoctor: (id: number, data: Partial<CreateDoctorPayload>) => Promise<Doctor>;
  deleteDoctor: (id: number) => Promise<void>;
}

const DoctorContext = createContext<DoctorContextProps>(
  {} as DoctorContextProps
);

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GET /doctors
  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get('/api/doctors');
      setDoctors(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar doctores');
    } finally {
      setLoading(false);
    }
  };

  // GET /doctors/{id}
  const fetchDoctorById = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/api/doctors/${id}`);
      setDoctor(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar doctor');
    } finally {
      setLoading(false);
    }
  };

  // POST /doctors
  const createDoctor = async (
    data: CreateDoctorPayload
  ): Promise<Doctor> => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/api/doctors', data);
      const newDoctor = res.data.data;

      setDoctors((prev) => [newDoctor, ...prev]);
      return newDoctor;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear doctor');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // PUT /doctors/{id}
  const updateDoctor = async (
    id: number,
    data: Partial<CreateDoctorPayload>
  ): Promise<Doctor> => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.put(`/api/doctors/${id}`, data);
      const updatedDoctor = res.data.data;

      setDoctors((prev) =>
        prev.map((d) => (d.id === id ? updatedDoctor : d))
      );

      if (doctor?.id === id) {
        setDoctor(updatedDoctor);
      }

      return updatedDoctor;
    } catch (err: any) {
      setError(err.response?.data?.message || 'No autorizado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // DELETE /doctors/{id}
  const deleteDoctor = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/api/doctors/${id}`);
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'No autorizado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        doctor,
        loading,
        error,
        fetchDoctors,
        fetchDoctorById,
        createDoctor,
        updateDoctor,
        deleteDoctor,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctors = () => useContext(DoctorContext);
