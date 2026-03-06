// // lib/core/VoiceManager.ts
// declare global {
//   interface Window {
//     YT: any;
//     onYouTubeIframeAPIReady: () => void;
//   }
// }

// class VoiceManagerClass {
//   private synth: SpeechSynthesis | null = null;
//   private voices: SpeechSynthesisVoice[] = [];
//   private ytPlayer: any = null;
//   private ytContainerId = '__yt_bg_music__';
//   private currentVideoId: string | null = null;
//   private isMusicMuted = false;
//   private isSpeaking = false;
//   private ytReady = false;
//   private currentLang = 'en-US';
//   private onEndCallback: (() => void) | null = null;

//   // Volume control
//   private readonly VOL_NORMAL = 30;
//   private readonly VOL_DUCKED = 15;

//   constructor() {
//     if (typeof window === 'undefined') return;
//     this.synth = window.speechSynthesis;
//     this._loadVoices();
//     if (this.synth && this.synth.onvoiceschanged !== undefined) {
//       this.synth.onvoiceschanged = () => this._loadVoices();
//     }
//     this._watchLanguageChange();
//   }

//   private _loadVoices() {
//     if (!this.synth) return;
//     this.voices = this.synth.getVoices();
//   }

//   private _watchLanguageChange() {
//     if (typeof document === 'undefined') return;
//     const html = document.documentElement;
//     this.currentLang = html.lang || 'en-US';
//     const observer = new MutationObserver(() => {
//       this.currentLang = html.lang || 'en-US';
//     });
//     observer.observe(html, { attributes: true, attributeFilter: ['lang'] });
//   }

//   private _getBestVoice(): SpeechSynthesisVoice | null {
//     let exactMatch = this.voices.find(v => v.lang === this.currentLang);
//     if (exactMatch) return exactMatch;

//     const langPrefix = this.currentLang.split('-')[0];
//     const prefixMatch = this.voices.find(v => v.lang.startsWith(langPrefix));
//     if (prefixMatch) return prefixMatch;

//     const priority = ['Google US English', 'Microsoft Aria', 'en-US', 'en-GB'];
//     for (const p of priority) {
//       const v = this.voices.find(v => v.name.includes(p) || v.lang.startsWith(p));
//       if (v) return v;
//     }
//     return this.voices.find(v => v.lang.startsWith('en')) || null;
//   }

//   private _ensureContainer() {
//     if (typeof document === 'undefined') return;
//     if (!document.getElementById(this.ytContainerId)) {
//       const div = document.createElement('div');
//       div.id = this.ytContainerId;
//       div.style.cssText = 'position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;opacity:0;pointer-events:none;';
//       document.body.appendChild(div);
//     }
//   }

//   private _loadYTApi(): Promise<void> {
//     return new Promise(resolve => {
//       if (window.YT && window.YT.Player) { resolve(); return; }

//       let n = 0;
//       const poll = setInterval(() => {
//         if (window.YT && window.YT.Player) { clearInterval(poll); resolve(); }
//         if (++n > 80) clearInterval(poll);
//       }, 250);

//       if (!document.getElementById('yt-iframe-api-script')) {
//         const tag = document.createElement('script');
//         tag.id = 'yt-iframe-api-script';
//         tag.src = 'https://www.youtube.com/iframe_api';
//         document.head.appendChild(tag);
//       }

//       const prev = window.onYouTubeIframeAPIReady;
//       window.onYouTubeIframeAPIReady = () => {
//         if (typeof prev === 'function') prev();
//         clearInterval(poll);
//         resolve();
//       };
//     });
//   }

//   private _setVol(vol: number) {
//     if (!this.ytPlayer || typeof this.ytPlayer.setVolume !== 'function') return;
//     const effectiveVol = this.isMusicMuted ? 0 : vol;
//     try { this.ytPlayer.setVolume(effectiveVol); } catch {}
//   }

//   private async _createOrUpdatePlayer(videoId: string) {
//     this._ensureContainer();
//     await this._loadYTApi();

//     if (this.ytPlayer && typeof this.ytPlayer.loadVideoById === 'function') {
//       if (this.currentVideoId !== videoId) {
//         this.ytPlayer.loadVideoById({ videoId, startSeconds: 0 });
//         this.currentVideoId = videoId;
//       } else {
//         try { this.ytPlayer.playVideo(); } catch {}
//       }
//       this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
//       return;
//     }

//     const container = document.getElementById(this.ytContainerId);
//     if (!container) return;

//     const self = this;
//     this.ytPlayer = new window.YT.Player(container, {
//       height: '1', width: '1',
//       videoId,
//       playerVars: {
//         autoplay: 1, controls: 0, disablekb: 1,
//         fs: 0, iv_load_policy: 3, modestbranding: 1,
//         rel: 0, loop: 1, playlist: videoId,
//       },
//       events: {
//         onReady(e: any) {
//           self.ytReady = true;
//           self._setVol(self.isSpeaking ? self.VOL_DUCKED : self.VOL_NORMAL);
//           e.target.playVideo();
//         },
//         onStateChange(e: any) {
//           if (e.data === 0) {
//             try { e.target.seekTo(0); e.target.playVideo(); } catch {}
//           }
//         },
//         onError(e: any) { console.warn('[BG Music] YT error', e.data); },
//       },
//     });
//     this.currentVideoId = videoId;
//   }

//   /* ─── PUBLIC API ─────────────────────────────────────── */

//   unlock() {
//     if (!this.synth) return;
//     try {
//       const u = new SpeechSynthesisUtterance('');
//       u.volume = 0;
//       this.synth.speak(u);
//     } catch {}
//   }

//   playBackgroundMusic(videoId: string) {
//     if (!videoId || typeof window === 'undefined') return;
//     this._createOrUpdatePlayer(videoId).catch(err =>
//       console.warn('[BG Music] init failed', err)
//     );
//   }

//   stopBackgroundMusic() {
//     try { this.ytPlayer?.stopVideo(); } catch {}
//     this.currentVideoId = null;
//   }

//   setMusicMuted(muted: boolean) {
//     this.isMusicMuted = muted;
//     if (this.ytPlayer && this.ytReady) {
//       this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
//     }
//   }

//   /**
//    * Speak text using TTS.
//    * @param text - The text to speak.
//    * @param interrupt - Cancel current speech first (default true).
//    * @param duckMusic - Duck background music while speaking (default true).
//    * @param onEnd - Optional callback fired when speech ends (naturally or error).
//    */
//   speak(text: string, interrupt = true, duckMusic = true, onEnd?: () => void) {
//     if (!this.synth || !text) return;
//     if (interrupt) this.synth.cancel();

//     const utter = new SpeechSynthesisUtterance(text);
//     utter.rate  = 0.92;
//     utter.pitch = 1.0;
//     utter.volume = 1.0;
//     const v = this._getBestVoice();
//     if (v) utter.voice = v;

//     utter.onstart = () => {
//       this.isSpeaking = true;
//       if (duckMusic) this._setVol(this.VOL_DUCKED);
//     };
//     const restore = () => {
//       this.isSpeaking = false;
//       if (duckMusic) {
//         this.stopBackgroundMusic(); // stop music after TTS ends
//       }
//       if (onEnd) onEnd();
//     };
//     utter.onend   = restore;
//     utter.onerror = restore;

//     this.synth.speak(utter);
//   }

//   /** Cancel any ongoing speech */
//   cancelSpeech() {
//     try { this.synth?.cancel(); } catch {}
//     this.isSpeaking = false;
//     this._setVol(this.VOL_NORMAL);
//   }

//   /** Check if TTS is currently speaking */
//   isCurrentlySpeaking(): boolean {
//     return this.isSpeaking;
//   }
// }

// let _instance: VoiceManagerClass | null = null;

// function getInstance(): VoiceManagerClass {
//   if (!_instance) _instance = new VoiceManagerClass();
//   return _instance;
// }

// export const voiceManager = new Proxy({} as VoiceManagerClass, {
//   get(_t, prop: string) {
//     if (typeof window === 'undefined') return () => {};
//     const instance = getInstance();
//     if (prop === 'isCurrentlySpeaking') {
//       return () => instance.isCurrentlySpeaking();
//     }
//     return (instance as any)[prop]?.bind(instance) ?? (() => {});
//   },
// });


































































































// // lib/core/VoiceManager.ts
// declare global {
//   interface Window {
//     YT: any;
//     onYouTubeIframeAPIReady: () => void;
//   }
// }

// class VoiceManagerClass {
//   private synth: SpeechSynthesis | null = null;
//   private voices: SpeechSynthesisVoice[] = [];
//   private ytPlayer: any = null;
//   private ytContainerId = '__yt_bg_music__';
//   private currentVideoId: string | null = null;
//   private isMusicMuted = false;
//   private isSpeaking = false;
//   private ytReady = false;
//   private currentLang = 'en-US';

//   // Volume control
//   private readonly VOL_NORMAL = 30;
//   private readonly VOL_DUCKED = 15;

//   // Flag to track first user interaction (to unmute YT player)
//   private userInteracted = false;
//   private apiLoadPromise: Promise<void> | null = null;
//   private pendingVideoId: string | null = null;

//   constructor() {
//     if (typeof window === 'undefined') return;
//     this.synth = window.speechSynthesis;
//     this._loadVoices();
//     if (this.synth && this.synth.onvoiceschanged !== undefined) {
//       this.synth.onvoiceschanged = () => this._loadVoices();
//     }
//     this._watchLanguageChange();
//   }

//   private _loadVoices() {
//     if (!this.synth) return;
//     this.voices = this.synth.getVoices();
//   }

//   private _watchLanguageChange() {
//     if (typeof document === 'undefined') return;
//     const html = document.documentElement;
//     this.currentLang = html.lang || 'en-US';
//     const observer = new MutationObserver(() => {
//       this.currentLang = html.lang || 'en-US';
//     });
//     observer.observe(html, { attributes: true, attributeFilter: ['lang'] });
//   }

//   private _getBestVoice(): SpeechSynthesisVoice | null {
//     let exactMatch = this.voices.find(v => v.lang === this.currentLang);
//     if (exactMatch) return exactMatch;

//     const langPrefix = this.currentLang.split('-')[0];
//     const prefixMatch = this.voices.find(v => v.lang.startsWith(langPrefix));
//     if (prefixMatch) return prefixMatch;

//     const priority = ['Google US English', 'Microsoft Aria', 'en-US', 'en-GB'];
//     for (const p of priority) {
//       const v = this.voices.find(v => v.name.includes(p) || v.lang.startsWith(p));
//       if (v) return v;
//     }
//     return this.voices.find(v => v.lang.startsWith('en')) || null;
//   }

//   private _ensureContainer() {
//     if (typeof document === 'undefined') return;
//     if (!document.getElementById(this.ytContainerId)) {
//       const div = document.createElement('div');
//       div.id = this.ytContainerId;
//       div.style.cssText = 'position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;opacity:0;pointer-events:none;';
//       document.body.appendChild(div);
//     }
//   }

//   private _loadYTApi(): Promise<void> {
//     if (this.apiLoadPromise) return this.apiLoadPromise;

//     this.apiLoadPromise = new Promise((resolve, reject) => {
//       if (window.YT && window.YT.Player) {
//         resolve();
//         return;
//       }

//       let attempts = 0;
//       const maxAttempts = 100;
//       const poll = setInterval(() => {
//         if (window.YT && window.YT.Player) {
//           clearInterval(poll);
//           resolve();
//         }
//         if (++attempts > maxAttempts) {
//           clearInterval(poll);
//           reject(new Error('YouTube API load timeout'));
//         }
//       }, 100);

//       if (!document.getElementById('yt-iframe-api-script')) {
//         const tag = document.createElement('script');
//         tag.id = 'yt-iframe-api-script';
//         tag.src = 'https://www.youtube.com/iframe_api';
//         document.head.appendChild(tag);
//       }

//       const prev = window.onYouTubeIframeAPIReady;
//       window.onYouTubeIframeAPIReady = () => {
//         if (typeof prev === 'function') prev();
//         clearInterval(poll);
//         resolve();
//       };
//     });

//     return this.apiLoadPromise;
//   }

//   private _setVol(vol: number) {
//     if (!this.ytPlayer || typeof this.ytPlayer.setVolume !== 'function') return;
//     // If user hasn't interacted yet, keep volume at 0 (muted)
//     if (!this.userInteracted) {
//       try { this.ytPlayer.setVolume(0); } catch {}
//       return;
//     }
//     const effectiveVol = this.isMusicMuted ? 0 : vol;
//     try { this.ytPlayer.setVolume(effectiveVol); } catch {}
//   }

//   private async _createOrUpdatePlayer(videoId: string) {
//     if (!videoId) return;
//     this.pendingVideoId = videoId;
//     try {
//       this._ensureContainer();
//       await this._loadYTApi();

//       if (this.ytPlayer && typeof this.ytPlayer.loadVideoById === 'function') {
//         if (this.currentVideoId !== videoId) {
//           this.ytPlayer.loadVideoById({ videoId, startSeconds: 0 });
//           this.currentVideoId = videoId;
//         } else {
//           try { this.ytPlayer.playVideo(); } catch {}
//         }
//         // Volume will be set by _setVol; if player is ready, set it now.
//         if (this.ytReady) this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
//         return;
//       }

//       const container = document.getElementById(this.ytContainerId);
//       if (!container) throw new Error('Container not found');

//       const self = this;
//       this.ytPlayer = new window.YT.Player(container, {
//         height: '1',
//         width: '1',
//         videoId,
//         playerVars: {
//           autoplay: 1,
//           controls: 0,
//           disablekb: 1,
//           fs: 0,
//           iv_load_policy: 3,
//           modestbranding: 1,
//           rel: 0,
//           loop: 1,
//           playlist: videoId,
//           mute: 1, // Start muted to allow autoplay
//         },
//         events: {
//           onReady(e: any) {
//             console.log('[VoiceManager] YouTube Player ready for', videoId);
//             self.ytReady = true;
//             self._setVol(self.isSpeaking ? self.VOL_DUCKED : self.VOL_NORMAL);
//             e.target.playVideo();
//           },
//           onStateChange(e: any) {
//             if (e.data === 0) {
//               try { e.target.seekTo(0); e.target.playVideo(); } catch {}
//             }
//           },
//           onError(e: any) {
//             console.error('[VoiceManager] YouTube Player error', e.data);
//           },
//         },
//       });
//       this.currentVideoId = videoId;
//     } catch (err) {
//       console.error('[VoiceManager] Failed to create YouTube player:', err);
//     } finally {
//       this.pendingVideoId = null;
//     }
//   }

//   /* ─── PUBLIC API ─────────────────────────────────────── */

//   /**
//    * Call this on first user interaction (e.g., any click) to unmute audio.
//    */
//   onUserInteraction() {
//     if (this.userInteracted) return;
//     this.userInteracted = true;
//     console.log('[VoiceManager] User interacted, unmuting');
//     // Unlock speech synthesis (if not already)
//     this.unlock();
//     // Apply correct volume to YT player
//     if (this.ytPlayer && this.ytReady) {
//       this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
//     }
//   }

//   unlock() {
//     if (!this.synth) return;
//     try {
//       const u = new SpeechSynthesisUtterance('');
//       u.volume = 0;
//       this.synth.speak(u);
//     } catch {}
//   }

//   playBackgroundMusic(videoId: string) {
//     if (!videoId || typeof window === 'undefined') {
//       console.warn('[VoiceManager] No videoId provided');
//       return;
//     }
//     console.log('[VoiceManager] Playing background music:', videoId);
//     this._createOrUpdatePlayer(videoId).catch(err =>
//       console.warn('[VoiceManager] Background music init failed', err)
//     );
//   }

//   stopBackgroundMusic() {
//     try {
//       this.ytPlayer?.stopVideo();
//       console.log('[VoiceManager] Background music stopped');
//     } catch {}
//     this.currentVideoId = null;
//   }

//   setMusicMuted(muted: boolean) {
//     this.isMusicMuted = muted;
//     if (this.ytPlayer && this.ytReady) {
//       this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
//     }
//   }

//   /**
//    * Speak text using TTS.
//    * @param text - The text to speak.
//    * @param interrupt - Cancel current speech first (default true).
//    * @param duckMusic - Duck background music while speaking (default true).
//    * @param onEnd - Optional callback fired when speech ends (naturally or error).
//    */
//   speak(text: string, interrupt = true, duckMusic = true, onEnd?: () => void) {
//     if (!this.synth || !text) return;
//     if (interrupt) this.synth.cancel();

//     const utter = new SpeechSynthesisUtterance(text);
//     utter.rate  = 0.92;
//     utter.pitch = 1.0;
//     utter.volume = 1.0;
//     const v = this._getBestVoice();
//     if (v) utter.voice = v;

//     utter.onstart = () => {
//       this.isSpeaking = true;
//       if (duckMusic) this._setVol(this.VOL_DUCKED);
//     };
//     const restore = () => {
//       this.isSpeaking = false;
//       if (duckMusic) {
//         this._setVol(this.VOL_NORMAL); // Restore volume, respecting mute state
//       }
//       if (onEnd) onEnd();
//     };
//     utter.onend   = restore;
//     utter.onerror = restore;

//     this.synth.speak(utter);
//   }

//   /** Cancel any ongoing speech */
//   cancelSpeech() {
//     try { this.synth?.cancel(); } catch {}
//     this.isSpeaking = false;
//     this._setVol(this.VOL_NORMAL);
//   }

//   /** Check if TTS is currently speaking */
//   isCurrentlySpeaking(): boolean {
//     return this.isSpeaking;
//   }
// }

// let _instance: VoiceManagerClass | null = null;

// function getInstance(): VoiceManagerClass {
//   if (!_instance) _instance = new VoiceManagerClass();
//   return _instance;
// }

// export const voiceManager = new Proxy({} as VoiceManagerClass, {
//   get(_t, prop: string) {
//     if (typeof window === 'undefined') return () => {};
//     const instance = getInstance();
//     if (prop === 'isCurrentlySpeaking') {
//       return () => instance.isCurrentlySpeaking();
//     }
//     if (prop === 'onUserInteraction') {
//       return () => instance.onUserInteraction();
//     }
//     return (instance as any)[prop]?.bind(instance) ?? (() => {});
//   },
// });


















































// // lib/core/VoiceManager.ts
// declare global {
//   interface Window {
//     YT: any;
//     onYouTubeIframeAPIReady: () => void;
//   }
// }

// class VoiceManagerClass {
//   private synth: SpeechSynthesis | null = null;
//   private voices: SpeechSynthesisVoice[] = [];
//   private ytPlayer: any = null;
//   private ytContainerId = '__yt_bg_music__';
//   private currentVideoId: string | null = null;
//   private isMusicMuted = false;
//   private isSpeaking = false;
//   private ytReady = false;
//   private currentLang = 'en-US';

//   // Volume control
//   private readonly VOL_NORMAL = 30;
//   private readonly VOL_DUCKED = 15;

//   private apiLoadPromise: Promise<void> | null = null;

//   constructor() {
//     if (typeof window === 'undefined') return;
//     this.synth = window.speechSynthesis;
//     this._loadVoices();
//     if (this.synth && this.synth.onvoiceschanged !== undefined) {
//       this.synth.onvoiceschanged = () => this._loadVoices();
//     }
//     this._watchLanguageChange();
//   }

//   private _loadVoices() {
//     if (!this.synth) return;
//     this.voices = this.synth.getVoices();
//     console.log('[VoiceManager] Voices loaded:', this.voices.length);
//   }

//   private _watchLanguageChange() {
//     if (typeof document === 'undefined') return;
//     const html = document.documentElement;
//     this.currentLang = html.lang || 'en-US';
//     const observer = new MutationObserver(() => {
//       this.currentLang = html.lang || 'en-US';
//     });
//     observer.observe(html, { attributes: true, attributeFilter: ['lang'] });
//   }

//   private _getBestVoice(): SpeechSynthesisVoice | null {
//     let exactMatch = this.voices.find(v => v.lang === this.currentLang);
//     if (exactMatch) return exactMatch;

//     const langPrefix = this.currentLang.split('-')[0];
//     const prefixMatch = this.voices.find(v => v.lang.startsWith(langPrefix));
//     if (prefixMatch) return prefixMatch;

//     const priority = ['Google US English', 'Microsoft Aria', 'en-US', 'en-GB'];
//     for (const p of priority) {
//       const v = this.voices.find(v => v.name.includes(p) || v.lang.startsWith(p));
//       if (v) return v;
//     }
//     return this.voices.find(v => v.lang.startsWith('en')) || null;
//   }

//   private _ensureContainer() {
//     if (typeof document === 'undefined') return;
//     if (!document.getElementById(this.ytContainerId)) {
//       const div = document.createElement('div');
//       div.id = this.ytContainerId;
//       div.style.cssText = 'position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;opacity:0;pointer-events:none;';
//       document.body.appendChild(div);
//       console.log('[VoiceManager] Container created');
//     }
//   }

//   private _loadYTApi(): Promise<void> {
//     if (this.apiLoadPromise) return this.apiLoadPromise;

//     this.apiLoadPromise = new Promise((resolve, reject) => {
//       if (window.YT && window.YT.Player) {
//         console.log('[VoiceManager] YT API already loaded');
//         resolve();
//         return;
//       }

//       let attempts = 0;
//       const maxAttempts = 100;
//       const poll = setInterval(() => {
//         if (window.YT && window.YT.Player) {
//           clearInterval(poll);
//           console.log('[VoiceManager] YT API loaded via poll');
//           resolve();
//         }
//         if (++attempts > maxAttempts) {
//           clearInterval(poll);
//           reject(new Error('YouTube API load timeout'));
//         }
//       }, 100);

//       if (!document.getElementById('yt-iframe-api-script')) {
//         const tag = document.createElement('script');
//         tag.id = 'yt-iframe-api-script';
//         tag.src = 'https://www.youtube.com/iframe_api';
//         document.head.appendChild(tag);
//         console.log('[VoiceManager] YT API script added');
//       }

//       const prev = window.onYouTubeIframeAPIReady;
//       window.onYouTubeIframeAPIReady = () => {
//         if (typeof prev === 'function') prev();
//         clearInterval(poll);
//         console.log('[VoiceManager] YT API ready callback fired');
//         resolve();
//       };
//     });

//     return this.apiLoadPromise;
//   }

//   private _setVol(vol: number) {
//     if (!this.ytPlayer || typeof this.ytPlayer.setVolume !== 'function') return;
//     const effectiveVol = this.isMusicMuted ? 0 : vol;
//     try {
//       this.ytPlayer.setVolume(effectiveVol);
//       console.log(`[VoiceManager] Volume set to ${effectiveVol}`);
//     } catch {}
//   }

//   private async _createOrUpdatePlayer(videoId: string) {
//     if (!videoId) return;
//     console.log(`[VoiceManager] Creating/updating player for ${videoId}`);
//     try {
//       this._ensureContainer();
//       await this._loadYTApi();

//       if (this.ytPlayer && typeof this.ytPlayer.loadVideoById === 'function') {
//         if (this.currentVideoId !== videoId) {
//           this.ytPlayer.loadVideoById({ videoId, startSeconds: 0 });
//           this.currentVideoId = videoId;
//           console.log(`[VoiceManager] Loaded new video: ${videoId}`);
//         } else {
//           try { this.ytPlayer.playVideo(); } catch {}
//           console.log(`[VoiceManager] Resumed existing video: ${videoId}`);
//         }
//         // Set volume immediately after loading
//         this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
//         return;
//       }

//       const container = document.getElementById(this.ytContainerId);
//       if (!container) throw new Error('Container not found');

//       const self = this;
//       this.ytPlayer = new window.YT.Player(container, {
//         height: '1',
//         width: '1',
//         videoId,
//         playerVars: {
//           autoplay: 1,
//           controls: 0,
//           disablekb: 1,
//           fs: 0,
//           iv_load_policy: 3,
//           modestbranding: 1,
//           rel: 0,
//           loop: 1,
//           playlist: videoId,
//           // No mute – we will set volume directly on ready
//         },
//         events: {
//           onReady(e: any) {
//             console.log('[VoiceManager] YouTube Player ready for', videoId);
//             self.ytReady = true;
//             self._setVol(self.isSpeaking ? self.VOL_DUCKED : self.VOL_NORMAL);
//             e.target.playVideo();
//           },
//           onStateChange(e: any) {
//             if (e.data === 0) {
//               try { e.target.seekTo(0); e.target.playVideo(); } catch {}
//             }
//           },
//           onError(e: any) {
//             console.error('[VoiceManager] YouTube Player error', e.data);
//           },
//         },
//       });
//       this.currentVideoId = videoId;
//     } catch (err) {
//       console.error('[VoiceManager] Failed to create YouTube player:', err);
//     }
//   }

//   /* ─── PUBLIC API ─────────────────────────────────────── */

//   unlock() {
//     if (!this.synth) return;
//     try {
//       const u = new SpeechSynthesisUtterance('');
//       u.volume = 0;
//       this.synth.speak(u);
//       console.log('[VoiceManager] Speech unlocked');
//     } catch {}
//   }

//   playBackgroundMusic(videoId: string) {
//     if (!videoId || typeof window === 'undefined') {
//       console.warn('[VoiceManager] No videoId provided');
//       return;
//     }
//     console.log('[VoiceManager] Playing background music:', videoId);
//     this._createOrUpdatePlayer(videoId).catch(err =>
//       console.warn('[VoiceManager] Background music init failed', err)
//     );
//   }

//   stopBackgroundMusic() {
//     try {
//       this.ytPlayer?.stopVideo();
//       console.log('[VoiceManager] Background music stopped');
//     } catch {}
//     this.currentVideoId = null;
//   }

//   setMusicMuted(muted: boolean) {
//     this.isMusicMuted = muted;
//     if (this.ytPlayer && this.ytReady) {
//       this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
//     }
//   }

//   /**
//    * Speak text using TTS.
//    * @param text - The text to speak.
//    * @param interrupt - Cancel current speech first (default true).
//    * @param duckMusic - Duck background music while speaking (default true).
//    * @param onEnd - Optional callback fired when speech ends (naturally or error).
//    */
//   speak(text: string, interrupt = true, duckMusic = true, onEnd?: () => void) {
//     if (!this.synth || !text) return;
//     if (interrupt) this.synth.cancel();

//     const utter = new SpeechSynthesisUtterance(text);
//     utter.rate  = 0.92;
//     utter.pitch = 1.0;
//     utter.volume = 1.0;
//     const v = this._getBestVoice();
//     if (v) utter.voice = v;

//     utter.onstart = () => {
//       this.isSpeaking = true;
//       if (duckMusic) this._setVol(this.VOL_DUCKED);
//       console.log('[VoiceManager] TTS started');
//     };
//     const restore = () => {
//       this.isSpeaking = false;
//       if (duckMusic) {
//         this._setVol(this.VOL_NORMAL);
//       }
//       console.log('[VoiceManager] TTS ended');
//       if (onEnd) onEnd();
//     };
//     utter.onend   = restore;
//     utter.onerror = restore;

//     this.synth.speak(utter);
//   }

//   /** Cancel any ongoing speech */
//   cancelSpeech() {
//     try { this.synth?.cancel(); } catch {}
//     this.isSpeaking = false;
//     this._setVol(this.VOL_NORMAL);
//     console.log('[VoiceManager] Speech cancelled');
//   }

//   /** Check if TTS is currently speaking */
//   isCurrentlySpeaking(): boolean {
//     return this.isSpeaking;
//   }
// }

// let _instance: VoiceManagerClass | null = null;

// function getInstance(): VoiceManagerClass {
//   if (!_instance) _instance = new VoiceManagerClass();
//   return _instance;
// }

// export const voiceManager = new Proxy({} as VoiceManagerClass, {
//   get(_t, prop: string) {
//     if (typeof window === 'undefined') return () => {};
//     const instance = getInstance();
//     if (prop === 'isCurrentlySpeaking') {
//       return () => instance.isCurrentlySpeaking();
//     }
//     return (instance as any)[prop]?.bind(instance) ?? (() => {});
//   },
// });








































// // lib/core/VoiceManager.ts

// declare global {
//   interface Window {
//     YT: any;
//     onYouTubeIframeAPIReady: () => void;
//   }
// }

// class VoiceManagerClass {
//   private synth: SpeechSynthesis | null = null;
//   private voices: SpeechSynthesisVoice[] = [];
//   private ytPlayer: any = null;
//   private ytContainerId = '__yt_bg_music__';
//   private currentVideoId: string | null = null;
//   private isMusicMuted = false;
//   private isSpeaking = false;
//   private ytReady = false;
//   private currentLang = 'en-US';

//   // Volume control
//   private readonly VOL_NORMAL = 30;
//   private readonly VOL_DUCKED = 15;

//   private apiLoadPromise: Promise<void> | null = null;

//   constructor() {
//     if (typeof window === 'undefined') return;
//     this.synth = window.speechSynthesis;
//     this._loadVoices();
//     if (this.synth && this.synth.onvoiceschanged !== undefined) {
//       this.synth.onvoiceschanged = () => this._loadVoices();
//     }
//     this._watchLanguageChange();
//   }

//   private _loadVoices() {
//     if (!this.synth) return;
//     this.voices = this.synth.getVoices();
//     console.log('[VoiceManager] Voices loaded:', this.voices.length);
//   }

//   private _watchLanguageChange() {
//     if (typeof document === 'undefined') return;
//     const html = document.documentElement;
//     this.currentLang = html.lang || 'en-US';
//     const observer = new MutationObserver(() => {
//       this.currentLang = html.lang || 'en-US';
//     });
//     observer.observe(html, { attributes: true, attributeFilter: ['lang'] });
//   }

//   /**
//    * Robust voice selection following the required fallback order:
//    * 1. Exact language match (any voice)
//    * 2. Exact language match from Microsoft Edge voices
//    * 3. Exact language match from Google voices
//    * 4. Language‑prefix match from Microsoft voices
//    * 5. Language‑prefix match from Google voices
//    * 6. Any Microsoft Edge voice that speaks English
//    * 7. Any English voice
//    * 8. Any voice
//    */
//   private _getBestVoice(): SpeechSynthesisVoice | null {
//     if (!this.voices.length) return null;

//     const lang = this.currentLang;
//     const langPrefix = lang.split('-')[0];

//     // Helper to filter voices by provider (Microsoft / Google)
//     const isMicrosoft = (v: SpeechSynthesisVoice) =>
//       v.name.toLowerCase().includes('microsoft');
//     const isGoogle = (v: SpeechSynthesisVoice) =>
//       v.name.toLowerCase().includes('google');

//     // 1. Exact match any voice
//     let exact = this.voices.find(v => v.lang === lang);
//     if (exact) return exact;

//     // 2. Exact match Microsoft
//     exact = this.voices.find(v => v.lang === lang && isMicrosoft(v));
//     if (exact) return exact;

//     // 3. Exact match Google
//     exact = this.voices.find(v => v.lang === lang && isGoogle(v));
//     if (exact) return exact;

//     // 4. Prefix match Microsoft
//     let prefix = this.voices.find(v => v.lang.startsWith(langPrefix) && isMicrosoft(v));
//     if (prefix) return prefix;

//     // 5. Prefix match Google
//     prefix = this.voices.find(v => v.lang.startsWith(langPrefix) && isGoogle(v));
//     if (prefix) return prefix;

//     // 6. Microsoft Edge voice that speaks any English variant
//     const msEnglish = this.voices.find(v => isMicrosoft(v) && v.lang.startsWith('en'));
//     if (msEnglish) return msEnglish;

//     // 7. Any English voice
//     const anyEnglish = this.voices.find(v => v.lang.startsWith('en'));
//     if (anyEnglish) return anyEnglish;

//     // 8. Desperate fallback – first available voice
//     return this.voices[0] || null;
//   }

//   private _ensureContainer() {
//     if (typeof document === 'undefined') return;
//     if (!document.getElementById(this.ytContainerId)) {
//       const div = document.createElement('div');
//       div.id = this.ytContainerId;
//       div.style.cssText = 'position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;opacity:0;pointer-events:none;';
//       document.body.appendChild(div);
//       console.log('[VoiceManager] Container created');
//     }
//   }

//   private _loadYTApi(): Promise<void> {
//     if (this.apiLoadPromise) return this.apiLoadPromise;

//     this.apiLoadPromise = new Promise((resolve, reject) => {
//       if (window.YT && window.YT.Player) {
//         console.log('[VoiceManager] YT API already loaded');
//         resolve();
//         return;
//       }

//       let attempts = 0;
//       const maxAttempts = 100;
//       const poll = setInterval(() => {
//         if (window.YT && window.YT.Player) {
//           clearInterval(poll);
//           console.log('[VoiceManager] YT API loaded via poll');
//           resolve();
//         }
//         if (++attempts > maxAttempts) {
//           clearInterval(poll);
//           reject(new Error('YouTube API load timeout'));
//         }
//       }, 100);

//       if (!document.getElementById('yt-iframe-api-script')) {
//         const tag = document.createElement('script');
//         tag.id = 'yt-iframe-api-script';
//         tag.src = 'https://www.youtube.com/iframe_api';
//         document.head.appendChild(tag);
//         console.log('[VoiceManager] YT API script added');
//       }

//       const prev = window.onYouTubeIframeAPIReady;
//       window.onYouTubeIframeAPIReady = () => {
//         if (typeof prev === 'function') prev();
//         clearInterval(poll);
//         console.log('[VoiceManager] YT API ready callback fired');
//         resolve();
//       };
//     });

//     return this.apiLoadPromise;
//   }

//   private _setVol(vol: number) {
//     if (!this.ytPlayer || typeof this.ytPlayer.setVolume !== 'function') return;
//     const effectiveVol = this.isMusicMuted ? 0 : vol;
//     try {
//       this.ytPlayer.setVolume(effectiveVol);
//       console.log(`[VoiceManager] Volume set to ${effectiveVol}`);
//     } catch {}
//   }

//   private async _createOrUpdatePlayer(videoId: string) {
//     if (!videoId) return;
//     console.log(`[VoiceManager] Creating/updating player for ${videoId}`);
//     try {
//       this._ensureContainer();
//       await this._loadYTApi();

//       if (this.ytPlayer && typeof this.ytPlayer.loadVideoById === 'function') {
//         if (this.currentVideoId !== videoId) {
//           this.ytPlayer.loadVideoById({ videoId, startSeconds: 0 });
//           this.currentVideoId = videoId;
//           console.log(`[VoiceManager] Loaded new video: ${videoId}`);
//         } else {
//           try { this.ytPlayer.playVideo(); } catch {}
//           console.log(`[VoiceManager] Resumed existing video: ${videoId}`);
//         }
//         // Set volume immediately after loading
//         this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
//         return;
//       }

//       const container = document.getElementById(this.ytContainerId);
//       if (!container) throw new Error('Container not found');

//       const self = this;
//       this.ytPlayer = new window.YT.Player(container, {
//         height: '1',
//         width: '1',
//         videoId,
//         playerVars: {
//           autoplay: 1,
//           controls: 0,
//           disablekb: 1,
//           fs: 0,
//           iv_load_policy: 3,
//           modestbranding: 1,
//           rel: 0,
//           loop: 1,
//           playlist: videoId,
//           // No mute – we will set volume directly on ready
//         },
//         events: {
//           onReady(e: any) {
//             console.log('[VoiceManager] YouTube Player ready for', videoId);
//             self.ytReady = true;
//             self._setVol(self.isSpeaking ? self.VOL_DUCKED : self.VOL_NORMAL);
//             e.target.playVideo();
//           },
//           onStateChange(e: any) {
//             if (e.data === 0) {
//               try { e.target.seekTo(0); e.target.playVideo(); } catch {}
//             }
//           },
//           onError(e: any) {
//             console.error('[VoiceManager] YouTube Player error', e.data);
//           },
//         },
//       });
//       this.currentVideoId = videoId;
//     } catch (err) {
//       console.error('[VoiceManager] Failed to create YouTube player:', err);
//     }
//   }

//   /* ─── PUBLIC API ─────────────────────────────────────── */

//   unlock() {
//     if (!this.synth) return;
//     try {
//       const u = new SpeechSynthesisUtterance('');
//       u.volume = 0;
//       this.synth.speak(u);
//       console.log('[VoiceManager] Speech unlocked');
//     } catch {}
//   }

//   playBackgroundMusic(videoId: string) {
//     if (!videoId || typeof window === 'undefined') {
//       console.warn('[VoiceManager] No videoId provided');
//       return;
//     }
//     console.log('[VoiceManager] Playing background music:', videoId);
//     this._createOrUpdatePlayer(videoId).catch(err =>
//       console.warn('[VoiceManager] Background music init failed', err)
//     );
//   }

//   stopBackgroundMusic() {
//     try {
//       this.ytPlayer?.stopVideo();
//       console.log('[VoiceManager] Background music stopped');
//     } catch {}
//     this.currentVideoId = null;
//   }

//   setMusicMuted(muted: boolean) {
//     this.isMusicMuted = muted;
//     if (this.ytPlayer && this.ytReady) {
//       this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
//     }
//   }

//   /**
//    * Speak text using TTS.
//    * @param text - The text to speak.
//    * @param interrupt - Cancel current speech first (default true).
//    * @param duckMusic - Duck background music while speaking (default true).
//    * @param onEnd - Optional callback fired when speech ends (naturally or error).
//    */
//   speak(text: string, interrupt = true, duckMusic = true, onEnd?: () => void) {
//     if (!this.synth || !text) return;
//     if (interrupt) this.synth.cancel();

//     const utter = new SpeechSynthesisUtterance(text);
//     utter.rate  = 0.92;
//     utter.pitch = 1.0;
//     utter.volume = 1.0;
//     const v = this._getBestVoice();
//     if (v) utter.voice = v;

//     utter.onstart = () => {
//       this.isSpeaking = true;
//       if (duckMusic) this._setVol(this.VOL_DUCKED);
//       console.log('[VoiceManager] TTS started');
//     };
//     const restore = () => {
//       this.isSpeaking = false;
//       if (duckMusic) {
//         this._setVol(this.VOL_NORMAL);
//       }
//       console.log('[VoiceManager] TTS ended');
//       if (onEnd) onEnd();
//     };
//     utter.onend   = restore;
//     utter.onerror = restore;

//     this.synth.speak(utter);
//   }

//   /** Cancel any ongoing speech */
//   cancelSpeech() {
//     try { this.synth?.cancel(); } catch {}
//     this.isSpeaking = false;
//     this._setVol(this.VOL_NORMAL);
//     console.log('[VoiceManager] Speech cancelled');
//   }

//   /** Check if TTS is currently speaking */
//   isCurrentlySpeaking(): boolean {
//     return this.isSpeaking;
//   }
// }

// let _instance: VoiceManagerClass | null = null;

// function getInstance(): VoiceManagerClass {
//   if (!_instance) _instance = new VoiceManagerClass();
//   return _instance;
// }

// export const voiceManager = new Proxy({} as VoiceManagerClass, {
//   get(_t, prop: string) {
//     if (typeof window === 'undefined') return () => {};
//     const instance = getInstance();
//     if (prop === 'isCurrentlySpeaking') {
//       return () => instance.isCurrentlySpeaking();
//     }
//     return (instance as any)[prop]?.bind(instance) ?? (() => {});
//   },
// });















// // lib/core/VoiceManager.ts

// declare global {
//   interface Window {
//     YT: any;
//     onYouTubeIframeAPIReady: () => void;
//   }
// }

// class VoiceManagerClass {
//   private synth: SpeechSynthesis | null = null;
//   private voices: SpeechSynthesisVoice[] = [];
//   private ytPlayer: any = null;
//   private ytContainerId = '__yt_bg_music__';
//   private currentVideoId: string | null = null;
//   private isMusicMuted = false;
//   private isSpeaking = false;
//   private ytReady = false;
//   private currentLang = 'en-US';

//   // Volume control
//   private readonly VOL_NORMAL = 30;
//   private readonly VOL_DUCKED = 15;

//   private apiLoadPromise: Promise<void> | null = null;

//   // Translation support (only used in fallback)
//   private translationCache: Map<string, string> = new Map();

//   constructor() {
//     if (typeof window === 'undefined') return;
//     this.synth = window.speechSynthesis;
//     this._loadVoices();
//     if (this.synth && this.synth.onvoiceschanged !== undefined) {
//       this.synth.onvoiceschanged = () => this._loadVoices();
//     }
//     this._watchLanguageChange();
//   }

//   private _loadVoices() {
//     if (!this.synth) return;
//     this.voices = this.synth.getVoices();
//     console.log('[VoiceManager] Voices loaded:', this.voices.length);
//   }

//   private _watchLanguageChange() {
//     if (typeof document === 'undefined') return;
//     const html = document.documentElement;
//     this.currentLang = html.lang || 'en-US';
//     const observer = new MutationObserver(() => {
//       this.currentLang = html.lang || 'en-US';
//     });
//     observer.observe(html, { attributes: true, attributeFilter: ['lang'] });
//   }

//   /**
//    * Robust voice selection following the required fallback order:
//    * 1. Exact language match (any voice)
//    * 2. Exact language match from Microsoft Edge voices
//    * 3. Exact language match from Google voices
//    * 4. Language‑prefix match from Microsoft voices
//    * 5. Language‑prefix match from Google voices
//    * 6. Any Microsoft Edge voice that speaks English
//    * 7. Any English voice
//    * 8. Any voice
//    */
//   private _getBestVoice(): SpeechSynthesisVoice | null {
//     if (!this.voices.length) {
//       console.warn('[VoiceManager] No voices available yet');
//       return null;
//     }

//     const lang = this.currentLang;
//     const langPrefix = lang.split('-')[0];

//     const isMicrosoft = (v: SpeechSynthesisVoice) =>
//       v.name.toLowerCase().includes('microsoft');
//     const isGoogle = (v: SpeechSynthesisVoice) =>
//       v.name.toLowerCase().includes('google');

//     // 1. Exact match any voice
//     let exact = this.voices.find(v => v.lang === lang);
//     if (exact) {
//       console.log(`[VoiceManager] Selected exact match: ${exact.name} (${exact.lang})`);
//       return exact;
//     }

//     // 2. Exact match Microsoft
//     exact = this.voices.find(v => v.lang === lang && isMicrosoft(v));
//     if (exact) {
//       console.log(`[VoiceManager] Selected Microsoft exact: ${exact.name} (${exact.lang})`);
//       return exact;
//     }

//     // 3. Exact match Google
//     exact = this.voices.find(v => v.lang === lang && isGoogle(v));
//     if (exact) {
//       console.log(`[VoiceManager] Selected Google exact: ${exact.name} (${exact.lang})`);
//       return exact;
//     }

//     // 4. Prefix match Microsoft
//     let prefix = this.voices.find(v => v.lang.startsWith(langPrefix) && isMicrosoft(v));
//     if (prefix) {
//       console.log(`[VoiceManager] Selected Microsoft prefix: ${prefix.name} (${prefix.lang})`);
//       return prefix;
//     }

//     // 5. Prefix match Google
//     prefix = this.voices.find(v => v.lang.startsWith(langPrefix) && isGoogle(v));
//     if (prefix) {
//       console.log(`[VoiceManager] Selected Google prefix: ${prefix.name} (${prefix.lang})`);
//       return prefix;
//     }

//     // 6. Microsoft Edge voice that speaks any English variant
//     const msEnglish = this.voices.find(v => isMicrosoft(v) && v.lang.startsWith('en'));
//     if (msEnglish) {
//       console.log(`[VoiceManager] Fallback to Microsoft English: ${msEnglish.name} (${msEnglish.lang})`);
//       return msEnglish;
//     }

//     // 7. Any English voice
//     const anyEnglish = this.voices.find(v => v.lang.startsWith('en'));
//     if (anyEnglish) {
//       console.log(`[VoiceManager] Fallback to any English: ${anyEnglish.name} (${anyEnglish.lang})`);
//       return anyEnglish;
//     }

//     // 8. Desperate fallback – first available voice
//     const firstVoice = this.voices[0];
//     console.log(`[VoiceManager] Desperate fallback: ${firstVoice.name} (${firstVoice.lang})`);
//     return firstVoice || null;
//   }

//   /**
//    * Call the internal API route to translate text to English.
//    * Used only when a fallback English voice is selected but page language is not English.
//    */
//   private async _translateToEnglish(text: string): Promise<string> {
//     const cacheKey = `en:${text}`;
//     if (this.translationCache.has(cacheKey)) {
//       return this.translationCache.get(cacheKey)!;
//     }

//     try {
//       const response = await fetch('/api/translate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           text,
//           targetLang: 'en',
//           sourceLang: 'auto',
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Translation API error: ${response.status}`);
//       }

//       const data = await response.json();
//       const translated = data.translatedText || text;

//       this.translationCache.set(cacheKey, translated);
//       return translated;
//     } catch (err) {
//       console.error('[VoiceManager] Translation failed:', err);
//       return text; // fallback to original text
//     }
//   }

//   private _ensureContainer() {
//     if (typeof document === 'undefined') return;
//     if (!document.getElementById(this.ytContainerId)) {
//       const div = document.createElement('div');
//       div.id = this.ytContainerId;
//       div.style.cssText = 'position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;opacity:0;pointer-events:none;';
//       document.body.appendChild(div);
//       console.log('[VoiceManager] Container created');
//     }
//   }

//   private _loadYTApi(): Promise<void> {
//     if (this.apiLoadPromise) return this.apiLoadPromise;

//     this.apiLoadPromise = new Promise((resolve, reject) => {
//       if (window.YT && window.YT.Player) {
//         console.log('[VoiceManager] YT API already loaded');
//         resolve();
//         return;
//       }

//       let attempts = 0;
//       const maxAttempts = 100;
//       const poll = setInterval(() => {
//         if (window.YT && window.YT.Player) {
//           clearInterval(poll);
//           console.log('[VoiceManager] YT API loaded via poll');
//           resolve();
//         }
//         if (++attempts > maxAttempts) {
//           clearInterval(poll);
//           reject(new Error('YouTube API load timeout'));
//         }
//       }, 100);

//       if (!document.getElementById('yt-iframe-api-script')) {
//         const tag = document.createElement('script');
//         tag.id = 'yt-iframe-api-script';
//         tag.src = 'https://www.youtube.com/iframe_api';
//         document.head.appendChild(tag);
//         console.log('[VoiceManager] YT API script added');
//       }

//       const prev = window.onYouTubeIframeAPIReady;
//       window.onYouTubeIframeAPIReady = () => {
//         if (typeof prev === 'function') prev();
//         clearInterval(poll);
//         console.log('[VoiceManager] YT API ready callback fired');
//         resolve();
//       };
//     });

//     return this.apiLoadPromise;
//   }

//   private _setVol(vol: number) {
//     if (!this.ytPlayer || typeof this.ytPlayer.setVolume !== 'function') return;
//     const effectiveVol = this.isMusicMuted ? 0 : vol;
//     try {
//       this.ytPlayer.setVolume(effectiveVol);
//       console.log(`[VoiceManager] Volume set to ${effectiveVol}`);
//     } catch {}
//   }

//   private async _createOrUpdatePlayer(videoId: string) {
//     if (!videoId) return;
//     console.log(`[VoiceManager] Creating/updating player for ${videoId}`);
//     try {
//       this._ensureContainer();
//       await this._loadYTApi();

//       if (this.ytPlayer && typeof this.ytPlayer.loadVideoById === 'function') {
//         if (this.currentVideoId !== videoId) {
//           this.ytPlayer.loadVideoById({ videoId, startSeconds: 0 });
//           this.currentVideoId = videoId;
//           console.log(`[VoiceManager] Loaded new video: ${videoId}`);
//         } else {
//           try { this.ytPlayer.playVideo(); } catch {}
//           console.log(`[VoiceManager] Resumed existing video: ${videoId}`);
//         }
//         this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
//         return;
//       }

//       const container = document.getElementById(this.ytContainerId);
//       if (!container) throw new Error('Container not found');

//       const self = this;
//       this.ytPlayer = new window.YT.Player(container, {
//         height: '1',
//         width: '1',
//         videoId,
//         playerVars: {
//           autoplay: 1,
//           controls: 0,
//           disablekb: 1,
//           fs: 0,
//           iv_load_policy: 3,
//           modestbranding: 1,
//           rel: 0,
//           loop: 1,
//           playlist: videoId,
//         },
//         events: {
//           onReady(e: any) {
//             console.log('[VoiceManager] YouTube Player ready for', videoId);
//             self.ytReady = true;
//             self._setVol(self.isSpeaking ? self.VOL_DUCKED : self.VOL_NORMAL);
//             e.target.playVideo();
//           },
//           onStateChange(e: any) {
//             if (e.data === 0) {
//               try { e.target.seekTo(0); e.target.playVideo(); } catch {}
//             }
//           },
//           onError(e: any) {
//             console.error('[VoiceManager] YouTube Player error', e.data);
//           },
//         },
//       });
//       this.currentVideoId = videoId;
//     } catch (err) {
//       console.error('[VoiceManager] Failed to create YouTube player:', err);
//     }
//   }

//   /* ─── PUBLIC API ─────────────────────────────────────── */

//   /**
//    * Called on first user interaction to unlock audio.
//    * (Matches the call in pages/index.tsx)
//    */
//   onUserInteraction() {
//     this.unlock();
//     // Also ensure YouTube player volume is set (in case it was muted)
//     if (this.ytPlayer && this.ytReady) {
//       this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
//     }
//   }

//   unlock() {
//     if (!this.synth) return;
//     try {
//       const u = new SpeechSynthesisUtterance('');
//       u.volume = 0;
//       this.synth.speak(u);
//       console.log('[VoiceManager] Speech unlocked');
//     } catch {}
//   }

//   playBackgroundMusic(videoId: string) {
//     if (!videoId || typeof window === 'undefined') {
//       console.warn('[VoiceManager] No videoId provided');
//       return;
//     }
//     console.log('[VoiceManager] Playing background music:', videoId);
//     this._createOrUpdatePlayer(videoId).catch(err =>
//       console.warn('[VoiceManager] Background music init failed', err)
//     );
//   }

//   stopBackgroundMusic() {
//     try {
//       this.ytPlayer?.stopVideo();
//       console.log('[VoiceManager] Background music stopped');
//     } catch {}
//     this.currentVideoId = null;
//   }

//   setMusicMuted(muted: boolean) {
//     this.isMusicMuted = muted;
//     if (this.ytPlayer && this.ytReady) {
//       this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
//     }
//   }

//   /**
//    * Speak text using TTS.
//    * If a fallback English voice is used while the page language is not English,
//    * the text is automatically translated to English before speaking.
//    */
//   async speak(text: string, interrupt = true, duckMusic = true, onEnd?: () => void) {
//     if (!this.synth || !text) return;
//     if (interrupt) this.synth.cancel();

//     const voice = this._getBestVoice();

//     // --- ONLY FALLBACK TRANSLATION ADDED HERE ---
//     let finalText = text;
//     if (voice && voice.lang.startsWith('en') && !this.currentLang.startsWith('en')) {
//       console.log(`[VoiceManager] Fallback: translating to English (page lang: ${this.currentLang})`);
//       finalText = await this._translateToEnglish(text);
//     }
//     // ---------------------------------------------

//     const utter = new SpeechSynthesisUtterance(finalText);
//     utter.rate  = 0.92;
//     utter.pitch = 1.0;
//     utter.volume = 1.0;
//     if (voice) {
//       utter.voice = voice;
//       console.log(`[VoiceManager] Using voice: ${voice.name} (${voice.lang})`);
//     } else {
//       console.warn('[VoiceManager] No voice selected, using browser default');
//     }

//     utter.onstart = () => {
//       this.isSpeaking = true;
//       if (duckMusic) this._setVol(this.VOL_DUCKED);
//       console.log('[VoiceManager] TTS started');
//     };
//     const restore = () => {
//       this.isSpeaking = false;
//       if (duckMusic) {
//         this._setVol(this.VOL_NORMAL);
//       }
//       console.log('[VoiceManager] TTS ended');
//       if (onEnd) onEnd();
//     };
//     utter.onend   = restore;
//     utter.onerror = (event) => {
//       console.error('[VoiceManager] TTS error:', event.error);
//       restore();
//     };

//     this.synth.speak(utter);
//   }

//   cancelSpeech() {
//     try { this.synth?.cancel(); } catch {}
//     this.isSpeaking = false;
//     this._setVol(this.VOL_NORMAL);
//     console.log('[VoiceManager] Speech cancelled');
//   }

//   isCurrentlySpeaking(): boolean {
//     return this.isSpeaking;
//   }
// }

// let _instance: VoiceManagerClass | null = null;

// function getInstance(): VoiceManagerClass {
//   if (!_instance) _instance = new VoiceManagerClass();
//   return _instance;
// }

// export const voiceManager = new Proxy({} as VoiceManagerClass, {
//   get(_t, prop: string) {
//     if (typeof window === 'undefined') return () => {};
//     const instance = getInstance();
//     // Special case for isCurrentlySpeaking to preserve function binding
//     if (prop === 'isCurrentlySpeaking') {
//       return () => instance.isCurrentlySpeaking();
//     }
//     const value = (instance as any)[prop];
//     if (typeof value === 'function') {
//       return value.bind(instance);
//     }
//     return value;
//   },
// });









// lib/core/VoiceManager.ts

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

/**
 * Shuffles an array in-place using the Fisher-Yates algorithm.
 */
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Picks a random element from an array.
 */
function pickRandom<T>(arr: T[]): T | undefined {
  if (!arr.length) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

class VoiceManagerClass {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private ytPlayer: any = null;
  private ytContainerId = '__yt_bg_music__';
  private currentVideoId: string | null = null;
  private isMusicMuted = false;
  private isSpeaking = false;
  private ytReady = false;
  private currentLang = 'en-US';

  // Volume control
  private readonly VOL_NORMAL = 30;
  private readonly VOL_DUCKED = 15;

  private apiLoadPromise: Promise<void> | null = null;

  // Translation support (only used in fallback)
  private translationCache: Map<string, string> = new Map();

  /**
   * Tracks the last randomly chosen voice per language key so we can
   * avoid repeating the same voice consecutively when multiple voices
   * are available for that language.
   */
  private lastChosenVoice: Map<string, string> = new Map();

  constructor() {
    if (typeof window === 'undefined') return;
    this.synth = window.speechSynthesis;
    this._loadVoices();
    if (this.synth && this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this._loadVoices();
    }
    this._watchLanguageChange();
  }

  private _loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    console.log('[VoiceManager] Voices loaded:', this.voices.length);
  }

  private _watchLanguageChange() {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;
    this.currentLang = html.lang || 'en-US';
    const observer = new MutationObserver(() => {
      this.currentLang = html.lang || 'en-US';
    });
    observer.observe(html, { attributes: true, attributeFilter: ['lang'] });
  }

  // ─── Voice filter helpers ─────────────────────────────────────────────────

  private _isMicrosoft(v: SpeechSynthesisVoice): boolean {
    return v.name.toLowerCase().includes('microsoft');
  }

  private _isGoogle(v: SpeechSynthesisVoice): boolean {
    return v.name.toLowerCase().includes('google');
  }

  /**
   * From a pool of candidate voices, pick one at random while preferring
   * Microsoft Edge voices first. If more than one voice is available we
   * avoid repeating the voice that was used last for this language key.
   *
   * Priority within the pool:
   *   1. Microsoft voices (shuffled randomly)
   *   2. Google voices   (shuffled randomly)
   *   3. Any other voice (shuffled randomly)
   *
   * @param pool     Candidate voices already filtered for language match.
   * @param langKey  Cache key used to track the last chosen voice.
   */
  private _pickRandomVoiceFromPool(
    pool: SpeechSynthesisVoice[],
    langKey: string
  ): SpeechSynthesisVoice | undefined {
    if (!pool.length) return undefined;

    const lastName = this.lastChosenVoice.get(langKey);

    // Build priority buckets
    const microsoft = shuffleArray(pool.filter(v => this._isMicrosoft(v)));
    const google    = shuffleArray(pool.filter(v => !this._isMicrosoft(v) && this._isGoogle(v)));
    const others    = shuffleArray(pool.filter(v => !this._isMicrosoft(v) && !this._isGoogle(v)));

    // Ordered candidate list: Microsoft first, then Google, then rest
    const ordered = [...microsoft, ...google, ...others];

    // If we have more than one option, remove the last used voice to avoid repetition
    const candidates =
      ordered.length > 1 && lastName
        ? ordered.filter(v => v.name !== lastName)
        : ordered;

    const chosen = candidates[0] ?? ordered[0];
    if (chosen) {
      this.lastChosenVoice.set(langKey, chosen.name);
    }
    return chosen;
  }

  /**
   * Robust, random voice selection following this fallback order:
   *
   *  1. Exact language match – random Microsoft Edge voice
   *  2. Exact language match – random Google voice
   *  3. Exact language match – any random voice
   *  4. Language-prefix match – random Microsoft voice
   *  5. Language-prefix match – random Google voice
   *  6. Language-prefix match – any random voice
   *  7. Any Microsoft Edge voice that speaks any English variant (random)
   *  8. Any English voice (random)
   *  9. Any available voice (random)
   *
   * Within every tier the selection is randomised so different voices are
   * used across successive calls, making the assistant sound more lively.
   */
  private _getBestVoice(): SpeechSynthesisVoice | null {
    if (!this.voices.length) {
      console.warn('[VoiceManager] No voices available yet');
      return null;
    }

    const lang       = this.currentLang;
    const langPrefix = lang.split('-')[0];

    // ── Tier 1: Exact match – Microsoft ──────────────────────────────────
    const exactMs = this.voices.filter(
      v => v.lang === lang && this._isMicrosoft(v)
    );
    if (exactMs.length) {
      const chosen = this._pickRandomVoiceFromPool(exactMs, `ms:${lang}`);
      if (chosen) {
        console.log(`[VoiceManager] T1 – Random Microsoft exact: ${chosen.name} (${chosen.lang})`);
        return chosen;
      }
    }

    // ── Tier 2: Exact match – Google ─────────────────────────────────────
    const exactGoogle = this.voices.filter(
      v => v.lang === lang && this._isGoogle(v)
    );
    if (exactGoogle.length) {
      const chosen = this._pickRandomVoiceFromPool(exactGoogle, `google:${lang}`);
      if (chosen) {
        console.log(`[VoiceManager] T2 – Random Google exact: ${chosen.name} (${chosen.lang})`);
        return chosen;
      }
    }

    // ── Tier 3: Exact match – any ─────────────────────────────────────────
    const exactAny = this.voices.filter(v => v.lang === lang);
    if (exactAny.length) {
      const chosen = this._pickRandomVoiceFromPool(exactAny, `any:${lang}`);
      if (chosen) {
        console.log(`[VoiceManager] T3 – Random exact: ${chosen.name} (${chosen.lang})`);
        return chosen;
      }
    }

    // ── Tier 4: Prefix match – Microsoft ──────────────────────────────────
    const prefixMs = this.voices.filter(
      v => v.lang.startsWith(langPrefix) && this._isMicrosoft(v)
    );
    if (prefixMs.length) {
      const chosen = this._pickRandomVoiceFromPool(prefixMs, `ms-prefix:${langPrefix}`);
      if (chosen) {
        console.log(`[VoiceManager] T4 – Random Microsoft prefix: ${chosen.name} (${chosen.lang})`);
        return chosen;
      }
    }

    // ── Tier 5: Prefix match – Google ─────────────────────────────────────
    const prefixGoogle = this.voices.filter(
      v => v.lang.startsWith(langPrefix) && this._isGoogle(v)
    );
    if (prefixGoogle.length) {
      const chosen = this._pickRandomVoiceFromPool(prefixGoogle, `google-prefix:${langPrefix}`);
      if (chosen) {
        console.log(`[VoiceManager] T5 – Random Google prefix: ${chosen.name} (${chosen.lang})`);
        return chosen;
      }
    }

    // ── Tier 6: Prefix match – any ────────────────────────────────────────
    const prefixAny = this.voices.filter(v => v.lang.startsWith(langPrefix));
    if (prefixAny.length) {
      const chosen = this._pickRandomVoiceFromPool(prefixAny, `any-prefix:${langPrefix}`);
      if (chosen) {
        console.log(`[VoiceManager] T6 – Random prefix: ${chosen.name} (${chosen.lang})`);
        return chosen;
      }
    }

    // ── Tier 7: Any Microsoft English voice ───────────────────────────────
    const msEnglish = this.voices.filter(
      v => this._isMicrosoft(v) && v.lang.startsWith('en')
    );
    if (msEnglish.length) {
      const chosen = this._pickRandomVoiceFromPool(msEnglish, 'ms-en');
      if (chosen) {
        console.log(`[VoiceManager] T7 – Random Microsoft English: ${chosen.name} (${chosen.lang})`);
        return chosen;
      }
    }

    // ── Tier 8: Any English voice ─────────────────────────────────────────
    const anyEnglish = this.voices.filter(v => v.lang.startsWith('en'));
    if (anyEnglish.length) {
      const chosen = this._pickRandomVoiceFromPool(anyEnglish, 'any-en');
      if (chosen) {
        console.log(`[VoiceManager] T8 – Random English: ${chosen.name} (${chosen.lang})`);
        return chosen;
      }
    }

    // ── Tier 9: Desperate fallback – random from all voices ───────────────
    const desperate = pickRandom(this.voices);
    if (desperate) {
      console.log(`[VoiceManager] T9 – Desperate random: ${desperate.name} (${desperate.lang})`);
      return desperate;
    }

    return null;
  }

  /**
   * Call the internal API route to translate text to English.
   * Used only when a fallback English voice is selected but page language is not English.
   */
  private async _translateToEnglish(text: string): Promise<string> {
    const cacheKey = `en:${text}`;
    if (this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey)!;
    }

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          targetLang: 'en',
          sourceLang: 'auto',
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();
      const translated = data.translatedText || text;

      this.translationCache.set(cacheKey, translated);
      return translated;
    } catch (err) {
      console.error('[VoiceManager] Translation failed:', err);
      return text; // fallback to original text
    }
  }

  private _ensureContainer() {
    if (typeof document === 'undefined') return;
    if (!document.getElementById(this.ytContainerId)) {
      const div = document.createElement('div');
      div.id = this.ytContainerId;
      div.style.cssText =
        'position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;opacity:0;pointer-events:none;';
      document.body.appendChild(div);
      console.log('[VoiceManager] Container created');
    }
  }

  private _loadYTApi(): Promise<void> {
    if (this.apiLoadPromise) return this.apiLoadPromise;

    this.apiLoadPromise = new Promise((resolve, reject) => {
      if (window.YT && window.YT.Player) {
        console.log('[VoiceManager] YT API already loaded');
        resolve();
        return;
      }

      let attempts = 0;
      const maxAttempts = 100;
      const poll = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(poll);
          console.log('[VoiceManager] YT API loaded via poll');
          resolve();
        }
        if (++attempts > maxAttempts) {
          clearInterval(poll);
          reject(new Error('YouTube API load timeout'));
        }
      }, 100);

      if (!document.getElementById('yt-iframe-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
        console.log('[VoiceManager] YT API script added');
      }

      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === 'function') prev();
        clearInterval(poll);
        console.log('[VoiceManager] YT API ready callback fired');
        resolve();
      };
    });

    return this.apiLoadPromise;
  }

  private _setVol(vol: number) {
    if (!this.ytPlayer || typeof this.ytPlayer.setVolume !== 'function') return;
    const effectiveVol = this.isMusicMuted ? 0 : vol;
    try {
      this.ytPlayer.setVolume(effectiveVol);
      console.log(`[VoiceManager] Volume set to ${effectiveVol}`);
    } catch {}
  }

  private async _createOrUpdatePlayer(videoId: string) {
    if (!videoId) return;
    console.log(`[VoiceManager] Creating/updating player for ${videoId}`);
    try {
      this._ensureContainer();
      await this._loadYTApi();

      if (this.ytPlayer && typeof this.ytPlayer.loadVideoById === 'function') {
        if (this.currentVideoId !== videoId) {
          this.ytPlayer.loadVideoById({ videoId, startSeconds: 0 });
          this.currentVideoId = videoId;
          console.log(`[VoiceManager] Loaded new video: ${videoId}`);
        } else {
          try {
            this.ytPlayer.playVideo();
          } catch {}
          console.log(`[VoiceManager] Resumed existing video: ${videoId}`);
        }
        this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
        return;
      }

      const container = document.getElementById(this.ytContainerId);
      if (!container) throw new Error('Container not found');

      const self = this;
      this.ytPlayer = new window.YT.Player(container, {
        height: '1',
        width: '1',
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          loop: 1,
          playlist: videoId,
        },
        events: {
          onReady(e: any) {
            console.log('[VoiceManager] YouTube Player ready for', videoId);
            self.ytReady = true;
            self._setVol(self.isSpeaking ? self.VOL_DUCKED : self.VOL_NORMAL);
            e.target.playVideo();
          },
          onStateChange(e: any) {
            if (e.data === 0) {
              try {
                e.target.seekTo(0);
                e.target.playVideo();
              } catch {}
            }
          },
          onError(e: any) {
            console.error('[VoiceManager] YouTube Player error', e.data);
          },
        },
      });
      this.currentVideoId = videoId;
    } catch (err) {
      console.error('[VoiceManager] Failed to create YouTube player:', err);
    }
  }

  /* ─── PUBLIC API ─────────────────────────────────────── */

  /**
   * Called on first user interaction to unlock audio.
   * (Matches the call in pages/index.tsx)
   */
  onUserInteraction() {
    this.unlock();
    // Also ensure YouTube player volume is set (in case it was muted)
    if (this.ytPlayer && this.ytReady) {
      this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
    }
  }

  unlock() {
    if (!this.synth) return;
    try {
      const u = new SpeechSynthesisUtterance('');
      u.volume = 0;
      this.synth.speak(u);
      console.log('[VoiceManager] Speech unlocked');
    } catch {}
  }

  playBackgroundMusic(videoId: string) {
    if (!videoId || typeof window === 'undefined') {
      console.warn('[VoiceManager] No videoId provided');
      return;
    }
    console.log('[VoiceManager] Playing background music:', videoId);
    this._createOrUpdatePlayer(videoId).catch(err =>
      console.warn('[VoiceManager] Background music init failed', err)
    );
  }

  stopBackgroundMusic() {
    try {
      this.ytPlayer?.stopVideo();
      console.log('[VoiceManager] Background music stopped');
    } catch {}
    this.currentVideoId = null;
  }

  setMusicMuted(muted: boolean) {
    this.isMusicMuted = muted;
    if (this.ytPlayer && this.ytReady) {
      this._setVol(this.isSpeaking ? this.VOL_DUCKED : this.VOL_NORMAL);
    }
  }

  /**
   * Speak text using TTS with a randomly selected voice.
   *
   * Voice selection is randomised across every tier (Microsoft Edge first,
   * then Google, then any). The same voice is never used twice in a row
   * when multiple voices are available for the active language.
   *
   * If a fallback English voice is selected while the page language is
   * not English, the text is automatically translated to English first.
   */
  async speak(
    text: string,
    interrupt = true,
    duckMusic = true,
    onEnd?: () => void
  ) {
    if (!this.synth || !text) return;
    if (interrupt) this.synth.cancel();

    const voice = this._getBestVoice();

    // --- ONLY FALLBACK TRANSLATION ADDED HERE ---
    let finalText = text;
    if (voice && voice.lang.startsWith('en') && !this.currentLang.startsWith('en')) {
      console.log(
        `[VoiceManager] Fallback: translating to English (page lang: ${this.currentLang})`
      );
      finalText = await this._translateToEnglish(text);
    }
    // ---------------------------------------------

    const utter = new SpeechSynthesisUtterance(finalText);
    utter.rate   = 0.92;
    utter.pitch  = 1.0;
    utter.volume = 1.0;
    if (voice) {
      utter.voice = voice;
      console.log(`[VoiceManager] Using voice: ${voice.name} (${voice.lang})`);
    } else {
      console.warn('[VoiceManager] No voice selected, using browser default');
    }

    utter.onstart = () => {
      this.isSpeaking = true;
      if (duckMusic) this._setVol(this.VOL_DUCKED);
      console.log('[VoiceManager] TTS started');
    };

    const restore = () => {
      this.isSpeaking = false;
      if (duckMusic) {
        this._setVol(this.VOL_NORMAL);
      }
      console.log('[VoiceManager] TTS ended');
      if (onEnd) onEnd();
    };

    utter.onend   = restore;
    utter.onerror = (event) => {
      console.error('[VoiceManager] TTS error:', event.error);
      restore();
    };

    this.synth.speak(utter);
  }

  cancelSpeech() {
    try {
      this.synth?.cancel();
    } catch {}
    this.isSpeaking = false;
    this._setVol(this.VOL_NORMAL);
    console.log('[VoiceManager] Speech cancelled');
  }

  isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }
}

let _instance: VoiceManagerClass | null = null;

function getInstance(): VoiceManagerClass {
  if (!_instance) _instance = new VoiceManagerClass();
  return _instance;
}

export const voiceManager = new Proxy({} as VoiceManagerClass, {
  get(_t, prop: string) {
    if (typeof window === 'undefined') return () => {};
    const instance = getInstance();
    // Special case for isCurrentlySpeaking to preserve function binding
    if (prop === 'isCurrentlySpeaking') {
      return () => instance.isCurrentlySpeaking();
    }
    const value = (instance as any)[prop];
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  },
});