// // lib/core/VoiceManager.ts
// //
// // ✅ SSR-SAFE: Every reference to window / speechSynthesis / MutationObserver
// // is guarded with `typeof window !== 'undefined'`.  This means Next.js can
// // safely import and tree-shake this module during server-side rendering without
// // throwing a ReferenceError that would result in a 5xx response.

// export class VoiceManager {
//   private synth: SpeechSynthesis | null = null;
//   private allVoices: SpeechSynthesisVoice[] = [];
//   private availableVoices: SpeechSynthesisVoice[] = [];
//   private lastMilestone = -1;
//   private currentLang = 'en';
//   private langObserver: MutationObserver | null = null;
//   private voicesReady = false;

//   private static readonly LANG_MAP: Record<string, string> = {
//     iw: 'he', ji: 'yi', jw: 'jv', 'in': 'id', mo: 'ro',
//     zh: 'zh-CN', 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW', 'zh-HK': 'zh-HK',
//     hi: 'hi-IN', bn: 'bn-IN', ta: 'ta-IN', te: 'te-IN', mr: 'mr-IN',
//     gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN', or: 'or-IN',
//     as: 'as-IN', ur: 'ur-PK', si: 'si-LK', ne: 'ne-NP',
//     ko: 'ko-KR', ja: 'ja-JP', vi: 'vi-VN', th: 'th-TH', km: 'km-KH',
//     lo: 'lo-LA', my: 'my-MM', mn: 'mn-MN', ms: 'ms-MY', id: 'id-ID',
//     tl: 'fil-PH', fil: 'fil-PH', jv: 'jv-ID', su: 'su-ID', ceb: 'ceb',
//     ar: 'ar-SA', he: 'he-IL', fa: 'fa-IR', ps: 'ps-AF', ku: 'ku',
//     hy: 'hy-AM', ka: 'ka-GE', az: 'az-AZ', kk: 'kk-KZ', ky: 'ky-KG',
//     uz: 'uz-UZ', tk: 'tk-TM', tg: 'tg-TJ',
//     es: 'es-ES', 'es-419': 'es-MX', pt: 'pt-PT', 'pt-BR': 'pt-BR',
//     fr: 'fr-FR', it: 'it-IT', ro: 'ro-RO', ca: 'ca-ES', gl: 'gl-ES', oc: 'oc',
//     de: 'de-DE', nl: 'nl-NL', af: 'af-ZA', sv: 'sv-SE', no: 'nb-NO',
//     nb: 'nb-NO', nn: 'nn-NO', da: 'da-DK', is: 'is-IS', lb: 'lb', yi: 'yi',
//     ru: 'ru-RU', uk: 'uk-UA', pl: 'pl-PL', cs: 'cs-CZ', sk: 'sk-SK',
//     bg: 'bg-BG', hr: 'hr-HR', sr: 'sr-RS', bs: 'bs-BA', sl: 'sl-SI',
//     mk: 'mk-MK', be: 'be-BY', lt: 'lt-LT', lv: 'lv-LV', et: 'et-EE',
//     fi: 'fi-FI', hu: 'hu-HU', cy: 'cy-GB', ga: 'ga-IE', eu: 'eu-ES',
//     mt: 'mt-MT', sq: 'sq-AL', el: 'el-GR',
//     sw: 'sw-KE', am: 'am-ET', yo: 'yo-NG', ig: 'ig-NG', ha: 'ha-NG',
//     zu: 'zu-ZA', xh: 'xh-ZA', st: 'st-ZA', sn: 'sn-ZW', so: 'so-SO',
//     rw: 'rw-RW', ny: 'ny-MW', mg: 'mg-MG', lg: 'lg-UG', ak: 'ak-GH',
//     ee: 'ee-GH', ti: 'ti-ET', om: 'om-ET',
//     en: 'en-US', 'en-US': 'en-US', 'en-GB': 'en-GB',
//     'en-AU': 'en-AU', 'en-IN': 'en-IN',
//     tr: 'tr-TR', eo: 'eo', la: 'la', fy: 'fy-NL', gd: 'gd-GB',
//     mi: 'mi-NZ', sm: 'sm-WS', to: 'to-TO', haw: 'haw-US',
//     ht: 'ht-HT', hmn: 'hmn',
//   };

//   constructor() {
//     // ✅ GUARD: skip all browser API access when running on the server
//     if (typeof window === 'undefined') return;
//     if (!('speechSynthesis' in window)) return;

//     this.synth = window.speechSynthesis;
//     this.loadVoices();
//     this.synth.onvoiceschanged = () => this.loadVoices();
//     setTimeout(() => this.loadVoices(), 300);
//     setTimeout(() => this.loadVoices(), 1000);
//     setTimeout(() => this.loadVoices(), 2500);
//     this.observeGoogleTranslate();
//   }

//   private observeGoogleTranslate() {
//     if (typeof window === 'undefined') return;
//     const htmlEl = document.documentElement;
//     const initial = htmlEl.getAttribute('lang');
//     if (initial) this.applyLangCode(initial);

//     this.langObserver = new MutationObserver(() => {
//       const lang = htmlEl.getAttribute('lang');
//       if (lang) this.applyLangCode(lang);
//     });
//     this.langObserver.observe(htmlEl, { attributes: true, attributeFilter: ['lang'] });
//   }

//   private applyLangCode(rawLang: string) {
//     const raw = rawLang.trim();
//     const base = raw.split('-')[0].toLowerCase();
//     const mapped =
//       VoiceManager.LANG_MAP[raw] ??
//       VoiceManager.LANG_MAP[base] ??
//       raw;
//     if (mapped !== this.currentLang) {
//       this.currentLang = mapped;
//       this.selectVoicesForCurrentLang();
//     }
//   }

//   private loadVoices() {
//     if (!this.synth) return;
//     const voices = this.synth.getVoices();
//     if (voices.length === 0) return;
//     this.allVoices = voices;
//     this.voicesReady = true;
//     this.selectVoicesForCurrentLang();
//   }

//   private selectVoicesForCurrentLang() {
//     if (!this.voicesReady || this.allVoices.length === 0) return;
//     let matched = this.matchVoices(this.currentLang);
//     const isEnglish = this.currentLang.startsWith('en');
//     if (matched.length === 0 && !isEnglish) matched = this.matchVoices('en');
//     this.availableVoices = this.applyPriority(matched);
//     if (this.availableVoices.length === 0) {
//       this.availableVoices = this.applyPriority(this.allVoices);
//     }
//   }

//   private matchVoices(target: string): SpeechSynthesisVoice[] {
//     const t = target.toLowerCase();
//     const base = t.split('-')[0];
//     let result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(t));
//     if (result.length === 0 && t.includes('-')) {
//       result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(base));
//     }
//     return result;
//   }

//   private applyPriority(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
//     const microsoft = voices.filter(v => v.name.toLowerCase().includes('microsoft'));
//     if (microsoft.length > 0) return microsoft;
//     const google = voices.filter(v => v.name.toLowerCase().includes('google'));
//     if (google.length > 0) return google;
//     return voices;
//   }

//   public setLanguage(lang: string) { this.applyLangCode(lang); }

//   public unlock() {
//     if (typeof window === 'undefined') return;
//     if (this.synth) {
//       this.synth.resume();
//       this.loadVoices();
//     }
//   }

//   public speak(text: string, force = true) {
//     if (typeof window === 'undefined') return;
//     if (!this.synth) return;
//     if (!this.voicesReady) this.loadVoices();
//     if (force) this.synth.cancel();

//     const utterance = new SpeechSynthesisUtterance(text);
//     const voice = this.pickVoice();
//     if (voice) {
//       utterance.voice = voice;
//       utterance.lang = voice.lang;
//     } else {
//       utterance.lang = this.currentLang;
//     }
//     utterance.rate = 1.0;
//     utterance.pitch = 1.0;
//     utterance.volume = 1.0;
//     this.synth.speak(utterance);
//   }

//   public announceProgress(progress: number) {
//     const milestones = [10, 25, 50, 75, 90];
//     const crossed = milestones.find(m => progress >= m && this.lastMilestone < m);
//     if (crossed !== undefined) {
//       this.speak(`${crossed}% processing completed.`);
//       this.lastMilestone = crossed;
//     }
//   }

//   public reset() {
//     this.lastMilestone = -1;
//     if (typeof window !== 'undefined') this.synth?.cancel();
//   }

//   public destroy() {
//     this.langObserver?.disconnect();
//     this.langObserver = null;
//     if (typeof window !== 'undefined') this.synth?.cancel();
//   }

//   private pickVoice(): SpeechSynthesisVoice | null {
//     if (this.availableVoices.length === 0) this.loadVoices();
//     if (this.availableVoices.length === 0) return null;
//     return this.availableVoices[Math.floor(Math.random() * this.availableVoices.length)];
//   }
// }

// // ✅ SSR-SAFE singleton: the constructor now no-ops on the server, so this
// // top-level export is safe to import in any file.
// export const voiceManager = new VoiceManager();
















// // lib/core/VoiceManager.ts
// //
// // ✅ FULLY SSR-SAFE
// // Every single browser API (window, speechSynthesis, MutationObserver) is
// // guarded. This file can be imported at the TOP LEVEL of any Next.js page
// // or _app.tsx without crashing the Node.js server-side render.

// export class VoiceManager {
//   private synth: SpeechSynthesis | null = null;
//   private allVoices: SpeechSynthesisVoice[] = [];
//   private availableVoices: SpeechSynthesisVoice[] = [];
//   private lastMilestone = -1;
//   private currentLang = 'en';
//   private langObserver: MutationObserver | null = null;
//   private voicesReady = false;

//   private static readonly LANG_MAP: Record<string, string> = {
//     iw: 'he', ji: 'yi', jw: 'jv', 'in': 'id', mo: 'ro',
//     zh: 'zh-CN', 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW', 'zh-HK': 'zh-HK',
//     hi: 'hi-IN', bn: 'bn-IN', ta: 'ta-IN', te: 'te-IN', mr: 'mr-IN',
//     gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN', or: 'or-IN',
//     as: 'as-IN', ur: 'ur-PK', si: 'si-LK', ne: 'ne-NP',
//     ko: 'ko-KR', ja: 'ja-JP', vi: 'vi-VN', th: 'th-TH', km: 'km-KH',
//     lo: 'lo-LA', my: 'my-MM', mn: 'mn-MN', ms: 'ms-MY', id: 'id-ID',
//     tl: 'fil-PH', fil: 'fil-PH', jv: 'jv-ID', su: 'su-ID', ceb: 'ceb',
//     ar: 'ar-SA', he: 'he-IL', fa: 'fa-IR', ps: 'ps-AF', ku: 'ku',
//     hy: 'hy-AM', ka: 'ka-GE', az: 'az-AZ', kk: 'kk-KZ', ky: 'ky-KG',
//     uz: 'uz-UZ', tk: 'tk-TM', tg: 'tg-TJ',
//     es: 'es-ES', 'es-419': 'es-MX', pt: 'pt-PT', 'pt-BR': 'pt-BR',
//     fr: 'fr-FR', it: 'it-IT', ro: 'ro-RO', ca: 'ca-ES', gl: 'gl-ES', oc: 'oc',
//     de: 'de-DE', nl: 'nl-NL', af: 'af-ZA', sv: 'sv-SE', no: 'nb-NO',
//     nb: 'nb-NO', nn: 'nn-NO', da: 'da-DK', is: 'is-IS', lb: 'lb', yi: 'yi',
//     ru: 'ru-RU', uk: 'uk-UA', pl: 'pl-PL', cs: 'cs-CZ', sk: 'sk-SK',
//     bg: 'bg-BG', hr: 'hr-HR', sr: 'sr-RS', bs: 'bs-BA', sl: 'sl-SI',
//     mk: 'mk-MK', be: 'be-BY', lt: 'lt-LT', lv: 'lv-LV', et: 'et-EE',
//     fi: 'fi-FI', hu: 'hu-HU', cy: 'cy-GB', ga: 'ga-IE', eu: 'eu-ES',
//     mt: 'mt-MT', sq: 'sq-AL', el: 'el-GR',
//     sw: 'sw-KE', am: 'am-ET', yo: 'yo-NG', ig: 'ig-NG', ha: 'ha-NG',
//     zu: 'zu-ZA', xh: 'xh-ZA', st: 'st-ZA', sn: 'sn-ZW', so: 'so-SO',
//     rw: 'rw-RW', ny: 'ny-MW', mg: 'mg-MG', lg: 'lg-UG', ak: 'ak-GH',
//     ee: 'ee-GH', ti: 'ti-ET', om: 'om-ET',
//     en: 'en-US', 'en-US': 'en-US', 'en-GB': 'en-GB',
//     'en-AU': 'en-AU', 'en-IN': 'en-IN',
//     tr: 'tr-TR', eo: 'eo', la: 'la', fy: 'fy-NL', gd: 'gd-GB',
//     mi: 'mi-NZ', sm: 'sm-WS', to: 'to-TO', haw: 'haw-US',
//     ht: 'ht-HT', hmn: 'hmn',
//   };

//   constructor() {
//     // ✅ CRITICAL GUARD — do nothing on the server (Node.js)
//     if (typeof window === 'undefined') return;
//     if (typeof window.speechSynthesis === 'undefined') return;

//     this.synth = window.speechSynthesis;
//     this.loadVoices();
//     this.synth.onvoiceschanged = () => this.loadVoices();
//     setTimeout(() => this.loadVoices(), 300);
//     setTimeout(() => this.loadVoices(), 1000);
//     setTimeout(() => this.loadVoices(), 2500);
//     this.observeGoogleTranslate();
//   }

//   private observeGoogleTranslate(): void {
//     if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;
//     const htmlEl = document.documentElement;
//     const initial = htmlEl.getAttribute('lang');
//     if (initial) this.applyLangCode(initial);
//     this.langObserver = new MutationObserver(() => {
//       const lang = htmlEl.getAttribute('lang');
//       if (lang) this.applyLangCode(lang);
//     });
//     this.langObserver.observe(htmlEl, { attributes: true, attributeFilter: ['lang'] });
//   }

//   private applyLangCode(rawLang: string): void {
//     const raw = rawLang.trim();
//     const base = raw.split('-')[0].toLowerCase();
//     const mapped = VoiceManager.LANG_MAP[raw] ?? VoiceManager.LANG_MAP[base] ?? raw;
//     if (mapped !== this.currentLang) {
//       this.currentLang = mapped;
//       this.selectVoicesForCurrentLang();
//     }
//   }

//   private loadVoices(): void {
//     if (!this.synth) return;
//     const voices = this.synth.getVoices();
//     if (!voices.length) return;
//     this.allVoices = voices;
//     this.voicesReady = true;
//     this.selectVoicesForCurrentLang();
//   }

//   private selectVoicesForCurrentLang(): void {
//     if (!this.voicesReady || !this.allVoices.length) return;
//     let matched = this.matchVoices(this.currentLang);
//     if (!matched.length && !this.currentLang.startsWith('en')) {
//       matched = this.matchVoices('en');
//     }
//     this.availableVoices = this.applyPriority(matched);
//     if (!this.availableVoices.length) {
//       this.availableVoices = this.applyPriority(this.allVoices);
//     }
//   }

//   private matchVoices(target: string): SpeechSynthesisVoice[] {
//     const t = target.toLowerCase();
//     const base = t.split('-')[0];
//     let result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(t));
//     if (!result.length && t.includes('-')) {
//       result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(base));
//     }
//     return result;
//   }

//   private applyPriority(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
//     const ms = voices.filter(v => v.name.toLowerCase().includes('microsoft'));
//     if (ms.length) return ms;
//     const goog = voices.filter(v => v.name.toLowerCase().includes('google'));
//     if (goog.length) return goog;
//     return voices;
//   }

//   private pickVoice(): SpeechSynthesisVoice | null {
//     if (!this.availableVoices.length) this.loadVoices();
//     if (!this.availableVoices.length) return null;
//     return this.availableVoices[Math.floor(Math.random() * this.availableVoices.length)];
//   }

//   // ── Public API ──────────────────────────────────────────────────────────

//   public setLanguage(lang: string): void { this.applyLangCode(lang); }

//   public unlock(): void {
//     if (typeof window === 'undefined') return;
//     this.synth?.resume();
//     this.loadVoices();
//   }

//   public speak(text: string, force = true): void {
//     if (typeof window === 'undefined') return;
//     if (!this.synth) return;
//     if (!this.voicesReady) this.loadVoices();
//     if (force) this.synth.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
//     const voice = this.pickVoice();
//     if (voice) { utterance.voice = voice; utterance.lang = voice.lang; }
//     else { utterance.lang = this.currentLang; }
//     utterance.rate = 1.0;
//     utterance.pitch = 1.0;
//     utterance.volume = 1.0;
//     this.synth.speak(utterance);
//   }

//   public announceProgress(progress: number): void {
//     const milestones = [10, 25, 50, 75, 90];
//     const crossed = milestones.find(m => progress >= m && this.lastMilestone < m);
//     if (crossed !== undefined) { this.speak(`${crossed}% processing completed.`); this.lastMilestone = crossed; }
//   }

//   public reset(): void {
//     this.lastMilestone = -1;
//     if (typeof window !== 'undefined') this.synth?.cancel();
//   }

//   public destroy(): void {
//     this.langObserver?.disconnect();
//     this.langObserver = null;
//     if (typeof window !== 'undefined') this.synth?.cancel();
//   }
// }

// // ✅ Safe singleton — constructor no-ops on the server
// export const voiceManager = new VoiceManager();

















// // lib/core/VoiceManager.ts
// import { bgMusicManager } from './BackgroundMusicManager';
// import { musicController } from './MusicController';

// export class VoiceManager {
//   private synth: SpeechSynthesis | null = null;
//   private allVoices: SpeechSynthesisVoice[] = [];
//   private availableVoices: SpeechSynthesisVoice[] = [];
//   private lastMilestone = -1;
//   private currentLang = 'en';
//   private langObserver: MutationObserver | null = null;
//   private voicesReady = false;
//   private utteranceCount = 0;          // track active utterances
//   private musicStopTimer: ReturnType<typeof setTimeout> | null = null;

//   private static readonly LANG_MAP: Record<string, string> = {
//     iw: 'he', ji: 'yi', jw: 'jv', 'in': 'id', mo: 'ro',
//     zh: 'zh-CN', 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW', 'zh-HK': 'zh-HK',
//     hi: 'hi-IN', bn: 'bn-IN', ta: 'ta-IN', te: 'te-IN', mr: 'mr-IN',
//     gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN', or: 'or-IN',
//     as: 'as-IN', ur: 'ur-PK', si: 'si-LK', ne: 'ne-NP',
//     ko: 'ko-KR', ja: 'ja-JP', vi: 'vi-VN', th: 'th-TH', km: 'km-KH',
//     lo: 'lo-LA', my: 'my-MM', mn: 'mn-MN', ms: 'ms-MY', id: 'id-ID',
//     tl: 'fil-PH', fil: 'fil-PH', jv: 'jv-ID', su: 'su-ID', ceb: 'ceb',
//     ar: 'ar-SA', he: 'he-IL', fa: 'fa-IR', ps: 'ps-AF', ku: 'ku',
//     hy: 'hy-AM', ka: 'ka-GE', az: 'az-AZ', kk: 'kk-KZ', ky: 'ky-KG',
//     uz: 'uz-UZ', tk: 'tk-TM', tg: 'tg-TJ',
//     es: 'es-ES', 'es-419': 'es-MX', pt: 'pt-PT', 'pt-BR': 'pt-BR',
//     fr: 'fr-FR', it: 'it-IT', ro: 'ro-RO', ca: 'ca-ES', gl: 'gl-ES', oc: 'oc',
//     de: 'de-DE', nl: 'nl-NL', af: 'af-ZA', sv: 'sv-SE', no: 'nb-NO',
//     nb: 'nb-NO', nn: 'nn-NO', da: 'da-DK', is: 'is-IS', lb: 'lb', yi: 'yi',
//     ru: 'ru-RU', uk: 'uk-UA', pl: 'pl-PL', cs: 'cs-CZ', sk: 'sk-SK',
//     bg: 'bg-BG', hr: 'hr-HR', sr: 'sr-RS', bs: 'bs-BA', sl: 'sl-SI',
//     mk: 'mk-MK', be: 'be-BY', lt: 'lt-LT', lv: 'lv-LV', et: 'et-EE',
//     fi: 'fi-FI', hu: 'hu-HU', cy: 'cy-GB', ga: 'ga-IE', eu: 'eu-ES',
//     mt: 'mt-MT', sq: 'sq-AL', el: 'el-GR',
//     sw: 'sw-KE', am: 'am-ET', yo: 'yo-NG', ig: 'ig-NG', ha: 'ha-NG',
//     zu: 'zu-ZA', xh: 'xh-ZA', st: 'st-ZA', sn: 'sn-ZW', so: 'so-SO',
//     rw: 'rw-RW', ny: 'ny-MW', mg: 'mg-MG', lg: 'lg-UG', ak: 'ak-GH',
//     ee: 'ee-GH', ti: 'ti-ET', om: 'om-ET',
//     en: 'en-US', 'en-US': 'en-US', 'en-GB': 'en-GB',
//     'en-AU': 'en-AU', 'en-IN': 'en-IN',
//     tr: 'tr-TR', eo: 'eo', la: 'la', fy: 'fy-NL', gd: 'gd-GB',
//     mi: 'mi-NZ', sm: 'sm-WS', to: 'to-TO', haw: 'haw-US',
//     ht: 'ht-HT', hmn: 'hmn',
//   };

//   constructor() {
//     if (typeof window === 'undefined') return;
//     if (typeof window.speechSynthesis === 'undefined') return;

//     this.synth = window.speechSynthesis;
//     this.loadVoices();
//     this.synth.onvoiceschanged = () => this.loadVoices();
//     setTimeout(() => this.loadVoices(), 300);
//     setTimeout(() => this.loadVoices(), 1000);
//     setTimeout(() => this.loadVoices(), 2500);
//     this.observeGoogleTranslate();
//   }

//   private observeGoogleTranslate(): void {
//     if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;
//     const htmlEl = document.documentElement;
//     const initial = htmlEl.getAttribute('lang');
//     if (initial) this.applyLangCode(initial);
//     this.langObserver = new MutationObserver(() => {
//       const lang = htmlEl.getAttribute('lang');
//       if (lang) this.applyLangCode(lang);
//     });
//     this.langObserver.observe(htmlEl, { attributes: true, attributeFilter: ['lang'] });
//   }

//   private applyLangCode(rawLang: string): void {
//     const raw = rawLang.trim();
//     const base = raw.split('-')[0].toLowerCase();
//     const mapped = VoiceManager.LANG_MAP[raw] ?? VoiceManager.LANG_MAP[base] ?? raw;
//     if (mapped !== this.currentLang) {
//       this.currentLang = mapped;
//       this.selectVoicesForCurrentLang();
//     }
//   }

//   private loadVoices(): void {
//     if (!this.synth) return;
//     const voices = this.synth.getVoices();
//     if (!voices.length) return;
//     this.allVoices = voices;
//     this.voicesReady = true;
//     this.selectVoicesForCurrentLang();
//   }

//   private selectVoicesForCurrentLang(): void {
//     if (!this.voicesReady || !this.allVoices.length) return;
//     let matched = this.matchVoices(this.currentLang);
//     if (!matched.length && !this.currentLang.startsWith('en')) {
//       matched = this.matchVoices('en');
//     }
//     this.availableVoices = this.applyPriority(matched);
//     if (!this.availableVoices.length) {
//       this.availableVoices = this.applyPriority(this.allVoices);
//     }
//   }

//   private matchVoices(target: string): SpeechSynthesisVoice[] {
//     const t = target.toLowerCase();
//     const base = t.split('-')[0];
//     let result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(t));
//     if (!result.length && t.includes('-')) {
//       result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(base));
//     }
//     return result;
//   }

//   private applyPriority(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
//     const ms = voices.filter(v => v.name.toLowerCase().includes('microsoft'));
//     if (ms.length) return ms;
//     const goog = voices.filter(v => v.name.toLowerCase().includes('google'));
//     if (goog.length) return goog;
//     return voices;
//   }

//   private pickVoice(): SpeechSynthesisVoice | null {
//     if (!this.availableVoices.length) this.loadVoices();
//     if (!this.availableVoices.length) return null;
//     return this.availableVoices[Math.floor(Math.random() * this.availableVoices.length)];
//   }

//   // 🎵 Music helpers
//   private startMusicIfNeeded(): void {
//     const musicId = musicController.getCurrentMusicId();
//     if (musicId) {
//       bgMusicManager.play(musicId);
//     }
//   }

//   private scheduleMusicStop(delayMs = 500): void {
//     if (this.musicStopTimer) clearTimeout(this.musicStopTimer);
//     this.musicStopTimer = setTimeout(() => {
//       if (this.utteranceCount === 0) {
//         bgMusicManager.stop();
//       }
//       this.musicStopTimer = null;
//     }, delayMs);
//   }

//   // ── Public API ──────────────────────────────────────────────────────────

//   public setLanguage(lang: string): void { this.applyLangCode(lang); }

//   public unlock(): void {
//     if (typeof window === 'undefined') return;
//     this.synth?.resume();
//     this.loadVoices();
//   }

//   public speak(text: string, force = true, withMusic = true): void {
//     if (typeof window === 'undefined') return;
//     if (!this.synth) return;
//     if (!this.voicesReady) this.loadVoices();
//     if (force) this.synth.cancel();

//     // Start background music if requested
//     if (withMusic) {
//       this.startMusicIfNeeded();
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     const voice = this.pickVoice();
//     if (voice) { utterance.voice = voice; utterance.lang = voice.lang; }
//     else { utterance.lang = this.currentLang; }
//     utterance.rate = 1.0;
//     utterance.pitch = 1.0;
//     utterance.volume = 1.0;

//     this.utteranceCount++;

//     utterance.onend = () => {
//       this.utteranceCount--;
//       if (this.utteranceCount === 0) {
//         this.scheduleMusicStop();
//       }
//     };

//     utterance.onerror = () => {
//       this.utteranceCount--;
//       if (this.utteranceCount === 0) {
//         this.scheduleMusicStop();
//       }
//     };

//     this.synth.speak(utterance);
//   }

//   public announceProgress(progress: number): void {
//     const milestones = [10, 25, 50, 75, 90];
//     const crossed = milestones.find(m => progress >= m && this.lastMilestone < m);
//     if (crossed !== undefined) {
//       this.speak(`${crossed}% processing completed.`, true, false); // no music for progress
//       this.lastMilestone = crossed;
//     }
//   }

//   public reset(): void {
//     this.lastMilestone = -1;
//     if (typeof window !== 'undefined') {
//       this.synth?.cancel();
//       bgMusicManager.stop();
//     }
//     this.utteranceCount = 0;
//     if (this.musicStopTimer) {
//       clearTimeout(this.musicStopTimer);
//       this.musicStopTimer = null;
//     }
//   }

//   public destroy(): void {
//     this.langObserver?.disconnect();
//     this.langObserver = null;
//     if (typeof window !== 'undefined') {
//       this.synth?.cancel();
//       bgMusicManager.stop();
//     }
//   }
// }

// // Safe singleton
// export const voiceManager = new VoiceManager();












// // lib/core/VoiceManager.ts
// import { bgMusicManager } from './BackgroundMusicManager';
// import { musicController } from './MusicController';

// export class VoiceManager {
//   private synth: SpeechSynthesis | null = null;
//   private allVoices: SpeechSynthesisVoice[] = [];
//   private availableVoices: SpeechSynthesisVoice[] = [];
//   private lastMilestone = -1;
//   private currentLang = 'en';
//   private langObserver: MutationObserver | null = null;
//   private voicesReady = false;
//   private utteranceCount = 0;
//   private musicStopTimer: ReturnType<typeof setTimeout> | null = null;

//   private static readonly LANG_MAP: Record<string, string> = { /* ... (unchanged) ... */ };

//   constructor() {
//     if (typeof window === 'undefined') return;
//     if (typeof window.speechSynthesis === 'undefined') return;

//     this.synth = window.speechSynthesis;
//     this.loadVoices();
//     this.synth.onvoiceschanged = () => this.loadVoices();
//     setTimeout(() => this.loadVoices(), 300);
//     setTimeout(() => this.loadVoices(), 1000);
//     setTimeout(() => this.loadVoices(), 2500);
//     this.observeGoogleTranslate();
//   }

//   private observeGoogleTranslate(): void {
//     if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;
//     const htmlEl = document.documentElement;
//     const initial = htmlEl.getAttribute('lang');
//     if (initial) this.applyLangCode(initial);
//     this.langObserver = new MutationObserver(() => {
//       const lang = htmlEl.getAttribute('lang');
//       if (lang) this.applyLangCode(lang);
//     });
//     this.langObserver.observe(htmlEl, { attributes: true, attributeFilter: ['lang'] });
//   }

//   private applyLangCode(rawLang: string): void {
//     const raw = rawLang.trim();
//     const base = raw.split('-')[0].toLowerCase();
//     const mapped = VoiceManager.LANG_MAP[raw] ?? VoiceManager.LANG_MAP[base] ?? raw;
//     if (mapped !== this.currentLang) {
//       this.currentLang = mapped;
//       this.selectVoicesForCurrentLang();
//     }
//   }

//   private loadVoices(): void {
//     if (!this.synth) return;
//     const voices = this.synth.getVoices();
//     if (!voices.length) return;
//     this.allVoices = voices;
//     this.voicesReady = true;
//     this.selectVoicesForCurrentLang();
//   }

//   private selectVoicesForCurrentLang(): void {
//     if (!this.voicesReady || !this.allVoices.length) return;
//     let matched = this.matchVoices(this.currentLang);
//     if (!matched.length && !this.currentLang.startsWith('en')) {
//       matched = this.matchVoices('en');
//     }
//     this.availableVoices = this.applyPriority(matched);
//     if (!this.availableVoices.length) {
//       this.availableVoices = this.applyPriority(this.allVoices);
//     }
//   }

//   private matchVoices(target: string): SpeechSynthesisVoice[] {
//     const t = target.toLowerCase();
//     const base = t.split('-')[0];
//     let result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(t));
//     if (!result.length && t.includes('-')) {
//       result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(base));
//     }
//     return result;
//   }

//   private applyPriority(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
//     const ms = voices.filter(v => v.name.toLowerCase().includes('microsoft'));
//     if (ms.length) return ms;
//     const goog = voices.filter(v => v.name.toLowerCase().includes('google'));
//     if (goog.length) return goog;
//     return voices;
//   }

//   private pickVoice(): SpeechSynthesisVoice | null {
//     if (!this.availableVoices.length) this.loadVoices();
//     if (!this.availableVoices.length) return null;
//     return this.availableVoices[Math.floor(Math.random() * this.availableVoices.length)];
//   }

//   private startMusicIfNeeded(): void {
//     const musicId = musicController.getCurrentMusicId();
//     if (musicId) {
//       bgMusicManager.play(musicId);
//     }
//   }

//   private scheduleMusicStop(delayMs = 500): void {
//     if (this.musicStopTimer) clearTimeout(this.musicStopTimer);
//     this.musicStopTimer = setTimeout(() => {
//       if (this.utteranceCount === 0) {
//         bgMusicManager.stop();
//       }
//       this.musicStopTimer = null;
//     }, delayMs);
//   }

//   // 🎵 New: continuous background music (independent of speech)
//   public playBackgroundMusic(videoId: string): void {
//     if (typeof window === 'undefined') return;
//     if (!videoId) return;
//     bgMusicManager.play(videoId);
//   }

//   public stopBackgroundMusic(): void {
//     if (typeof window === 'undefined') return;
//     bgMusicManager.stop();
//   }

  
//   public setLanguage(lang: string): void { this.applyLangCode(lang); }

//   public unlock(): void {
//     if (typeof window === 'undefined') return;
//     this.synth?.resume();
//     this.loadVoices();
//   }

//   public speak(text: string, force = true, withMusic = true): void {
//     if (typeof window === 'undefined') return;
//     if (!this.synth) return;
//     if (!this.voicesReady) this.loadVoices();
//     if (force) this.synth.cancel();

//     if (withMusic) {
//       this.startMusicIfNeeded();
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     const voice = this.pickVoice();
//     if (voice) { utterance.voice = voice; utterance.lang = voice.lang; }
//     else { utterance.lang = this.currentLang; }
//     utterance.rate = 1.0;
//     utterance.pitch = 1.0;
//     utterance.volume = 1.0;

//     this.utteranceCount++;

//     utterance.onend = () => {
//       this.utteranceCount--;
//       if (this.utteranceCount === 0) {
//         this.scheduleMusicStop();
//       }
//     };

//     utterance.onerror = () => {
//       this.utteranceCount--;
//       if (this.utteranceCount === 0) {
//         this.scheduleMusicStop();
//       }
//     };

//     this.synth.speak(utterance);
//   }

//   public announceProgress(progress: number): void {
//     const milestones = [10, 25, 50, 75, 90];
//     const crossed = milestones.find(m => progress >= m && this.lastMilestone < m);
//     if (crossed !== undefined) {
//       this.speak(`${crossed}% processing completed.`, true, false);
//       this.lastMilestone = crossed;
//     }
//   }

//   public reset(): void {
//     this.lastMilestone = -1;
//     if (typeof window !== 'undefined') {
//       this.synth?.cancel();
//       bgMusicManager.stop();
//     }
//     this.utteranceCount = 0;
//     if (this.musicStopTimer) {
//       clearTimeout(this.musicStopTimer);
//       this.musicStopTimer = null;
//     }
//   }

//   public destroy(): void {
//     this.langObserver?.disconnect();
//     this.langObserver = null;
//     if (typeof window !== 'undefined') {
//       this.synth?.cancel();
//       bgMusicManager.stop();
//     }
//   }
// }

// export const voiceManager = new VoiceManager();



// // lib/core/VoiceManager.ts
// import { bgMusicManager } from './BackgroundMusicManager';
// import { musicController } from './MusicController';

// export class VoiceManager {
//   private synth: SpeechSynthesis | null = null;
//   private allVoices: SpeechSynthesisVoice[] = [];
//   private availableVoices: SpeechSynthesisVoice[] = [];
//   private lastMilestone = -1;
//   private currentLang = 'en';
//   private langObserver: MutationObserver | null = null;
//   private voicesReady = false;
//   private utteranceCount = 0;
//   private musicStopTimer: ReturnType<typeof setTimeout> | null = null;

//   private static readonly LANG_MAP: Record<string, string> = { /* ... (unchanged) ... */ };

//   constructor() {
//     if (typeof window === 'undefined') return;
//     if (typeof window.speechSynthesis === 'undefined') return;

//     this.synth = window.speechSynthesis;
//     this.loadVoices();
//     this.synth.onvoiceschanged = () => this.loadVoices();
//     setTimeout(() => this.loadVoices(), 300);
//     setTimeout(() => this.loadVoices(), 1000);
//     setTimeout(() => this.loadVoices(), 2500);
//     this.observeGoogleTranslate();
//   }

//   private observeGoogleTranslate(): void {
//     if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;
//     const htmlEl = document.documentElement;
//     const initial = htmlEl.getAttribute('lang');
//     if (initial) this.applyLangCode(initial);
//     this.langObserver = new MutationObserver(() => {
//       const lang = htmlEl.getAttribute('lang');
//       if (lang) this.applyLangCode(lang);
//     });
//     this.langObserver.observe(htmlEl, { attributes: true, attributeFilter: ['lang'] });
//   }

//   private applyLangCode(rawLang: string): void {
//     const raw = rawLang.trim();
//     const base = raw.split('-')[0].toLowerCase();
//     const mapped = VoiceManager.LANG_MAP[raw] ?? VoiceManager.LANG_MAP[base] ?? raw;
//     if (mapped !== this.currentLang) {
//       this.currentLang = mapped;
//       this.selectVoicesForCurrentLang();
//     }
//   }

//   private loadVoices(): void {
//     if (!this.synth) return;
//     const voices = this.synth.getVoices();
//     if (!voices.length) return;
//     this.allVoices = voices;
//     this.voicesReady = true;
//     this.selectVoicesForCurrentLang();
//   }

//   private selectVoicesForCurrentLang(): void {
//     if (!this.voicesReady || !this.allVoices.length) return;
//     let matched = this.matchVoices(this.currentLang);
//     if (!matched.length && !this.currentLang.startsWith('en')) {
//       matched = this.matchVoices('en');
//     }
//     this.availableVoices = this.applyPriority(matched);
//     if (!this.availableVoices.length) {
//       this.availableVoices = this.applyPriority(this.allVoices);
//     }
//   }

//   private matchVoices(target: string): SpeechSynthesisVoice[] {
//     const t = target.toLowerCase();
//     const base = t.split('-')[0];
//     let result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(t));
//     if (!result.length && t.includes('-')) {
//       result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(base));
//     }
//     return result;
//   }

//   private applyPriority(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
//     const ms = voices.filter(v => v.name.toLowerCase().includes('microsoft'));
//     if (ms.length) return ms;
//     const goog = voices.filter(v => v.name.toLowerCase().includes('google'));
//     if (goog.length) return goog;
//     return voices;
//   }

//   private pickVoice(): SpeechSynthesisVoice | null {
//     if (!this.availableVoices.length) this.loadVoices();
//     if (!this.availableVoices.length) return null;
//     return this.availableVoices[Math.floor(Math.random() * this.availableVoices.length)];
//   }

//   private startMusicIfNeeded(): void {
//     const musicId = musicController.getCurrentMusicId();
//     if (musicId) {
//       bgMusicManager.play(musicId);
//     }
//   }

//   private scheduleMusicStop(delayMs = 500): void {
//     if (this.musicStopTimer) clearTimeout(this.musicStopTimer);
//     this.musicStopTimer = setTimeout(() => {
//       if (this.utteranceCount === 0) {
//         bgMusicManager.stop();
//       }
//       this.musicStopTimer = null;
//     }, delayMs);
//   }

//   // 🆕 Cancel speech only (leaves background music untouched)
//   public cancelSpeech(): void {
//     if (typeof window === 'undefined') return;
//     if (this.synth) {
//       this.synth.cancel();
//     }
//     this.utteranceCount = 0;
//     if (this.musicStopTimer) {
//       clearTimeout(this.musicStopTimer);
//       this.musicStopTimer = null;
//     }
//   }

//   public playBackgroundMusic(videoId: string): void {
//     if (typeof window === 'undefined') return;
//     if (!videoId) return;
//     bgMusicManager.play(videoId);
//   }

//   public stopBackgroundMusic(): void {
//     if (typeof window === 'undefined') return;
//     bgMusicManager.stop();
//   }

//   public setLanguage(lang: string): void { this.applyLangCode(lang); }

//   public unlock(): void {
//     if (typeof window === 'undefined') return;
//     this.synth?.resume();
//     this.loadVoices();
//   }

//   public speak(text: string, force = true, withMusic = true): void {
//     if (typeof window === 'undefined') return;
//     if (!this.synth) return;
//     if (!this.voicesReady) this.loadVoices();
//     if (force) this.synth.cancel();

//     if (withMusic) {
//       this.startMusicIfNeeded();
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     const voice = this.pickVoice();
//     if (voice) { utterance.voice = voice; utterance.lang = voice.lang; }
//     else { utterance.lang = this.currentLang; }
//     utterance.rate = 1.0;
//     utterance.pitch = 1.0;
//     utterance.volume = 1.0;

//     this.utteranceCount++;

//     utterance.onend = () => {
//       this.utteranceCount--;
//       if (this.utteranceCount === 0) {
//         this.scheduleMusicStop();
//       }
//     };

//     utterance.onerror = () => {
//       this.utteranceCount--;
//       if (this.utteranceCount === 0) {
//         this.scheduleMusicStop();
//       }
//     };

//     this.synth.speak(utterance);
//   }

//   public announceProgress(progress: number): void {
//     const milestones = [10, 25, 50, 75, 90];
//     const crossed = milestones.find(m => progress >= m && this.lastMilestone < m);
//     if (crossed !== undefined) {
//       this.speak(`${crossed}% processing completed.`, true, false);
//       this.lastMilestone = crossed;
//     }
//   }

//   public reset(): void {
//     this.lastMilestone = -1;
//     if (typeof window !== 'undefined') {
//       this.synth?.cancel();
//       bgMusicManager.stop();
//     }
//     this.utteranceCount = 0;
//     if (this.musicStopTimer) {
//       clearTimeout(this.musicStopTimer);
//       this.musicStopTimer = null;
//     }
//   }

//   public destroy(): void {
//     this.langObserver?.disconnect();
//     this.langObserver = null;
//     if (typeof window !== 'undefined') {
//       this.synth?.cancel();
//       bgMusicManager.stop();
//     }
//   }
// }

// export const voiceManager = new VoiceManager();


// lib/core/VoiceManager.ts
import { bgMusicManager } from './BackgroundMusicManager';
import { musicController } from './MusicController';

export class VoiceManager {
  private synth: SpeechSynthesis | null = null;
  private allVoices: SpeechSynthesisVoice[] = [];
  private availableVoices: SpeechSynthesisVoice[] = [];
  private lastMilestone = -1;
  private currentLang = 'en';
  private langObserver: MutationObserver | null = null;
  private voicesReady = false;
  private utteranceCount = 0;
  private musicStopTimer: ReturnType<typeof setTimeout> | null = null;

  private static readonly LANG_MAP: Record<string, string> = { /* ... (unchanged) ... */ };

  constructor() {
    if (typeof window === 'undefined') return;
    if (typeof window.speechSynthesis === 'undefined') return;

    this.synth = window.speechSynthesis;
    this.loadVoices();
    this.synth.onvoiceschanged = () => this.loadVoices();
    setTimeout(() => this.loadVoices(), 300);
    setTimeout(() => this.loadVoices(), 1000);
    setTimeout(() => this.loadVoices(), 2500);
    this.observeGoogleTranslate();
  }

  private observeGoogleTranslate(): void {
    if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;
    const htmlEl = document.documentElement;
    const initial = htmlEl.getAttribute('lang');
    if (initial) this.applyLangCode(initial);
    this.langObserver = new MutationObserver(() => {
      const lang = htmlEl.getAttribute('lang');
      if (lang) this.applyLangCode(lang);
    });
    this.langObserver.observe(htmlEl, { attributes: true, attributeFilter: ['lang'] });
  }

  private applyLangCode(rawLang: string): void {
    const raw = rawLang.trim();
    const base = raw.split('-')[0].toLowerCase();
    const mapped = VoiceManager.LANG_MAP[raw] ?? VoiceManager.LANG_MAP[base] ?? raw;
    if (mapped !== this.currentLang) {
      this.currentLang = mapped;
      this.selectVoicesForCurrentLang();
    }
  }

  private loadVoices(): void {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices.length) return;
    this.allVoices = voices;
    this.voicesReady = true;
    this.selectVoicesForCurrentLang();
  }

  private selectVoicesForCurrentLang(): void {
    if (!this.voicesReady || !this.allVoices.length) return;
    let matched = this.matchVoices(this.currentLang);
    if (!matched.length && !this.currentLang.startsWith('en')) {
      matched = this.matchVoices('en');
    }
    this.availableVoices = this.applyPriority(matched);
    if (!this.availableVoices.length) {
      this.availableVoices = this.applyPriority(this.allVoices);
    }
  }

  private matchVoices(target: string): SpeechSynthesisVoice[] {
    const t = target.toLowerCase();
    const base = t.split('-')[0];
    let result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(t));
    if (!result.length && t.includes('-')) {
      result = this.allVoices.filter(v => v.lang.toLowerCase().startsWith(base));
    }
    return result;
  }

  private applyPriority(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
    const ms = voices.filter(v => v.name.toLowerCase().includes('microsoft'));
    if (ms.length) return ms;
    const goog = voices.filter(v => v.name.toLowerCase().includes('google'));
    if (goog.length) return goog;
    return voices;
  }

  private pickVoice(): SpeechSynthesisVoice | null {
    if (!this.availableVoices.length) this.loadVoices();
    if (!this.availableVoices.length) return null;
    return this.availableVoices[Math.floor(Math.random() * this.availableVoices.length)];
  }

  private startMusicIfNeeded(): void {
    const musicId = musicController.getCurrentMusicId();
    if (musicId) {
      bgMusicManager.play(musicId);
    }
  }

  private scheduleMusicStop(delayMs = 500): void {
    if (this.musicStopTimer) clearTimeout(this.musicStopTimer);
    this.musicStopTimer = setTimeout(() => {
      if (this.utteranceCount === 0) {
        bgMusicManager.stop();
      }
      this.musicStopTimer = null;
    }, delayMs);
  }

  // Cancel speech only (leaves background music untouched)
  public cancelSpeech(): void {
    if (typeof window === 'undefined') return;
    if (this.synth) {
      this.synth.cancel();
    }
    this.utteranceCount = 0;
    if (this.musicStopTimer) {
      clearTimeout(this.musicStopTimer);
      this.musicStopTimer = null;
    }
  }

  // 🆕 Mute/unmute background music
  public setMusicMuted(muted: boolean): void {
    if (typeof window === 'undefined') return;
    bgMusicManager.setMuted(muted);
  }

  public playBackgroundMusic(videoId: string): void {
    if (typeof window === 'undefined') return;
    if (!videoId) return;
    bgMusicManager.play(videoId);
  }

  public stopBackgroundMusic(): void {
    if (typeof window === 'undefined') return;
    bgMusicManager.stop();
  }

  public setLanguage(lang: string): void { this.applyLangCode(lang); }

  public unlock(): void {
    if (typeof window === 'undefined') return;
    this.synth?.resume();
    this.loadVoices();
  }

  public speak(text: string, force = true, withMusic = true): void {
    if (typeof window === 'undefined') return;
    if (!this.synth) return;
    if (!this.voicesReady) this.loadVoices();
    if (force) this.synth.cancel();

    if (withMusic) {
      this.startMusicIfNeeded();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.pickVoice();
    if (voice) { utterance.voice = voice; utterance.lang = voice.lang; }
    else { utterance.lang = this.currentLang; }
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    this.utteranceCount++;

    utterance.onend = () => {
      this.utteranceCount--;
      if (this.utteranceCount === 0) {
        this.scheduleMusicStop();
      }
    };

    utterance.onerror = () => {
      this.utteranceCount--;
      if (this.utteranceCount === 0) {
        this.scheduleMusicStop();
      }
    };

    this.synth.speak(utterance);
  }

  public announceProgress(progress: number): void {
    const milestones = [10, 25, 50, 75, 90];
    const crossed = milestones.find(m => progress >= m && this.lastMilestone < m);
    if (crossed !== undefined) {
      this.speak(`${crossed}% processing completed.`, true, false);
      this.lastMilestone = crossed;
    }
  }

  public reset(): void {
    this.lastMilestone = -1;
    if (typeof window !== 'undefined') {
      this.synth?.cancel();
      bgMusicManager.stop();
    }
    this.utteranceCount = 0;
    if (this.musicStopTimer) {
      clearTimeout(this.musicStopTimer);
      this.musicStopTimer = null;
    }
  }

  public destroy(): void {
    this.langObserver?.disconnect();
    this.langObserver = null;
    if (typeof window !== 'undefined') {
      this.synth?.cancel();
      bgMusicManager.stop();
    }
  }
}

export const voiceManager = new VoiceManager();










































