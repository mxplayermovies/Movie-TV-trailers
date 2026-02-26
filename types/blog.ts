export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  videoId?: string | null;
  category: string;
  tags: string[];
  author: string;
  date: string;
}