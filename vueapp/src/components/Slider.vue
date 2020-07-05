<template>
  <input
    :value="initialVolume"
    class="slider"
    type="range"
    min="0"
    max="1"
    step="0.01"
    @input="onInput"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Slider extends Vue {
  @Prop({ default: 0 })
  private initialVolume: number;

  private onInput({ target: { value } }) {
    this.$emit('change', Number.parseFloat(value));
  }
}
</script>

<style lang="scss" scoped>
@import '../common/Colors.scss';
@import '../common/Styles.scss';

@mixin thumb {
  border: 2px solid $gray;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background-color: $red;
  cursor: pointer;
}

@mixin track {
  width: 100%;
  height: 28px;
  cursor: pointer;
  background: $light-red;
  border-radius: 20px;
  transition: background 0.2s;

  &:hover {
    background: lighten($light-red, 3);
  }
}

.slider {
  background: transparent;
  -webkit-appearance: none;
  /* Special styling for WebKit/Blink */
  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    @include thumb;
  }

  /* All the same stuff for Firefox */
  &::-moz-range-thumb {
    @include thumb;
  }

  &::-ms-thumb {
    @include thumb;
  }

  &::-webkit-slider-runnable-track {
    @include track;
  }

  &::-moz-range-track {
    @include track;
  }

  &::-ms-track {
    @include track;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
}
</style>
