<template>
  <div>
    {{ label }}
    <div v-if="isTextField">
      <textarea
        v-model="inputValue"
        class="w-full rounded-md border border-gray-800 text-xl text-gray-800 px-4"
        :class="[high ? ' h-40' : ' h-10']"
        :placeholder="placeholder"
      ></textarea>
    </div>
    <div v-else>
      <div class="flex gap-2">
        <input
          v-model="inputValue"
          type="text"
          class="w-full rounded-md border border-gray-800 text-xl text-gray-800 px-4"
          :class="[high ? ' h-40' : ' h-10']"
          :placeholder="placeholder"
        />
        <span v-if="hour">h</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineModel } from 'vue';

const inputValue = defineModel({ type: String, required: true });

const props = defineProps({
  label: { type: String, required: false, default: '' },
  placeholder: { type: String, required: false, default: '' },
  high: { type: Boolean, required: false, default: false },
  hour: { type: Boolean, required: false, default: false },
  isTextField: { type: Boolean, required: false, default: false },
});
</script>

<style scoped></style>
