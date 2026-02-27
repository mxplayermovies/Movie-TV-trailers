// /**
//  * VoiceManager – Handles speech synthesis with language‑specific voice selection.
//  * Language must be set externally via setLanguage() (e.g., from _app.tsx).
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
//         // Process any pending speak request
//         if (this.pendingSpeak) {
//           this.speak(this.pendingSpeak.text, this.pendingSpeak.queue);
//           this.pendingSpeak = null;
//         }
//       }
//     };

//     loadVoices();

//     // Some browsers need the voiceschanged event
//     if (typeof window !== "undefined") {
//       window.speechSynthesis.onvoiceschanged = loadVoices;
//     }
//   }

//   /**
//    * Unlock speech synthesis on mobile (required by some browsers).
//    * Call once early, e.g., in _app.tsx.
//    */
//   public unlock() {
//     if (this.unlocked) return;
//     if (typeof window === "undefined") return;

//     try {
//       const utter = new SpeechSynthesisUtterance("");
//       utter.volume = 0;
//       window.speechSynthesis.speak(utter);
//       this.unlocked = true;
//     } catch (e) {
//       console.warn("Failed to unlock speech synthesis", e);
//     }
//   }

//   /**
//    * Set the current language (e.g., 'hi', 'es', 'en').
//    * Called when Google Translate language changes.
//    */
//   public setLanguage(lang: string) {
//     if (!lang) return;
//     // Normalize: take first part before dash, lowercase, trim
//     const normalized = lang.split('-')[0].toLowerCase().trim();
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

//   private getBrianVoice() {
//     // Prefer Brian (Microsoft) for English fallback
//     return this.findVoice(v =>
//       v.name.toLowerCase().includes("brian") &&
//       v.lang.toLowerCase().startsWith("en")
//     );
//   }

//   private resolveVoice(): SpeechSynthesisVoice | null {
//     if (!this.voicesLoaded) return null;

//     const baseLang = this.currentLang;

//     // 1️⃣ Microsoft Edge voice for the target language
//     let voice = this.getMicrosoftVoice(baseLang);
//     if (voice) return voice;

//     // 2️⃣ Google voice for the target language
//     voice = this.getGoogleVoice(baseLang);
//     if (voice) return voice;

//     // 3️⃣ Any system voice for the target language
//     voice = this.getAnyMatchingVoice(baseLang);
//     if (voice) return voice;

//     // 4️⃣ Fallback to English: first try Brian (if exists)
//     voice = this.getBrianVoice();
//     if (voice) return voice;

//     // 5️⃣ Fallback to any Microsoft English voice
//     voice = this.getMicrosoftVoice("en");
//     if (voice) return voice;

//     // 6️⃣ Absolute fallback: any English voice
//     voice = this.getAnyMatchingVoice("en");
//     return voice || null;
//   }

//   /**
//    * Speak the given text.
//    * @param text – The text to speak.
//    * @param queue – If true (default), cancels any ongoing speech before speaking.
//    */
//   public speak(text: string, queue: boolean = true) {
//     if (!text || typeof window === "undefined") return;

//     if (!this.voicesLoaded) {
//       // Store the request if voices not yet loaded
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
//       utter.lang = voice.lang;
//     } else {
//       utter.lang = this.currentLang;
//     }

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

// // Export a singleton instance
// export const voiceManager = new VoiceManager();







































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

//   private getBrianVoice() {
//     return this.findVoice(v =>
//       v.name.toLowerCase().includes("brian") &&
//       v.lang.toLowerCase().startsWith("en")
//     );
//   }

//   private resolveVoice(): SpeechSynthesisVoice | null {
//     if (!this.voicesLoaded) {
//       console.warn('Voices not loaded yet');
//       return null;
//     }

//     const baseLang = this.currentLang;
//     console.log(`Resolving voice for language: ${baseLang}`);

//     let voice = this.getMicrosoftVoice(baseLang);
//     if (voice) {
//       console.log(`Found Microsoft voice: ${voice.name} (${voice.lang})`);
//       return voice;
//     }

//     voice = this.getGoogleVoice(baseLang);
//     if (voice) {
//       console.log(`Found Google voice: ${voice.name} (${voice.lang})`);
//       return voice;
//     }

//     voice = this.getAnyMatchingVoice(baseLang);
//     if (voice) {
//       console.log(`Found any matching voice: ${voice.name} (${voice.lang})`);
//       return voice;
//     }

//     console.warn(`No voice found for ${baseLang}, falling back to English`);
//     voice = this.getBrianVoice();
//     if (voice) {
//       console.log(`Found Brian (English): ${voice.name} (${voice.lang})`);
//       return voice;
//     }

//     voice = this.getMicrosoftVoice("en");
//     if (voice) {
//       console.log(`Found Microsoft English: ${voice.name} (${voice.lang})`);
//       return voice;
//     }

//     voice = this.getAnyMatchingVoice("en");
//     if (voice) {
//       console.log(`Found any English voice: ${voice.name} (${voice.lang})`);
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
//       utter.lang = voice.lang;
//       console.log(`Speaking with voice: ${voice.name} (${voice.lang})`);
//     } else {
//       utter.lang = this.currentLang;
//       console.warn(`No voice found, using language: ${this.currentLang}`);
//     }

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