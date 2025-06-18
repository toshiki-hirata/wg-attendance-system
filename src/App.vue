<template>
  <div class="flex h-screen">
    <SideNav class="w-56 z-10" />
    <div class="w-screen ml-56">
      <div class="flex flex-col h-full p-10">
        <router-view />
      </div>
    </div>
  </div>
  <Loading />
</template>

<script setup lang="ts">
import SideNav from '/src/components/sideNav.component.vue';
import Loading from '/src/components/loading.component.vue';
</script>

<style scoped></style>
