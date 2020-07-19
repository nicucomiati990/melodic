<template>
  <div class="songs">
    <div
      :key="song.id"
      v-for="song in $store.state.songs"
      :class="getPlaylistItemClass(song.id)"
      @click="() => playSong(song.id)"
    >
      <font-awesome-icon class="play-icon" v-if="isPlaying(song.id)" :icon="['fas', 'volume-up']" />
      {{song.name}} - {{song.artist}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Song } from '../types/Song';

@Component
export default class PlayList extends Vue {
  private playSong(songId: number) {
    this.$store.commit('songId', songId);
    this.$store.dispatch('playAudio', songId);
  }

  private getPlaylistItemClass(songId: number) {
    return this.isPlaying(songId) ? 'playing' : '';
  }

  private isPlaying = (songId: number) => songId === this.$store.state.songId;
}
</script>

<style scoped lang="scss">
@import '../common/Colors.scss';
@import '../common/Styles.scss';

.songs {
  background-color: $gray;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  min-height: 0;

  @include small-screen {
    width: 100%;
  }

  & > div {
    cursor: pointer;
    color: white;
    width: 100%;
    display: flex;
    align-items: center;
    text-align: left;
    padding: 15px;

    .play-icon {
      margin-right: 20px;
    }

    &.playing {
      background: $gradient-bg;
    }

    &:hover {
      background-color: $light-red;
    }
  }
}
</style>
