export interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author: number;
  tagline: string;
  num_likes: number;
  is_liked: boolean;
}
