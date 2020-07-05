import { Song } from '@/types/Song';

export function getSongIndex(songs: Song[], songId: number) {
  for (let index = 0; index < songs.length; index++) {
    if (songs[index].id === songId) {
      return index;
    }
  }

  return -1;
}
