<template>
  <button
    :class="[
      'primary-button',
      condition === BUTTON_CONDITION.NOT_ENABLED ? 'notEnabled' : '',
      condition === BUTTON_CONDITION.DISABLED ? 'disabled' : '',
    ]"
    :disabled="condition !== BUTTON_CONDITION.ENABLED"
    @click="$emit('on-click')"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
export enum BUTTON_CONDITION {
  ENABLED = 'enabled',
  NOT_ENABLED = 'notEnabled',
  DISABLED = 'disabled',
}
</script>

<script setup lang="ts">
import { PropTyle } from 'vue';

const props = defineProps({
  text: { type: String, required: true },
  condition: { type: String as PropType<BUTTON_CONDITION>, required: true },
});
</script>

<style scoped>
.primary-button {
  @apply h-24 rounded-3xl mx-10 bg-purple-500 hover:bg-purple-600 border border-gray-800 text-4xl text-gray-100 font-medium;
}
.primary-button.notEnabled {
  @apply bg-purple-300 text-gray-100 border-none cursor-not-allowed;
}
.primary-button.disabled {
  @apply bg-gray-300 text-gray-800 border-none cursor-not-allowed;
}
</style>
