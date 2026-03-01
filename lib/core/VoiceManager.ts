// /**
//  * VoiceManager – Handles speech synthesis with language‑specific voice selection.
//  * Language must be set externally via setLanguage() (e.g., from _app.tsx).
//  * Includes logging for debugging (remove in production).
//  */
// class VoiceManager {
//   private voices: SpeechSynthesisVoice[] = [];
//   private currentLang: string = "en";
//   private initialized = false;
//   private unlocked = false;
//   private voicesLoaded = false;
//   private pendingSpeak: { text: string; queue: boolean } | null = null;

//   constructor() {
//     if (typeof window !== "undefined") {
//       this.init();
//     }
//   }

//   private init() {
//     const loadVoices = () => {
//       const v = window.speechSynthesis.getVoices();
//       if (v.length > 0) {
//         this.voices = v;
//         this.initialized = true;
//         this.voicesLoaded = true;
//         console.log('Available voices:', v.map(voice => `${voice.name} (${voice.lang})`));
//         if (this.pendingSpeak) {
//           this.speak(this.pendingSpeak.text, this.pendingSpeak.queue);
//           this.pendingSpeak = null;
//         }
//       }
//     };

//     loadVoices();

//     if (typeof window !== "undefined") {
//       window.speechSynthesis.onvoiceschanged = loadVoices;
//     }
//   }

//   public unlock() {
//     if (this.unlocked) return;
//     if (typeof window === "undefined") return;

//     try {
//       const utter = new SpeechSynthesisUtterance("");
//       utter.volume = 0;
//       window.speechSynthesis.speak(utter);
//       this.unlocked = true;
//       console.log('Speech synthesis unlocked');
//     } catch (e) {
//       console.warn("Failed to unlock speech synthesis", e);
//     }
//   }

//   public setLanguage(lang: string) {
//     if (!lang) return;
//     const normalized = lang.split('-')[0].toLowerCase().trim();
//     console.log(`setLanguage called with: ${lang} → normalized: ${normalized}`);
//     this.currentLang = normalized;
//   }

//   private findVoice(predicate: (v: SpeechSynthesisVoice) => boolean): SpeechSynthesisVoice | undefined {
//     return this.voices.find(predicate);
//   }

//   private getMicrosoftVoice(lang: string) {
//     return this.findVoice(v =>
//       v.name.toLowerCase().includes("microsoft") &&
//       v.lang.toLowerCase().startsWith(lang)
//     );
//   }

//   private getGoogleVoice(lang: string) {
//     return this.findVoice(v =>
//       v.name.toLowerCase().includes("google") &&
//       v.lang.toLowerCase().startsWith(lang)
//     );
//   }

//   private getAnyMatchingVoice(lang: string) {
//     return this.findVoice(v =>
//       v.lang.toLowerCase().startsWith(lang)
//     );
//   }

//   /** Finds any voice whose name contains 'brian' (case‑insensitive), regardless of language. */
//   private getBrianVoice() {
//     return this.findVoice(v => v.name.toLowerCase().includes("brian"));
//   }

//   private getMicrosoftEnglishVoice() {
//     return this.findVoice(v =>
//       v.name.toLowerCase().includes("microsoft") &&
//       v.lang.toLowerCase().startsWith("en")
//     );
//   }

//   private getAnyEnglishVoice() {
//     return this.findVoice(v => v.lang.toLowerCase().startsWith("en"));
//   }

//   private resolveVoice(): SpeechSynthesisVoice | null {
//     if (!this.voicesLoaded) {
//       console.warn('Voices not loaded yet');
//       return null;
//     }

//     const baseLang = this.currentLang;
//     console.log(`Resolving voice for language: ${baseLang}`);

//     // 1. Try Microsoft voice for the target language
//     let voice = this.getMicrosoftVoice(baseLang);
//     if (voice) {
//       console.log(`Found Microsoft voice: ${voice.name} (${voice.lang})`);
//       return voice;
//     }

//     // 2. Try Google voice for the target language
//     voice = this.getGoogleVoice(baseLang);
//     if (voice) {
//       console.log(`Found Google voice: ${voice.name} (${voice.lang})`);
//       return voice;
//     }

//     // 3. Try any voice that matches the target language
//     voice = this.getAnyMatchingVoice(baseLang);
//     if (voice) {
//       console.log(`Found any matching voice: ${voice.name} (${voice.lang})`);
//       return voice;
//     }

//     // --- Fallback block ---
//     console.warn(`No voice found for ${baseLang}, trying fallbacks`);

//     // 4. Try to find any voice named "Brian" (multi‑language capable)
//     voice = this.getBrianVoice();
//     if (voice) {
//       console.log(`Fallback: using Brian voice: ${voice.name} (${voice.lang})`);
//       return voice;
//     }

//     // 5. Try Microsoft English voice
//     voice = this.getMicrosoftEnglishVoice();
//     if (voice) {
//       console.log(`Fallback: using Microsoft English voice: ${voice.name} (${voice.lang})`);
//       return voice;
//     }

//     // 6. Try any English voice
//     voice = this.getAnyEnglishVoice();
//     if (voice) {
//       console.log(`Fallback: using any English voice: ${voice.name} (${voice.lang})`);
//       return voice;
//     }

//     console.error('No voice found at all!');
//     return null;
//   }

//   public speak(text: string, queue: boolean = true) {
//     if (!text || typeof window === "undefined") return;

//     if (!this.voicesLoaded) {
//       console.log('Voices not loaded, storing pending speak request');
//       if (queue) {
//         this.pendingSpeak = { text, queue };
//       }
//       return;
//     }

//     if (queue) {
//       window.speechSynthesis.cancel();
//     }

//     const utter = new SpeechSynthesisUtterance(text);
//     const voice = this.resolveVoice();

//     if (voice) {
//       utter.voice = voice;
//       console.log(`Selected voice: ${voice.name} (${voice.lang})`);
//     } else {
//       console.warn(`No voice found, using browser default`);
//     }

//     // Always set the utterance language to the currently selected language
//     // (the one coming from Google Translate). This ensures that even when
//     // a fallback voice is used, the synthesizer knows the correct language
//     // of the text.
//     utter.lang = this.currentLang;
//     console.log(`Utterance language set to: ${this.currentLang}`);

//     utter.rate = 1;
//     utter.pitch = 1;
//     utter.volume = 1;

//     window.speechSynthesis.speak(utter);
//   }

//   public stop() {
//     if (typeof window !== "undefined") {
//       window.speechSynthesis.cancel();
//     }
//   }
// }

// export const voiceManager = new VoiceManager();





















































































































// lib/core/VoiceManager.ts
//
// ✅ SSR-SAFE: Every reference to window / speechSynthesis / MutationObserver
// is guarded with `typeof window !== 'undefined'`.  This means Next.js can
// safely import and tree-shake this module during server-side rendering without
// throwing a ReferenceError that would result in a 5xx response.

export class VoiceManager {
  private synth: SpeechSynthesis | null = null;
  private allVoices: SpeechSynthesisVoice[] = [];
  private availableVoices: SpeechSynthesisVoice[] = [];
  private lastMilestone = -1;
  private currentLang = 'en';
  private langObserver: MutationObserver | null = null;
  private voicesReady = false;

  private static readonly LANG_MAP: Record<string, string> = {
    iw: 'he', ji: 'yi', jw: 'jv', 'in': 'id', mo: 'ro',
    zh: 'zh-CN', 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW', 'zh-HK': 'zh-HK',
    hi: 'hi-IN', bn: 'bn-IN', ta: 'ta-IN', te: 'te-IN', mr: 'mr-IN',
    gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN', or: 'or-IN',
    as: 'as-IN', ur: 'ur-PK', si: 'si-LK', ne: 'ne-NP',
    ko: 'ko-KR', ja: 'ja-JP', vi: 'vi-VN', th: 'th-TH', km: 'km-KH',
    lo: 'lo-LA', my: 'my-MM', mn: 'mn-MN', ms: 'ms-MY', id: 'id-ID',
    tl: 'fil-PH', fil: 'fil-PH', jv: 'jv-ID', su: 'su-ID', ceb: 'ceb',
    ar: 'ar-SA', he: 'he-IL', fa: 'fa-IR', ps: 'ps-AF', ku: 'ku',
    hy: 'hy-AM', ka: 'ka-GE', az: 'az-AZ', kk: 'kk-KZ', ky: 'ky-KG',
    uz: 'uz-UZ', tk: 'tk-TM', tg: 'tg-TJ',
    es: 'es-ES', 'es-419': 'es-MX', pt: 'pt-PT', 'pt-BR': 'pt-BR',
    fr: 'fr-FR', it: 'it-IT', ro: 'ro-RO', ca: 'ca-ES', gl: 'gl-ES', oc: 'oc',
    de: 'de-DE', nl: 'nl-NL', af: 'af-ZA', sv: 'sv-SE', no: 'nb-NO',
    nb: 'nb-NO', nn: 'nn-NO', da: 'da-DK', is: 'is-IS', lb: 'lb', yi: 'yi',
    ru: 'ru-RU', uk: 'uk-UA', pl: 'pl-PL', cs: 'cs-CZ', sk: 'sk-SK',
    bg: 'bg-BG', hr: 'hr-HR', sr: 'sr-RS', bs: 'bs-BA', sl: 'sl-SI',
    mk: 'mk-MK', be: 'be-BY', lt: 'lt-LT', lv: 'lv-LV', et: 'et-EE',
    fi: 'fi-FI', hu: 'hu-HU', cy: 'cy-GB', ga: 'ga-IE', eu: 'eu-ES',
    mt: 'mt-MT', sq: 'sq-AL', el: 'el-GR',
    sw: 'sw-KE', am: 'am-ET', yo: 'yo-NG', ig: 'ig-NG', ha: 'ha-NG',
    zu: 'zu-ZA', xh: 'xh-ZA', st: 'st-ZA', sn: 'sn-ZW', so: 'so-SO',
    rw: 'rw-RW', ny: 'ny-MW', mg: 'mg-MG', lg: 'lg-UG', ak: 'ak-GH',
    ee: 'ee-GH', ti: 'ti-ET', om: 'om-ET',
    en: 'en-US', 'en-US': 'en-US', 'en-GB': 'en-GB',
    'en-AU': 'en-AU', 'en-IN': 'en-IN',
    tr: 'tr-TR', eo: 'eo', la: 'la', fy: 'fy-NL', gd: 'gd-GB',
    mi: 'mi-NZ', sm: 'sm-WS', to: 'to-TO', haw: 'haw-US',
    ht: 'ht-HT', hmn: 'hmn',
  };

  constructor() {
    // ✅ GUARD: skip all browser API access when running on the server
    if (typeof window === 'undefined') return;
    if (!('speechSynthesis' in window)) return;

    this.synth = window.speechSynthesis;
    this.loadVoices();
    this.synth.onvoiceschanged = () => this.loadVoices();
    setTimeout(() => this.loadVoices(), 300);
    setTimeout(() => this.loadVoices(), 1000);
    setTimeout(() => this.loadVoices(), 2500);
    this.observeGoogleTranslate();
  }

  private observeGoogleTranslate() {
    if (typeof window === 'undefined') return;
    const htmlEl = document.documentElement;
    const initial = htmlEl.getAttribute('lang');
    if (initial) this.applyLangCode(initial);

    this.langObserver = new MutationObserver(() => {
      const lang = htmlEl.getAttribute('lang');
      if (lang) this.applyLangCode(lang);
    });
    this.langObserver.observe(htmlEl, { attributes: true, attributeFilter: ['lang'] });
  }

  private applyLangCode(rawLang: string) {
    const raw = rawLang.trim();
    const base = raw.split('-')[0].toLowerCase();
    const mapped =
      VoiceManager.LANG_MAP[raw] ??
      VoiceManager.LANG_MAP[base] ??
      raw;
    if (mapped !== this.currentLang) {
      this.currentLang = mapped;
      this.selectVoicesForCurrentLang();
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (voices.length === 0) return;
    this.allVoices = voices;
    this.voicesReady = true;
    this.selectVoicesForCurrentLang();
  }

  private selectVoicesForCurrentLang() {
    if (!this.voicesReady || this.allVoices.length === 0) return;
    let matched = this.matchVoices(this.currentLang);
    const isEnglish = this.currentLang.startsWith('en');
    if (matched.length === 0 && !isEnglish) matched = this.matchVoices('en');
    this.availableVoices = this.applyPriority(matched);
    if (this.availableVoices.length === 0) {
      this.availableVoices = this.applyPriority(this.allVoices);
    }
  }

  private matchVoices(target: string): SpeechSynthesisVoice[] {
    const t = target.toLowerCase();
    const base = t.split('-')[0];
    let result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(t));
    if (result.length === 0 && t.includes('-')) {
      result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(base));
    }
    return result;
  }

  private applyPriority(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
    const microsoft = voices.filter(v => v.name.toLowerCase().includes('microsoft'));
    if (microsoft.length > 0) return microsoft;
    const google = voices.filter(v => v.name.toLowerCase().includes('google'));
    if (google.length > 0) return google;
    return voices;
  }

  public setLanguage(lang: string) { this.applyLangCode(lang); }

  public unlock() {
    if (typeof window === 'undefined') return;
    if (this.synth) {
      this.synth.resume();
      this.loadVoices();
    }
  }

  public speak(text: string, force = true) {
    if (typeof window === 'undefined') return;
    if (!this.synth) return;
    if (!this.voicesReady) this.loadVoices();
    if (force) this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.pickVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = this.currentLang;
    }
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    this.synth.speak(utterance);
  }

  public announceProgress(progress: number) {
    const milestones = [10, 25, 50, 75, 90];
    const crossed = milestones.find(m => progress >= m && this.lastMilestone < m);
    if (crossed !== undefined) {
      this.speak(`${crossed}% processing completed.`);
      this.lastMilestone = crossed;
    }
  }

  public reset() {
    this.lastMilestone = -1;
    if (typeof window !== 'undefined') this.synth?.cancel();
  }

  public destroy() {
    this.langObserver?.disconnect();
    this.langObserver = null;
    if (typeof window !== 'undefined') this.synth?.cancel();
  }

  private pickVoice(): SpeechSynthesisVoice | null {
    if (this.availableVoices.length === 0) this.loadVoices();
    if (this.availableVoices.length === 0) return null;
    return this.availableVoices[Math.floor(Math.random() * this.availableVoices.length)];
  }
}

// ✅ SSR-SAFE singleton: the constructor now no-ops on the server, so this
// top-level export is safe to import in any file.
export const voiceManager = new VoiceManager();




























































































































































































// // lib/core/VoiceManager.ts
// /**
//  * VoiceManager – Handles speech synthesis with robust language fallback.
//  * 
//  * - The language is set externally via setLanguage() (e.g., from Google Translate).
//  * - If a voice for that language exists, it is used.
//  * - Otherwise, it falls back to any English voice.
//  * - If no English voice exists, it uses the first available voice (the browser will then use that voice’s native language, but it will still attempt to speak the English text – usually acceptable).
//  * 
//  * All speak() calls made before voices are loaded are queued and executed once voices are ready.
//  * The unlock() method should be called after a user interaction (e.g., in _app.tsx's useEffect) to enable speech on browsers that require a gesture.
//  */
// class VoiceManager {
//   private voices: SpeechSynthesisVoice[] = [];
//   private currentLang: string = "en";               // normalized language (e.g., 'en', 'fr')
//   private voicesLoaded = false;
//   private pendingSpeak: { text: string; queue: boolean } | null = null;

//   constructor() {
//     if (typeof window !== "undefined") {
//       this.init();
//     }
//   }

//   private init() {
//     const loadVoices = () => {
//       const v = window.speechSynthesis.getVoices();
//       if (v.length > 0) {
//         this.voices = v;
//         this.voicesLoaded = true;
//         // Process any speak request that arrived before voices loaded
//         if (this.pendingSpeak) {
//           this.speak(this.pendingSpeak.text, this.pendingSpeak.queue);
//           this.pendingSpeak = null;
//         }
//       }
//     };

//     loadVoices();
//     window.speechSynthesis.onvoiceschanged = loadVoices;
//   }

//   /**
//    * Unlock speech synthesis on browsers that require a user gesture.
//    * Call this once after any user interaction (e.g., in _app.tsx's useEffect).
//    */
//   public unlock() {
//     if (typeof window === "undefined") return;
//     try {
//       // An empty utterance with volume 0 tricks the browser into allowing speech later.
//       const utter = new SpeechSynthesisUtterance("");
//       utter.volume = 0;
//       window.speechSynthesis.speak(utter);
//     } catch {
//       // Ignore errors – this is a best‑effort unlock.
//     }
//   }

//   /**
//    * Set the desired language (e.g., from Google Translate dropdown).
//    * @param lang Language code (e.g., 'en', 'fr', 'es').
//    */
//   public setLanguage(lang: string) {
//     if (!lang) return;
//     // Normalize: take only the base language (e.g., 'en-US' → 'en')
//     this.currentLang = lang.split('-')[0].toLowerCase().trim();
//   }

//   /**
//    * Find the best voice for a given language.
//    * Returns the first voice whose language starts with the language code.
//    */
//   private findVoiceForLang(lang: string): SpeechSynthesisVoice | undefined {
//     return this.voices.find(v => v.lang.toLowerCase().startsWith(lang));
//   }

//   /**
//    * Resolve the most appropriate voice for the current language.
//    * Priority:
//    *   1. A voice that matches the current language.
//    *   2. Any English voice.
//    *   3. The first available voice (ultimate fallback).
//    */
//   private resolveVoice(): SpeechSynthesisVoice | null {
//     if (!this.voicesLoaded || this.voices.length === 0) return null;

//     // 1. Try to get a voice for the current language
//     let voice = this.findVoiceForLang(this.currentLang);
//     if (voice) return voice;

//     // 2. Fallback to any English voice
//     voice = this.findVoiceForLang('en');
//     if (voice) return voice;

//     // 3. Last resort: first available voice (language may be non‑English)
//     return this.voices[0] || null;
//   }

//   /**
//    * Speak the given text.
//    * @param text The text to speak.
//    * @param queue If true, cancel any ongoing speech and start new; if false, just add to queue.
//    */
//   public speak(text: string, queue: boolean = true) {
//     if (!text || typeof window === "undefined") return;

//     // If voices aren't loaded yet, store the request for later.
//     if (!this.voicesLoaded) {
//       if (queue) {
//         this.pendingSpeak = { text, queue };
//       }
//       return;
//     }

//     if (queue) {
//       window.speechSynthesis.cancel();
//     }

//     const utter = new SpeechSynthesisUtterance(text);
//     const voice = this.resolveVoice();

//     if (voice) {
//       utter.voice = voice;
//     }

//     // Set the utterance language to the normalized current language.
//     // This tells the synthesis engine the language of the text (important for pronunciation).
//     // Even if an English voice is used for a non‑English language, it will still pronounce English text correctly.
//     utter.lang = this.currentLang;

//     utter.rate = 1;
//     utter.pitch = 1;
//     utter.volume = 1;

//     window.speechSynthesis.speak(utter);
//   }

//   /**
//    * Stop any ongoing speech.
//    */
//   public stop() {
//     if (typeof window !== "undefined") {
//       window.speechSynthesis.cancel();
//     }
//   }
// }

// export const voiceManager = new VoiceManager();