<template>
  <div
    v-if="loadingStore.isLoading"
    class="fixed inset-0 flex items-center justify-center"
    style="z-index: 999"
  >
    <div class="absolute inset-0 bg-gray-800 opacity-50"></div>
    <div
      class="relative animate-spin h-10 w-10 border-4 border-gray-800 rounded-full border-t-transparent"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from '/src/stores/loading.store.ts';
const loadingStore = useLoadingStore();
</script>

<style></style>
