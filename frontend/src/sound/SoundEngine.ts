import { Howler, Howl } from 'howler';
import * as api from '../api/api';

export class SoundEngine {
  public song?: Howl;

  constructor() {
    this.setVolume(0.2);
  }

  public canPlay = () => {
    return this.song && this.song?.state() === 'loaded';
  };

  public fetchSong = (songId?: number) => {
    if (!songId) return null;

    this.stopAll();

    return new Promise((resolve, reject) => {
      this.song = new Howl({
        src: api.songUrl(songId),
        format: ['mp3'],
        onload: resolve,
        onloaderror: reject,
      });
    });
  };

  public play = () => {
    console.log('play');
    if (this.song) {
      this.song.play();
    }
  };

  public pause = () => {
    console.log('pause');
    if (this.song) {
      this.song.pause();
    }
  };

  private stopAll() {
    if (this.song) {
      this.song.stop();
    }
  }

  public setVolume(volume: number) {
    Howler.volume(volume);
  }

  public getVolume() {
    return Howler.volume;
  }
}

const soundEngine = new SoundEngine();
export default soundEngine;
