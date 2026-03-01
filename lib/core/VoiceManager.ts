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





export class VoiceManager {
  private synth: SpeechSynthesis | null = null;
  private allVoices: SpeechSynthesisVoice[] = [];
  private availableVoices: SpeechSynthesisVoice[] = [];
  private lastMilestone = -1;
  private currentLang = 'en';
  private langObserver: MutationObserver | null = null;
  private voicesReady = false;

  /**
   * Maps Google Translate lang codes → BCP-47 base codes used in SpeechSynthesis voice.lang
   *
   * Google Translate emits short codes (e.g. "zh-CN", "ko", "hi", "iw").
   * SpeechSynthesis voice.lang is typically full BCP-47 (e.g. "zh-CN", "ko-KR", "hi-IN").
   * This map normalises Google's output so matchByLang() can find the right voices.
   *
   * Format: googleTranslateCode → BCP-47 prefix to match against voice.lang
   */
  private static readonly LANG_MAP: Record<string, string> = {
    // ── Legacy / Deprecated ISO codes Google still emits ──────────────────
    iw: 'he',         // Hebrew       (legacy → modern)
    ji: 'yi',         // Yiddish
    jw: 'jv',         // Javanese
    'in': 'id',       // Indonesian   (legacy → modern)
    mo: 'ro',         // Moldovan     (merged into Romanian)

    // ── Chinese variants ──────────────────────────────────────────────────
    zh: 'zh-CN',      // Chinese generic     → Simplified (Mainland)
    'zh-CN': 'zh-CN', // Chinese Simplified
    'zh-TW': 'zh-TW', // Chinese Traditional (Taiwan)
    'zh-HK': 'zh-HK', // Chinese Traditional (Hong Kong)

    // ── South Asian / Indian languages ────────────────────────────────────
    hi: 'hi-IN',      // Hindi
    bn: 'bn-IN',      // Bengali
    ta: 'ta-IN',      // Tamil
    te: 'te-IN',      // Telugu
    mr: 'mr-IN',      // Marathi
    gu: 'gu-IN',      // Gujarati
    kn: 'kn-IN',      // Kannada
    ml: 'ml-IN',      // Malayalam
    pa: 'pa-IN',      // Punjabi (Gurmukhi)
    or: 'or-IN',      // Odia
    as: 'as-IN',      // Assamese
    ur: 'ur-PK',      // Urdu         (primary: Pakistan)
    si: 'si-LK',      // Sinhala
    ne: 'ne-NP',      // Nepali

    // ── East / Southeast Asian ────────────────────────────────────────────
    ko: 'ko-KR',      // Korean
    ja: 'ja-JP',      // Japanese
    vi: 'vi-VN',      // Vietnamese
    th: 'th-TH',      // Thai
    km: 'km-KH',      // Khmer
    lo: 'lo-LA',      // Lao
    my: 'my-MM',      // Burmese
    mn: 'mn-MN',      // Mongolian
    ms: 'ms-MY',      // Malay
    id: 'id-ID',      // Indonesian
    tl: 'fil-PH',     // Filipino / Tagalog
    fil: 'fil-PH',    // Filipino (explicit)
    jv: 'jv-ID',      // Javanese
    su: 'su-ID',      // Sundanese
    ceb: 'ceb',       // Cebuano

    // ── Middle Eastern / Central Asian ────────────────────────────────────
    ar: 'ar-SA',      // Arabic       (primary: Saudi Arabia)
    he: 'he-IL',      // Hebrew
    fa: 'fa-IR',      // Persian / Farsi
    ps: 'ps-AF',      // Pashto
    ku: 'ku',         // Kurdish
    hy: 'hy-AM',      // Armenian
    ka: 'ka-GE',      // Georgian
    az: 'az-AZ',      // Azerbaijani
    kk: 'kk-KZ',      // Kazakh
    ky: 'ky-KG',      // Kyrgyz
    uz: 'uz-UZ',      // Uzbek
    tk: 'tk-TM',      // Turkmen
    tg: 'tg-TJ',      // Tajik

    // ── European — Romance ────────────────────────────────────────────────
    es: 'es-ES',      // Spanish      (primary: Spain)
    'es-419': 'es-MX',// Spanish Latin America → Mexico
    pt: 'pt-PT',      // Portuguese   (primary: Portugal)
    'pt-BR': 'pt-BR', // Portuguese Brazil
    fr: 'fr-FR',      // French
    it: 'it-IT',      // Italian
    ro: 'ro-RO',      // Romanian
    ca: 'ca-ES',      // Catalan
    gl: 'gl-ES',      // Galician
    oc: 'oc',         // Occitan

    // ── European — Germanic ───────────────────────────────────────────────
    de: 'de-DE',      // German
    nl: 'nl-NL',      // Dutch
    af: 'af-ZA',      // Afrikaans
    sv: 'sv-SE',      // Swedish
    no: 'nb-NO',      // Norwegian    (Bokmål)
    nb: 'nb-NO',      // Norwegian Bokmål
    nn: 'nn-NO',      // Norwegian Nynorsk
    da: 'da-DK',      // Danish
    is: 'is-IS',      // Icelandic
    lb: 'lb',         // Luxembourgish
    yi: 'yi',         // Yiddish

    // ── European — Slavic ─────────────────────────────────────────────────
    ru: 'ru-RU',      // Russian
    uk: 'uk-UA',      // Ukrainian
    pl: 'pl-PL',      // Polish
    cs: 'cs-CZ',      // Czech
    sk: 'sk-SK',      // Slovak
    bg: 'bg-BG',      // Bulgarian
    hr: 'hr-HR',      // Croatian
    sr: 'sr-RS',      // Serbian
    bs: 'bs-BA',      // Bosnian
    sl: 'sl-SI',      // Slovenian
    mk: 'mk-MK',      // Macedonian
    be: 'be-BY',      // Belarusian

    // ── European — Baltic ─────────────────────────────────────────────────
    lt: 'lt-LT',      // Lithuanian
    lv: 'lv-LV',      // Latvian
    et: 'et-EE',      // Estonian

    // ── European — Finno-Ugric ────────────────────────────────────────────
    fi: 'fi-FI',      // Finnish
    hu: 'hu-HU',      // Hungarian

    // ── European — Celtic / Other ─────────────────────────────────────────
    cy: 'cy-GB',      // Welsh
    ga: 'ga-IE',      // Irish
    eu: 'eu-ES',      // Basque
    mt: 'mt-MT',      // Maltese
    sq: 'sq-AL',      // Albanian
    el: 'el-GR',      // Greek

    // ── African ───────────────────────────────────────────────────────────
    sw: 'sw-KE',      // Swahili
    am: 'am-ET',      // Amharic
    yo: 'yo-NG',      // Yoruba
    ig: 'ig-NG',      // Igbo
    ha: 'ha-NG',      // Hausa
    zu: 'zu-ZA',      // Zulu
    xh: 'xh-ZA',      // Xhosa
    st: 'st-ZA',      // Sesotho
    sn: 'sn-ZW',      // Shona
    so: 'so-SO',      // Somali
    rw: 'rw-RW',      // Kinyarwanda
    ny: 'ny-MW',      // Chichewa / Nyanja
    mg: 'mg-MG',      // Malagasy
    lg: 'lg-UG',      // Luganda
    ak: 'ak-GH',      // Akan / Twi
    ee: 'ee-GH',      // Ewe
    ti: 'ti-ET',      // Tigrinya
    om: 'om-ET',      // Oromo

    // ── English variants (pass-through) ──────────────────────────────────
    en: 'en-US',      // English generic → US
    'en-US': 'en-US',
    'en-GB': 'en-GB',
    'en-AU': 'en-AU',
    'en-IN': 'en-IN',

    // ── Turkish / Turkic ─────────────────────────────────────────────────
    tr: 'tr-TR',      // Turkish

    // ── Other ─────────────────────────────────────────────────────────────
    eo: 'eo',         // Esperanto
    la: 'la',         // Latin
    fy: 'fy-NL',      // Frisian
    gd: 'gd-GB',      // Scottish Gaelic
    mi: 'mi-NZ',      // Maori
    sm: 'sm-WS',      // Samoan
    to: 'to-TO',      // Tongan
    haw: 'haw-US',    // Hawaiian
    ht: 'ht-HT',      // Haitian Creole
    hmn: 'hmn',       // Hmong
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;

      // Load voices — Chrome has them sync, Firefox/Safari async
      this.loadVoices();
      this.synth.onvoiceschanged = () => this.loadVoices();

      // Mobile: voices often arrive late
      setTimeout(() => this.loadVoices(), 300);
      setTimeout(() => this.loadVoices(), 1000);
      setTimeout(() => this.loadVoices(), 2500);

      // Sync with Google Translate <html lang="...">
      this.observeGoogleTranslate();
    }
  }

  // ─── Google Translate Sync ───────────────────────────────────────────────

  private observeGoogleTranslate() {
    if (typeof window === 'undefined') return;
    const htmlEl = document.documentElement;

    // Read language already present at startup (e.g. user had translate active)
    const initial = htmlEl.getAttribute('lang');
    if (initial) this.applyLangCode(initial);

    this.langObserver = new MutationObserver(() => {
      const lang = htmlEl.getAttribute('lang');
      if (lang) {
        console.log(`VoiceManager: Google Translate → "${lang}"`);
        this.applyLangCode(lang);
      }
    });

    this.langObserver.observe(htmlEl, {
      attributes: true,
      attributeFilter: ['lang'],
    });
  }

  /**
   * Convert Google Translate's emitted code to BCP-47, then apply.
   *
   * Google emits codes like: "zh-CN", "ko", "hi", "iw", "in", "es-419"
   * We look up the FULL code first, then the base code, then use as-is.
   */
  private applyLangCode(rawLang: string) {
    const raw = rawLang.trim();
    const base = raw.split('-')[0].toLowerCase();

    // 1. Try full code lookup (e.g. "zh-CN", "es-419", "pt-BR")
    const mapped =
      VoiceManager.LANG_MAP[raw] ??
      VoiceManager.LANG_MAP[base] ??
      raw; // Use as-is if not in map

    if (mapped !== this.currentLang) {
      console.log(`VoiceManager: Language "${raw}" → "${mapped}"`);
      this.currentLang = mapped;
      this.selectVoicesForCurrentLang();
    }
  }

  // ─── Voice Loading ────────────────────────────────────────────────────────

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (voices.length === 0) return;

    this.allVoices = voices;
    this.voicesReady = true;
    console.log(`VoiceManager: ${voices.length} total voices loaded from browser.`);

    this.selectVoicesForCurrentLang();
  }

  /**
   * THE CORE MATCHING ENGINE
   *
   * Given this.currentLang (a BCP-47 prefix like "zh-CN", "ko-KR", "hi-IN"):
   *
   * 1. Find all voices where voice.lang STARTS WITH the target prefix
   *    e.g. "ko-KR" matches "ko-KR" voice
   *    e.g. "zh-CN" matches "zh-CN" voice
   *    e.g. "hi"    matches "hi-IN" voice  (base-code match)
   *
   * 2. Apply STRICT priority: Microsoft → Google → Others
   *
   * 3. ENGLISH-ONLY fallback if zero voices found for the language
   *
   * 4. Absolute last resort: any voice on the system
   */
  private selectVoicesForCurrentLang() {
    if (!this.voicesReady || this.allVoices.length === 0) return;

    // Step 1: Match voices for current language
    let matched = this.matchVoices(this.currentLang);

    const isEnglish = this.currentLang.startsWith('en');

    // Step 2: English-only fallback
    if (matched.length === 0 && !isEnglish) {
      console.warn(
        `VoiceManager: No voices found for "${this.currentLang}" on this device. ` +
        `Falling back to English ONLY.`
      );
      matched = this.matchVoices('en');
    }

    // Step 3: Apply Microsoft > Google > Others priority
    this.availableVoices = this.applyPriority(matched);

    // Step 4: Absolute last resort
    if (this.availableVoices.length === 0) {
      console.warn('VoiceManager: No English voices either! Using any available voice.');
      this.availableVoices = this.applyPriority(this.allVoices);
    }

    console.log(
      `VoiceManager: "${this.currentLang}" → ` +
      `${this.availableVoices.length} voice(s) selected. ` +
      `Top: "${this.availableVoices[0]?.name}" [${this.availableVoices[0]?.lang}]`
    );
  }

  /**
   * Match voices from allVoices for a given lang target.
   *
   * Strategy:
   *   A) Full prefix match: target="ko-KR"  → voice.lang starts with "ko-KR"
   *   B) Base match:        target="ko-KR"  → voice.lang starts with "ko"
   *   C) Target is base:    target="ko"     → voice.lang starts with "ko"
   *
   * Always tries the most specific match first to avoid wrong-region voices.
   */
  private matchVoices(target: string): SpeechSynthesisVoice[] {
    const t = target.toLowerCase();
    const base = t.split('-')[0];

    // A: Exact prefix — "ko-KR" matches voice.lang "ko-KR"
    let result = this.allVoices.filter(v =>
      v.lang.toLowerCase().startsWith(t)
    );

    // B: If target had region suffix and nothing matched, try base code
    //    "ko-KR" → try "ko" to catch any Korean voice (ko-KR, ko-KP etc.)
    if (result.length === 0 && t.includes('-')) {
      result = this.allVoices.filter(v =>
        v.lang.toLowerCase().startsWith(base)
      );
    }

    // C: If target IS a base code (e.g. "ko", "hi", "zh")
    //    already covered by case A since "ko".startsWith("ko") is true
    //    but voice.lang is "ko-KR" and "ko-KR".startsWith("ko") is ALSO true ✓

    return result;
  }

  /**
   * STRICT priority: Microsoft Edge TTS > Google TTS > System/Other
   * Returns ALL voices in the winning tier (includes male + female variants).
   */
  private applyPriority(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
    const microsoft = voices.filter(v => v.name.toLowerCase().includes('microsoft'));
    if (microsoft.length > 0) return microsoft;

    const google = voices.filter(v => v.name.toLowerCase().includes('google'));
    if (google.length > 0) return google;

    return voices;
  }

  // ─── Public API ──────────────────────────────────────────────────────────

  /** Manually override the TTS language (e.g. from a UI picker). */
  public setLanguage(lang: string) {
    this.applyLangCode(lang);
  }

  /** Call on first user gesture — required to unlock audio on iOS/Android. */
  public unlock() {
    if (this.synth) {
      this.synth.resume();
      this.loadVoices();
    }
  }

  /**
   * Speak text using the best voice for the current language.
   * If no voice found for that language → speaks in English.
   */
  public speak(text: string, force = true) {
    if (!this.synth) return;

    // If voices weren't ready at construction, try again now
    if (!this.voicesReady) this.loadVoices();

    if (force) this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.pickVoice();

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang; // Explicit lang required on Android
    } else {
      utterance.lang = this.currentLang;
    }

    utterance.rate   = 1.0;
    utterance.pitch  = 1.0;
    utterance.volume = 1.0;

    this.synth.speak(utterance);
  }

  /** Announce progress milestones: 10%, 25%, 50%, 75%, 90%. */
  public announceProgress(progress: number) {
    const milestones = [10, 25, 50, 75, 90];
    const crossed = milestones.find(m => progress >= m && this.lastMilestone < m);
    if (crossed !== undefined) {
      this.speak(`${crossed}% processing completed.`);
      this.lastMilestone = crossed;
    }
  }

  /** Reset milestones and stop any ongoing speech. */
  public reset() {
    this.lastMilestone = -1;
    this.synth?.cancel();
  }

  /** Call on component unmount to clean up observer. */
  public destroy() {
    this.langObserver?.disconnect();
    this.langObserver = null;
    this.synth?.cancel();
  }

  // ─── Internal ────────────────────────────────────────────────────────────

  private pickVoice(): SpeechSynthesisVoice | null {
    // Retry if pool is empty (sometimes voices load after speak() is called)
    if (this.availableVoices.length === 0) {
      this.loadVoices();
    }

    if (this.availableVoices.length === 0) {
      console.warn('VoiceManager: No voice available. Browser default will be used.');
      return null;
    }

    // Random selection across available voices → natural variety (male/female)
    const idx = Math.floor(Math.random() * this.availableVoices.length);
    return this.availableVoices[idx];
  }
}

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