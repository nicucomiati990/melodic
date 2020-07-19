<template>
  <div id="app">
    <Header />
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
import Header from './components/Header.vue';
import PlayList from './components/PlayList.vue';
import PlayBar from './components/PlayBar.vue';
import PlayBarButton from './components/PlayBarButton.vue';
import Equalizer from './components/Equalizer.vue';
import soundEngine from './sound/SoundEngine';
import { SongState } from './types/SongState';
import * as api from './api/api';

Vue.component('play-bar-button', PlayBarButton);

@Component({
  components: { PlayList, PlayBar, Equalizer, Header }
})
export default class App extends Vue {
  async created() {
    this.$store.dispatch('fetchSongs');
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
@import './common/Styles.scss';

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
  flex: 1;
  min-height: 0;

  @include small-screen {
    flex-direction: column;
  }
}
</style>
