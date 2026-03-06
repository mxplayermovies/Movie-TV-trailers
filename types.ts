// export interface StreamSource {
//   id: string;
//   name: string;
//   url: string;
//   quality: string;
//   type: 'hls' | 'direct' | 'iframe';
// }

// export interface MediaItem {
//   id: number | string;
//   title?: string;
//   name?: string;
//   poster_path: string;
//   backdrop_path: string;
//   release_date?: string;
//   first_air_date?: string;
//   vote_average: number;
//   overview: string;
//   media_type: 'movie' | 'tv' | 'sports' | 'tv_live';
//   duration?: string;
//   genres?: string[] | { id: number; name: string }[];
//   streams?: Record<string, string> | StreamSource[];
//   yt_id?: string; 

// }

// export interface Movie extends MediaItem {
//   media_type: 'movie';
//   title: string;
// }

// export interface TVShow extends MediaItem {
//   media_type: 'tv';
//   name: string;
// }

// export interface ContentDetails {
//   id: number | string;
//   title?: string;
//   name?: string;
//   poster_path: string;
//   backdrop_path: string;
//   vote_average: number;
//   overview: string;
//   release_date?: string;
//   first_air_date?: string;
//   genres: { id: number; name: string }[];
//   runtime?: number;
//   number_of_seasons?: number;
//   streams?: Record<string, string> | StreamSource[];
//   media_type?: 'movie' | 'tv' | 'sports' | 'tv_live';
//   yt_id?: string;
// }

// export interface CastMember {
//   id: number;
//   name: string;
//   character: string;
//   profile_path: string | null;
// }







// // types/index.ts

// export interface StreamSource {
//   id: string;
//   name: string;
//   url: string;
//   quality: string;
//   type: 'hls' | 'direct' | 'iframe';
// }

// export interface MediaItem {
//   id: number | string;
//   title?: string;
//   name?: string;
//   poster_path: string;
//   backdrop_path: string;
//   release_date?: string;
//   first_air_date?: string;
//   vote_average: number;
//   overview: string;
//   media_type: 'movie' | 'tv' | 'sports' | 'tv_live';
//   duration?: string;
//   genres?: string[] | { id: number; name: string }[];
//   streams?: Record<string, string> | StreamSource[];
//   yt_id?: string; // ✅ CUSTOM TRAILER ID – FIXES BUILD ERROR
//   yt_bg_music_id?: string;
// }

// export interface Movie extends MediaItem {
//   media_type: 'movie';
//   title: string;
// }

// export interface TVShow extends MediaItem {
//   media_type: 'tv';
//   name: string;
// }

// export interface ContentDetails {
//   id: number | string;
//   title?: string;
//   name?: string;
//   poster_path: string;
//   backdrop_path: string;
//   vote_average: number;
//   overview: string;
//   release_date?: string;
//   first_air_date?: string;
//   genres?: string[] | { id: number; name: string }[]; // ✅ SUPPORTS BOTH FORMATS
//   runtime?: number;
//   number_of_seasons?: number;
//   number_of_episodes?: number;
//   status?: string;
//   type?: string;
//   streams?: Record<string, string> | StreamSource[];
//   media_type?: 'movie' | 'tv' | 'sports' | 'tv_live';
//   yt_id?: string; // ✅ CUSTOM TRAILER ID
//   yt_bg_music_id?: string; // ✅ CUSTOM BACKGROUND MUSIC ID
// }

// export interface CastMember {
//   id: number;
//   name: string;
//   character: string;
//   profile_path: string | null;
// }


// types/index.ts

export interface StreamSource {
  id: string;
  name: string;
  url: string;
  quality: string;
  type: 'hls' | 'direct' | 'iframe';
}

export interface MediaItem {
  id: number | string;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  overview: string;
  media_type: 'movie' | 'tv' | 'sports' | 'tv_live' | 'adult' | 'documentary';
  duration?: string;
  genres?: string[] | { id: number; name: string }[];
  streams?: Record<string, string> | StreamSource[];
  yt_id?: string;
  yt_bg_music_id?: string;
}

export interface Movie extends MediaItem {
  media_type: 'movie';
  title: string;
}

export interface TVShow extends MediaItem {
  media_type: 'tv';
  name: string;
}

export interface AdultMovie extends MediaItem {
  media_type: 'adult';
  title: string;
}

export interface Documentary extends MediaItem {
  media_type: 'documentary';
  title: string;
}

export interface ContentDetails {
  id: number | string;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  genres?: string[] | { id: number; name: string }[];
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  status?: string;
  type?: string;
  streams?: Record<string, string> | StreamSource[];
  media_type?: 'movie' | 'tv' | 'sports' | 'tv_live' | 'adult' | 'documentary';
  yt_id?: string;
  yt_bg_music_id?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  videoId?: string | null;
  yt_bg_music_id?: string;   // 🎵 ADDED – background music for blog post
  category: string;   
  tags: string[];
  author: string;
  date: string;
}