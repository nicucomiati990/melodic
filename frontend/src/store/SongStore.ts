import Vue from 'vue';
import Vuex, { StoreOptions, ActionContext } from 'vuex';
import { Song } from '@/types/Song';
import { SongState } from '@/types/SongState';
import soundEngine from '@/sound/SoundEngine';
import * as api from '../api/api';
import * as utils from './StoreUtils';

Vue.use(Vuex);

const store: StoreOptions<SongState> = {
  state: {
    songId: 0,
    songs: [],
    isPlaying: false,
  } as SongState,
  getters: {
    currentSong(state: SongState) {
      const currentSong = state.songs.find((song) => song.id === state.songId);
      return currentSong;
    },
  },
  mutations: {
    songs(state: SongState, songs: Song[]) {
      state.songs = songs;
    },
    isPlaying(state: SongState, isPlaying: boolean) {
      state.isPlaying = isPlaying;
    },
    songId(state: SongState, songId: number) {
      state.songId = songId;
    },
  },
  actions: {
    async fetchSongs(context: ActionContext<SongState, SongState>) {
      const songs = await api.getSongs();
      context.commit('songs', songs);
      console.log(songs);
    },
    async playAudio(
      context: ActionContext<SongState, SongState>,
      songId: number
    ) {
      console.log('playing', songId);
      await soundEngine.fetchSong(songId);
      context.dispatch('togglePlayPause', true);
    },
    togglePlayPause(
      context: ActionContext<SongState, SongState>,
      isPlaying: boolean
    ) {
      console.log('toggle', isPlaying);
      if (isPlaying) {
        soundEngine.play();
      } else {
        soundEngine.pause();
      }

      context.commit('isPlaying', isPlaying);
    },
    prevSong(context: ActionContext<SongState, SongState>) {
      const songIndex = utils.getSongIndex(
        context.state.songs,
        context.state.songId
      );
      if (songIndex <= 0) {
        return;
      }

      const targetSongId = context.state.songs[songIndex - 1].id;

      context.commit('songId', targetSongId);
      context.dispatch('playAudio', targetSongId);
    },
    nextSong(context: ActionContext<SongState, SongState>) {
      const songIndex = utils.getSongIndex(
        context.state.songs,
        context.state.songId
      );
      if (songIndex < 0 || songIndex >= context.state.songs.length - 1) {
        return;
      }

      const targetSongId = context.state.songs[songIndex + 1].id;

      context.commit('songId', targetSongId);
      context.dispatch('playAudio', targetSongId);
    },
  },
};

export default new Vuex.Store<SongState>(store);
