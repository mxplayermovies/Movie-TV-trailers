// export interface Genre {
//   id?: number;
//   name: string;
// }

// export interface StreamSource {
//   id: string;
//   name: string;
//   url: string;
//   quality?: string;
//   type: 'iframe' | 'hls';
// }

// export interface MediaItem {
//   id: string | number;
//   title?: string;
//   name?: string;
//   poster_path: string | null;
//   backdrop_path: string | null;
//   release_date?: string;
//   first_air_date?: string;
//   vote_average?: number;
//   overview?: string;
//   media_type: 'movie' | 'tv' | 'sports' | 'tv_live';
//   genres?: Genre[] | string[];
//   streams?: Record<string, string> | StreamSource[];
//   yt_id?: string;
//   duration?: string;
// }

// export interface ContentDetails extends MediaItem {
//   streams: Record<string, string> | StreamSource[];
// }

// export interface CastMember {
//   id: number;
//   name: string;
//   character: string;
//   profile_path: string | null;
//   order: number;
// }

export interface Genre {
  id?: number;
  name: string;
}

export interface StreamSource {
  id: string;
  name: string;
  url: string;
  quality?: string;
  type: 'iframe' | 'hls';
}

export interface MediaItem {
  id: string | number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  overview?: string;
  media_type: 'movie' | 'tv' | 'sports' | 'tv_live';
  genres?: Genre[] | string[];
  streams?: Record<string, string> | StreamSource[];
  yt_id?: string;
  duration?: string;
}

export interface ContentDetails extends MediaItem {
  streams: Record<string, string> | StreamSource[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  videoId?: string | null;
  // category: string;
  tags: string[];
  author: string;
  date: string;
}