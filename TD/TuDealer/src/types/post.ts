import { User } from './user';
import { Comment } from './comment';

export interface Post {
  id: number;

  user_id: number;
  user: User;

  title: string;
  content: string;
  image?: string | null;
  category?: string | null;

  comments: Comment[];

  created_at: string;
  updated_at: string;
}
