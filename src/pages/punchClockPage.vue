<template>
  <div class="flex flex-col h-full gap-20 tabular-nums">
    <div class="flex flex-col h-20 text-center gap-2">
      <span>{{ currentDate }}</span>
      <span class="text-[50px]">{{ currentTime }}</span>
    </div>
    <div class="flex flex-col w-full justify-center gap-10">
      <PrimaryButton
        :text="
          startButton === BUTTON_CONDITION.NOT_ENABLED ? '勤務中' : '勤務開始'
        "
        :condition="startButton"
        @on-click="onClickStart()"
      />
      <PrimaryButton
        :text="
          breakButton === BUTTON_CONDITION.NOT_ENABLED ? '休憩中' : '休憩開始'
        "
        :condition="breakButton"
        @on-click="onClickBreak()"
      />
      <PrimaryButton
        text="勤務終了"
        :condition="endButton"
        @on-click="onClickEnd()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSideNavStore, SIDENAV_ITEM } from '../stores/sidenav.store';
import { useLoadingStore } from '../stores/loading.store';
import PrimaryButton, {
  BUTTON_CONDITION,
} from '../components/primaryButton.component.vue';

const sideNavStore = useSideNavStore();
const loadingStore = useLoadingStore();

const currentDate = ref('');
const currentTime = ref('');
const week = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'];

const startButton = ref(BUTTON_CONDITION.ENABLED);
const breakButton = ref(BUTTON_CONDITION.DISABLED);
const endButton = ref(BUTTON_CONDITION.DISABLED);

const onClickStart = () => {
  startButton.value = BUTTON_CONDITION.NOT_ENABLED;
  breakButton.value = BUTTON_CONDITION.ENABLED;
  endButton.value = BUTTON_CONDITION.ENABLED;
};
const onClickBreak = () => {
  startButton.value = BUTTON_CONDITION.ENABLED;
  breakButton.value = BUTTON_CONDITION.NOT_ENABLED;
  endButton.value = BUTTON_CONDITION.DISABLED;
};
const onClickEnd = () => {
  startButton.value = BUTTON_CONDITION.ENABLED;
  breakButton.value = BUTTON_CONDITION.DISABLED;
  endButton.value = BUTTON_CONDITION.DISABLED;
};

const setCurrent = () => {
  const date = new Date();
  const addZero = (time: string | number): string => ('0' + time).slice(-2);
  currentDate.value =
    date.getFullYear() +
    '/' +
    addZero(date.getMonth() + 1) +
    '/' +
    addZero(date.getDate()) +
    week[date.getDay()];
  currentTime.value =
    addZero(date.getHours()) +
    ':' +
    addZero(date.getMinutes()) +
    ':' +
    addZero(date.getSeconds());
};

onMounted(async () => {
  loadingStore.setLoading(true);
  sideNavStore.setCurrentItem(SIDENAV_ITEM.PUNCH_CLOCK);

  setInterval(() => setCurrent(), 1000);

  await new Promise<void>((r) => {
    setTimeout(() => {
      r();
    }, 2000);
  });
  loadingStore.setLoading(false);
});
</script>

<style scoped></style>
