import { User } from './user';
import { Comment } from './comment';

export interface Service {
  id: number;

  serviceable_id: number;
  serviceable_type: string; // Ej: "App\\Models\\Doctor", "App\\Models\\Shop"
  
  name: string;
  description?: string | null;
  price?: number | null;      // Si tu backend tiene precio
  duration?: string | null;   // Si tu backend tiene duración u horario
  image?: string | null;

  user?: User;               // Usuario propietario (opcional, depende de la relación)
  comments: Comment[];

  created_at: string;
  updated_at: string;
}
