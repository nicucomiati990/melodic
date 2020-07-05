<template>
  <div class="play-bar">
    <div class="separator" />
    <div class="buttons">
      <div class="song-name">{{$store.getters.currentSong && $store.getters.currentSong.name}}</div>
      <div>
        <play-bar-button v-on:click="prevSong" icon="fast-backward" size="40" />
        <play-bar-button v-on:click="togglePlaying" :icon="playText" />
        <play-bar-button v-on:click="nextSong" icon="fast-forward" size="40" />
      </div>
      <Slider class="slider" :initialVolume="initialVolume" @change="onVolumeChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Slider from './Slider.vue';
import soundEngine from '../sound/SoundEngine';

@Component({ components: { Slider } })
export default class PlayBar extends Vue {
  get isPlaying() {
    return this.$store.state.isPlaying;
  }

  get playText() {
    return this.isPlaying ? 'pause' : 'play';
  }

  get initialVolume() {
    return soundEngine.getVolume();
  }

  private togglePlaying() {
    console.log('toggle', this.isPlaying);

    this.$store.dispatch('togglePlayPause', !this.isPlaying);
  }

  private onVolumeChange(volume: number) {
    soundEngine.setVolume(volume);
  }

  private prevSong() {
    this.$store.dispatch('prevSong');
  }

  private nextSong() {
    this.$store.dispatch('nextSong');
  }
}
</script>

<style lang="scss" scoped>
@import '../common/Colors.scss';
@import '../common/Styles.scss';

$side-content-width: 200px;

.play-bar {
  height: 80px;
  background-color: $gray;
  display: flex;
  flex-direction: column;
  position: sticky;
  bottom: 0;
  width: 100%;

  .separator {
    height: 4px;
    width: 100%;
    background: $gradient-bg;
  }

  .buttons {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .song-name {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: white;
    }

    .slider,
    .song-name {
      width: $side-content-width;
      padding: 0 10px;
    }
  }
}
</style>
