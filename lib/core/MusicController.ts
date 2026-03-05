// lib/core/MusicController.ts
class MusicController {
  private currentId: string | null = null;
  setCurrentMusicId(id: string | null) { this.currentId = id; }
  getCurrentMusicId(): string | null { return this.currentId; }
}
export const musicController = new MusicController();
