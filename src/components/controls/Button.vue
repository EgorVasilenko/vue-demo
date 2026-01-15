<template>
  <button :disabled="disabled" @click="onClick" :style="style">
    <slot name="label"></slot>
  </button>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

defineProps<{
  onClick: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}>();
</script>

<style scoped lang="scss">
@use '../../assets/variables.scss' as variables;

button {
  padding: 0.5rem 2rem;
  border: none;
  border-radius: calc(variables.$inputsRadius / 2);
  background-color: variables.$buttonsBackground;
  color: variables.$buttonsColor;
  font-size: variables.$fontSizeButton;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
