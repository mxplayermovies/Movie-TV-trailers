// // lib/core/BackgroundMusicManager.ts
// /**
//  * 🎵 BackgroundMusicManager
//  * - Does NOT load YouTube API again – waits for window.YT (loaded by YouTubePlayer)
//  * - Creates a hidden player (0px) for audio‑only background music
//  * - Singleton, SSR‑safe
//  */

// export class BackgroundMusicManager {
//   private static instance: BackgroundMusicManager;
//   private player: any = null;
//   private playerReady = false;
//   private pendingVideoId: string | null = null;
//   private volume = 20; // low background volume
//   private apiCheckInterval: ReturnType<typeof setInterval> | null = null;
//   private readonly MAX_WAIT = 5000; // 5 seconds timeout

//   private constructor() {
//     if (typeof window === 'undefined') return;
//     this.waitForYouTubeAPI();
//   }

//   public static getInstance(): BackgroundMusicManager {
//     if (!BackgroundMusicManager.instance) {
//       BackgroundMusicManager.instance = new BackgroundMusicManager();
//     }
//     return BackgroundMusicManager.instance;
//   }

//   private waitForYouTubeAPI(): void {
//     const startTime = Date.now();
//     this.apiCheckInterval = setInterval(() => {
//       if (window.YT && window.YT.Player) {
//         this.onAPIReady();
//         if (this.apiCheckInterval) {
//           clearInterval(this.apiCheckInterval);
//           this.apiCheckInterval = null;
//         }
//       } else if (Date.now() - startTime > this.MAX_WAIT) {
//         console.warn('Background music: YouTube API not loaded after timeout');
//         if (this.apiCheckInterval) {
//           clearInterval(this.apiCheckInterval);
//           this.apiCheckInterval = null;
//         }
//       }
//     }, 100);
//   }

//   private onAPIReady(): void {
//     this.playerReady = true;
//     if (this.pendingVideoId) {
//       this.play(this.pendingVideoId);
//       this.pendingVideoId = null;
//     }
//   }

//   private createPlayer(videoId: string): void {
//     if (!window.YT?.Player) return;

//     if (this.player) {
//       try { this.player.destroy(); } catch (e) {}
//       this.player = null;
//     }

//     let container = document.getElementById('bg-music-player');
//     if (!container) {
//       container = document.createElement('div');
//       container.id = 'bg-music-player';
//       container.style.position = 'absolute';
//       container.style.left = '-9999px';
//       container.style.top = '-9999px';
//       container.style.width = '0';
//       container.style.height = '0';
//       container.style.opacity = '0';
//       container.style.pointerEvents = 'none';
//       document.body.appendChild(container);
//     }

//     this.player = new window.YT.Player(container, {
//       height: '0',
//       width: '0',
//       videoId: videoId,
//       playerVars: {
//         autoplay: 1,
//         controls: 0,
//         disablekb: 1,
//         fs: 0,
//         iv_load_policy: 3,
//         loop: 1,
//         modestbranding: 1,
//         playsinline: 1,
//         playlist: videoId, // required for loop
//         rel: 0,
//         showinfo: 0,
//       },
//       events: {
//         onReady: (event: any) => {
//           event.target.setVolume(this.volume);
//           event.target.playVideo();
//         },
//         onError: (e: any) => console.warn('Background music error:', e),
//       },
//     });
//   }

//   public play(videoId: string): void {
//     if (typeof window === 'undefined') return;
//     if (!this.playerReady) {
//       this.pendingVideoId = videoId;
//       return;
//     }
//     if (!videoId) return;

//     if (this.player && this.player.getVideoData) {
//       const current = this.player.getVideoData().video_id;
//       if (current === videoId) {
//         this.player.playVideo();
//         return;
//       }
//     }
//     this.createPlayer(videoId);
//   }

//   public stop(): void {
//     if (typeof window === 'undefined') return;
//     if (this.player) {
//       try { this.player.stopVideo(); } catch (e) {}
//     }
//     this.pendingVideoId = null;
//   }

//   public setVolume(level: number): void {
//     this.volume = Math.max(0, Math.min(100, level));
//     if (this.player && this.player.setVolume) {
//       this.player.setVolume(this.volume);
//     }
//   }
// }

// export const bgMusicManager = BackgroundMusicManager.getInstance();




















































// // lib/core/BackgroundMusicManager.ts
// /**
//  * 🎵 BackgroundMusicManager
//  * - Loads YouTube IFrame API if not already present
//  * - Creates a hidden player (0px) for audio‑only background music
//  * - Includes extensive error logging (check browser console)
//  */

// export class BackgroundMusicManager {
//   private static instance: BackgroundMusicManager;
//   private player: any = null;
//   private playerReady = false;
//   private pendingVideoId: string | null = null;
//   private volume = 20;
//   private apiCheckInterval: ReturnType<typeof setInterval> | null = null;
//   private readonly MAX_WAIT = 10000; // 10 seconds
//   private apiLoaded = false;

//   private constructor() {
//     if (typeof window === 'undefined') return;
//     console.log('[BackgroundMusic] Initializing...');
//     this.loadYouTubeAPI();
//   }

//   public static getInstance(): BackgroundMusicManager {
//     if (!BackgroundMusicManager.instance) {
//       BackgroundMusicManager.instance = new BackgroundMusicManager();
//     }
//     return BackgroundMusicManager.instance;
//   }

//   private loadYouTubeAPI(): void {
//     if (window.YT && window.YT.Player) {
//       console.log('[BackgroundMusic] YouTube API already loaded');
//       this.onAPIReady();
//       return;
//     }
//     if (document.getElementById('youtube-iframe-api')) {
//       console.log('[BackgroundMusic] Waiting for existing YouTube API script...');
//       this.waitForAPI();
//       return;
//     }
//     console.log('[BackgroundMusic] Loading YouTube IFrame API...');
//     const tag = document.createElement('script');
//     tag.id = 'youtube-iframe-api';
//     tag.src = 'https://www.youtube.com/iframe_api';
//     const firstScript = document.getElementsByTagName('script')[0];
//     firstScript?.parentNode?.insertBefore(tag, firstScript);
//     window.onYouTubeIframeAPIReady = () => {
//       console.log('[BackgroundMusic] YouTube API ready callback fired');
//       this.onAPIReady();
//     };
//     this.waitForAPI();
//   }

//   private waitForAPI(): void {
//     const startTime = Date.now();
//     this.apiCheckInterval = setInterval(() => {
//       if (window.YT && window.YT.Player) {
//         console.log('[BackgroundMusic] YouTube API detected');
//         this.onAPIReady();
//         if (this.apiCheckInterval) {
//           clearInterval(this.apiCheckInterval);
//           this.apiCheckInterval = null;
//         }
//       } else if (Date.now() - startTime > this.MAX_WAIT) {
//         console.error('[BackgroundMusic] YouTube API not loaded after timeout');
//         if (this.apiCheckInterval) {
//           clearInterval(this.apiCheckInterval);
//           this.apiCheckInterval = null;
//         }
//       }
//     }, 200);
//   }

//   private onAPIReady(): void {
//     if (this.apiLoaded) return;
//     this.apiLoaded = true;
//     this.playerReady = true;
//     console.log('[BackgroundMusic] API ready, player can be created');
//     if (this.pendingVideoId) {
//       console.log(`[BackgroundMusic] Playing pending video: ${this.pendingVideoId}`);
//       this.play(this.pendingVideoId);
//       this.pendingVideoId = null;
//     }
//   }

//   private createPlayer(videoId: string): void {
//     if (!window.YT?.Player) {
//       console.error('[BackgroundMusic] YT.Player not available');
//       return;
//     }

//     if (this.player) {
//       try {
//         console.log('[BackgroundMusic] Destroying existing player');
//         this.player.destroy();
//       } catch (e) {}
//       this.player = null;
//     }

//     let container = document.getElementById('bg-music-player');
//     if (!container) {
//       console.log('[BackgroundMusic] Creating hidden container');
//       container = document.createElement('div');
//       container.id = 'bg-music-player';
//       container.style.position = 'absolute';
//       container.style.left = '-9999px';
//       container.style.top = '-9999px';
//       container.style.width = '0';
//       container.style.height = '0';
//       container.style.opacity = '0';
//       container.style.pointerEvents = 'none';
//       document.body.appendChild(container);
//     }

//     try {
//       console.log(`[BackgroundMusic] Creating player for video: ${videoId}`);
//       this.player = new window.YT.Player(container, {
//         height: '0',
//         width: '0',
//         videoId: videoId,
//         playerVars: {
//           autoplay: 1,
//           controls: 0,
//           disablekb: 1,
//           fs: 0,
//           iv_load_policy: 3,
//           loop: 1,
//           modestbranding: 1,
//           playsinline: 1,
//           playlist: videoId,
//           rel: 0,
//           showinfo: 0,
//         },
//         events: {
//           onReady: (event: any) => {
//             console.log(`[BackgroundMusic] Player ready for ${videoId}`);
//             event.target.setVolume(this.volume);
//             event.target.playVideo();
//           },
//           onError: (event: any) => {
//             console.error(`[BackgroundMusic] Player error: ${event.data} for video ${videoId}`);
//           },
//         },
//       });
//     } catch (error) {
//       console.error('[BackgroundMusic] Error creating player:', error);
//     }
//   }

//   public play(videoId: string): void {
//     if (typeof window === 'undefined') return;
//     if (!videoId) {
//       console.warn('[BackgroundMusic] No video ID provided');
//       return;
//     }
//     if (!this.playerReady) {
//       console.log(`[BackgroundMusic] API not ready, queueing video: ${videoId}`);
//       this.pendingVideoId = videoId;
//       return;
//     }
//     if (!videoId) return;

//     if (this.player && this.player.getVideoData) {
//       const current = this.player.getVideoData().video_id;
//       if (current === videoId) {
//         console.log(`[BackgroundMusic] Already playing ${videoId}, ensuring play`);
//         this.player.playVideo();
//         return;
//       }
//     }
//     this.createPlayer(videoId);
//   }

//   public stop(): void {
//     if (typeof window === 'undefined') return;
//     console.log('[BackgroundMusic] Stopping');
//     if (this.player) {
//       try {
//         this.player.stopVideo();
//       } catch (e) {}
//     }
//     this.pendingVideoId = null;
//   }

//   public setVolume(level: number): void {
//     this.volume = Math.max(0, Math.min(100, level));
//     if (this.player && this.player.setVolume) {
//       this.player.setVolume(this.volume);
//     }
//   }
// }

// export const bgMusicManager = BackgroundMusicManager.getInstance();






// lib/core/BackgroundMusicManager.ts
/**
 * 🎵 BackgroundMusicManager
 * - Loads YouTube IFrame API if not already present
 * - Creates a hidden player (0px) for audio‑only background music
 * - Supports mute/unmute via volume control
 */

export class BackgroundMusicManager {
  private static instance: BackgroundMusicManager;
  private player: any = null;
  private playerReady = false;
  private pendingVideoId: string | null = null;
  private volume = 20;
  private savedVolume = 20; // 🆕 saved for mute/unmute
  private apiCheckInterval: ReturnType<typeof setInterval> | null = null;
  private readonly MAX_WAIT = 10000; // 10 seconds
  private apiLoaded = false;

  private constructor() {
    if (typeof window === 'undefined') return;
    console.log('[BackgroundMusic] Initializing...');
    this.loadYouTubeAPI();
  }

  public static getInstance(): BackgroundMusicManager {
    if (!BackgroundMusicManager.instance) {
      BackgroundMusicManager.instance = new BackgroundMusicManager();
    }
    return BackgroundMusicManager.instance;
  }

  private loadYouTubeAPI(): void {
    if (window.YT && window.YT.Player) {
      console.log('[BackgroundMusic] YouTube API already loaded');
      this.onAPIReady();
      return;
    }
    if (document.getElementById('youtube-iframe-api')) {
      console.log('[BackgroundMusic] Waiting for existing YouTube API script...');
      this.waitForAPI();
      return;
    }
    console.log('[BackgroundMusic] Loading YouTube IFrame API...');
    const tag = document.createElement('script');
    tag.id = 'youtube-iframe-api';
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript?.parentNode?.insertBefore(tag, firstScript);
    window.onYouTubeIframeAPIReady = () => {
      console.log('[BackgroundMusic] YouTube API ready callback fired');
      this.onAPIReady();
    };
    this.waitForAPI();
  }

  private waitForAPI(): void {
    const startTime = Date.now();
    this.apiCheckInterval = setInterval(() => {
      if (window.YT && window.YT.Player) {
        console.log('[BackgroundMusic] YouTube API detected');
        this.onAPIReady();
        if (this.apiCheckInterval) {
          clearInterval(this.apiCheckInterval);
          this.apiCheckInterval = null;
        }
      } else if (Date.now() - startTime > this.MAX_WAIT) {
        console.error('[BackgroundMusic] YouTube API not loaded after timeout');
        if (this.apiCheckInterval) {
          clearInterval(this.apiCheckInterval);
          this.apiCheckInterval = null;
        }
      }
    }, 200);
  }

  private onAPIReady(): void {
    if (this.apiLoaded) return;
    this.apiLoaded = true;
    this.playerReady = true;
    console.log('[BackgroundMusic] API ready, player can be created');
    if (this.pendingVideoId) {
      console.log(`[BackgroundMusic] Playing pending video: ${this.pendingVideoId}`);
      this.play(this.pendingVideoId);
      this.pendingVideoId = null;
    }
  }

  private createPlayer(videoId: string): void {
    if (!window.YT?.Player) {
      console.error('[BackgroundMusic] YT.Player not available');
      return;
    }

    if (this.player) {
      try {
        console.log('[BackgroundMusic] Destroying existing player');
        this.player.destroy();
      } catch (e) {}
      this.player = null;
    }

    let container = document.getElementById('bg-music-player');
    if (!container) {
      console.log('[BackgroundMusic] Creating hidden container');
      container = document.createElement('div');
      container.id = 'bg-music-player';
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '0';
      container.style.height = '0';
      container.style.opacity = '0';
      container.style.pointerEvents = 'none';
      document.body.appendChild(container);
    }

    try {
      console.log(`[BackgroundMusic] Creating player for video: ${videoId}`);
      this.player = new window.YT.Player(container, {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          modestbranding: 1,
          playsinline: 1,
          playlist: videoId,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: (event: any) => {
            console.log(`[BackgroundMusic] Player ready for ${videoId}`);
            event.target.setVolume(this.volume);
            event.target.playVideo();
          },
          onError: (event: any) => {
            console.error(`[BackgroundMusic] Player error: ${event.data} for video ${videoId}`);
          },
        },
      });
    } catch (error) {
      console.error('[BackgroundMusic] Error creating player:', error);
    }
  }

  public play(videoId: string): void {
    if (typeof window === 'undefined') return;
    if (!videoId) {
      console.warn('[BackgroundMusic] No video ID provided');
      return;
    }
    if (!this.playerReady) {
      console.log(`[BackgroundMusic] API not ready, queueing video: ${videoId}`);
      this.pendingVideoId = videoId;
      return;
    }
    if (!videoId) return;

    if (this.player && this.player.getVideoData) {
      const current = this.player.getVideoData().video_id;
      if (current === videoId) {
        console.log(`[BackgroundMusic] Already playing ${videoId}, ensuring play`);
        this.player.playVideo();
        return;
      }
    }
    this.createPlayer(videoId);
  }

  public stop(): void {
    if (typeof window === 'undefined') return;
    console.log('[BackgroundMusic] Stopping');
    if (this.player) {
      try {
        this.player.stopVideo();
      } catch (e) {}
    }
    this.pendingVideoId = null;
  }

  public setVolume(level: number): void {
    this.volume = Math.max(0, Math.min(100, level));
    this.savedVolume = this.volume; // 🆕 update saved volume
    if (this.player && this.player.setVolume) {
      this.player.setVolume(this.volume);
    }
  }

  // 🆕 Mute/unmute background music
  public setMuted(muted: boolean): void {
    if (typeof window === 'undefined') return;
    if (!this.player) return;
    if (muted) {
      // Save current volume and set to 0
      this.savedVolume = this.volume;
      this.player.setVolume(0);
    } else {
      // Restore saved volume
      this.player.setVolume(this.savedVolume);
    }
  }
}

export const bgMusicManager = BackgroundMusicManager.getInstance();