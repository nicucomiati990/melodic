<template>
  <header class="header">
    <h1>Melodic</h1>
    <div class="credits">
      <div class="made-by">made by Nicu Comiati</div>
      <a href="https://github.com/nicucomiati990/melodic" target="_blank">See it on GitHub</a>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
@import '../common/Colors.scss';
@import '../common/Styles.scss';

.header {
  background-color: $gray;
  color: white;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 70px;

  h1 {
    font-family: 'Permanent Marker', cursive;
  }

  .credits {
    display: flex;
    flex-direction: column;

    .made-by {
      color: $light-red;
    }

    a {
      color: $light-red;
      text-align: right;

      &:hover,
      &:visited:hover {
        color: darken($red, 20);
      }

      &:visited {
        color: $red;
      }
    }
  }
}
</style>