// lib/core/MusicController.ts
class MusicController {
  private currentId: string | null = null;

  public setCurrentMusicId(id: string | null): void {
    this.currentId = id;
  }

  public getCurrentMusicId(): string | null {
    return this.currentId;
  }
}

export const musicController = new MusicController();