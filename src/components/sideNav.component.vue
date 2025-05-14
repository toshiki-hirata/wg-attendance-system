<template>
  <nav
    class="fixed flex flex-col justify-between bg-purple-500 h-full rounded-r-[20px] shadow-2xl p-4 text-gray-100"
  >
    <div class="flex flex-col gap-10">
      <div class="font-bold">勤怠管理アプリ</div>
      <div class="flex flex-col gap-4">
        <button
          class="flex items-center w-full px-2 gap-2"
          :class="[
            sideNavStore.currentItem === SIDENAV_ITEM.PUNCH_CLOCK
              ? 'font-bold underline'
              : '',
          ]"
          @click="onClickItem(SIDENAV_ITEM.PUNCH_CLOCK)"
        >
          <TimeIcon />
          <span>打刻</span>
        </button>
        <button
          class="flex items-center w-full px-2 gap-2"
          :class="[
            sideNavStore.currentItem === SIDENAV_ITEM.OVER_TIME
              ? 'font-bold underline'
              : '',
          ]"
          @click="onClickItem(SIDENAV_ITEM.OVER_TIME)"
        >
          <ListIcon />
          <span>残業確認</span>
        </button>
      </div>
    </div>
    <div class="flex items-center w-full gap-2">
      <UserIcon />
      {{ userName }}
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TimeIcon from '/src/assets/icons/time.icon.vue';
import ListIcon from '/src/assets/icons/list.icon.vue';
import UserIcon from '/src/assets/icons/user.icon.vue';
import { getItemPath } from '/src/routes';
import { useSideNavStore, SIDENAV_ITEM } from '/src/stores/sidenav.store';

const router = useRouter();
const sideNavStore = useSideNavStore();

const userName = ref('田中 二郎');

const onClickItem = (itemName: SIDENAV_ITEM) => {
  if (sideNavStore.currentItem === itemName) {
    return;
  }
  sideNavStore.setCurrentItem(itemName);
  router.push(getItemPath(itemName));
};
</script>

<style scoped></style>
