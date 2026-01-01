export interface News {
  id: number;

  titulo: string;
  descripcion: string;
  url?: string | null;

  fecha_publicacion: string;

  newable_id: number;
  newable_type: string;

  created_at?: string;
  updated_at?: string;
}
