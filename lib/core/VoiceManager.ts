/**
 * VoiceManager – Handles speech synthesis with language‑specific voice selection.
 * Language must be set externally via setLanguage() (e.g., from _app.tsx).
 * Includes logging for debugging (remove in production).
 */
class VoiceManager {
  private voices: SpeechSynthesisVoice[] = [];
  private currentLang: string = "en";
  private initialized = false;
  private unlocked = false;
  private voicesLoaded = false;
  private pendingSpeak: { text: string; queue: boolean } | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init() {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        this.voices = v;
        this.initialized = true;
        this.voicesLoaded = true;
        console.log('Available voices:', v.map(voice => `${voice.name} (${voice.lang})`));
        if (this.pendingSpeak) {
          this.speak(this.pendingSpeak.text, this.pendingSpeak.queue);
          this.pendingSpeak = null;
        }
      }
    };

    loadVoices();

    if (typeof window !== "undefined") {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  public unlock() {
    if (this.unlocked) return;
    if (typeof window === "undefined") return;

    try {
      const utter = new SpeechSynthesisUtterance("");
      utter.volume = 0;
      window.speechSynthesis.speak(utter);
      this.unlocked = true;
      console.log('Speech synthesis unlocked');
    } catch (e) {
      console.warn("Failed to unlock speech synthesis", e);
    }
  }

  public setLanguage(lang: string) {
    if (!lang) return;
    const normalized = lang.split('-')[0].toLowerCase().trim();
    console.log(`setLanguage called with: ${lang} → normalized: ${normalized}`);
    this.currentLang = normalized;
  }

  private findVoice(predicate: (v: SpeechSynthesisVoice) => boolean): SpeechSynthesisVoice | undefined {
    return this.voices.find(predicate);
  }

  private getMicrosoftVoice(lang: string) {
    return this.findVoice(v =>
      v.name.toLowerCase().includes("microsoft") &&
      v.lang.toLowerCase().startsWith(lang)
    );
  }

  private getGoogleVoice(lang: string) {
    return this.findVoice(v =>
      v.name.toLowerCase().includes("google") &&
      v.lang.toLowerCase().startsWith(lang)
    );
  }

  private getAnyMatchingVoice(lang: string) {
    return this.findVoice(v =>
      v.lang.toLowerCase().startsWith(lang)
    );
  }

  /** Finds any voice whose name contains 'brian' (case‑insensitive), regardless of language. */
  private getBrianVoice() {
    return this.findVoice(v => v.name.toLowerCase().includes("brian"));
  }

  private getMicrosoftEnglishVoice() {
    return this.findVoice(v =>
      v.name.toLowerCase().includes("microsoft") &&
      v.lang.toLowerCase().startsWith("en")
    );
  }

  private getAnyEnglishVoice() {
    return this.findVoice(v => v.lang.toLowerCase().startsWith("en"));
  }

  private resolveVoice(): SpeechSynthesisVoice | null {
    if (!this.voicesLoaded) {
      console.warn('Voices not loaded yet');
      return null;
    }

    const baseLang = this.currentLang;
    console.log(`Resolving voice for language: ${baseLang}`);

    // 1. Try Microsoft voice for the target language
    let voice = this.getMicrosoftVoice(baseLang);
    if (voice) {
      console.log(`Found Microsoft voice: ${voice.name} (${voice.lang})`);
      return voice;
    }

    // 2. Try Google voice for the target language
    voice = this.getGoogleVoice(baseLang);
    if (voice) {
      console.log(`Found Google voice: ${voice.name} (${voice.lang})`);
      return voice;
    }

    // 3. Try any voice that matches the target language
    voice = this.getAnyMatchingVoice(baseLang);
    if (voice) {
      console.log(`Found any matching voice: ${voice.name} (${voice.lang})`);
      return voice;
    }

    // --- Fallback block ---
    console.warn(`No voice found for ${baseLang}, trying fallbacks`);

    // 4. Try to find any voice named "Brian" (multi‑language capable)
    voice = this.getBrianVoice();
    if (voice) {
      console.log(`Fallback: using Brian voice: ${voice.name} (${voice.lang})`);
      return voice;
    }

    // 5. Try Microsoft English voice
    voice = this.getMicrosoftEnglishVoice();
    if (voice) {
      console.log(`Fallback: using Microsoft English voice: ${voice.name} (${voice.lang})`);
      return voice;
    }

    // 6. Try any English voice
    voice = this.getAnyEnglishVoice();
    if (voice) {
      console.log(`Fallback: using any English voice: ${voice.name} (${voice.lang})`);
      return voice;
    }

    console.error('No voice found at all!');
    return null;
  }

  public speak(text: string, queue: boolean = true) {
    if (!text || typeof window === "undefined") return;

    if (!this.voicesLoaded) {
      console.log('Voices not loaded, storing pending speak request');
      if (queue) {
        this.pendingSpeak = { text, queue };
      }
      return;
    }

    if (queue) {
      window.speechSynthesis.cancel();
    }

    const utter = new SpeechSynthesisUtterance(text);
    const voice = this.resolveVoice();

    if (voice) {
      utter.voice = voice;
      console.log(`Selected voice: ${voice.name} (${voice.lang})`);
    } else {
      console.warn(`No voice found, using browser default`);
    }

    // Always set the utterance language to the currently selected language
    // (the one coming from Google Translate). This ensures that even when
    // a fallback voice is used, the synthesizer knows the correct language
    // of the text.
    utter.lang = this.currentLang;
    console.log(`Utterance language set to: ${this.currentLang}`);

    utter.rate = 1;
    utter.pitch = 1;
    utter.volume = 1;

    window.speechSynthesis.speak(utter);
  }

  public stop() {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }
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