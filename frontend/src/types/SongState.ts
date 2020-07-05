import { Song } from './Song';

export interface SongState {
  songId: number;
  songs: Song[];
  isPlaying: boolean;
}
