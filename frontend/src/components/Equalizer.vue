<template>
  <div class="container">
    <canvas class="equalizer"></canvas>
  </div>
</template>
\
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import equalizer from '../sound/Equalizer';

@Component
export default class Equalizer extends Vue {
  public mounted() {
    console.log('eq');
    equalizer.init();
  }
}
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
  width: calc(100vw - 300px);

  .equalizer {
    height: 100%;
    width: 100%;
  }
}
</style>