<template>
  <button
    class="button"
    v-bind:style="{ width: size + 'px', height: size + 'px' }"
    @click="$emit('click')"
  >
    <font-awesome-icon v-bind:icon="icon" />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class PlayBarButton extends Vue {
  @Prop({ default: 'play' })
  icon: string;

  @Prop({ default: 60 })
  size: number;
}
</script>

<style lang="scss" scoped>
@import '../common/Colors.scss';

$button-size: 60px;
$button-color: $red;

.button {
  background-color: $gray;
  border: 2px solid $red;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: background-color 0.1s;

  &:hover {
    background-color: $button-color;
  }

  &:focus {
    outline: none;
  }
}
</style>
