<template>
  <select
    v-model="selected"
    class="h-10 rounded-md border border-gray-800 text-xl text-gray-800 px-4"
    @change="handleChange"
  >
    <option value="" disabled hidden>
      {{ placeholder }}
    </option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const selected = defineModel({ type: String, required: true });
const emit = defineEmits(['change']);

export interface SelectOption {
  value: string;
  text: string;
}

const props = defineProps({
  options: { type: Array as PropType<SelectOption[]>, required: true },
  placeholder: { type: String, required: false, default: '' },
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('change', target.value);
};
</script>

<style scoped>
select[value=''] {
  @apply text-gray-300;
}
</style>
