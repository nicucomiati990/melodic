<template>
  <div id="app">
    <section class="play-section">
      <PlayList />
      <Equalizer />
    </section>
    <PlayBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Song } from './types/Song';
import PlayList from './components/PlayList.vue';
import PlayBar from './components/PlayBar.vue';
import PlayBarButton from './components/PlayBarButton.vue';
import Equalizer from './components/Equalizer.vue';
import soundEngine from './sound/SoundEngine';
import { SongState } from './types/SongState';
import * as api from './api/api';

Vue.component('play-bar-button', PlayBarButton);

@Component({
  components: { PlayList, PlayBar, Equalizer }
})
export default class App extends Vue {
  private svg;

  async created() {
    this.$store.dispatch('fetchSongs');
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

* {
  box-sizing: border-box;
}

html,
body {
  padding: 0;
  margin: 0;
}

.play-section {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
</style>
