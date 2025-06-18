<template>
  <div class="flex flex-col h-full gap-20 tabular-nums">
    <div class="flex flex-col h-20 text-center gap-2">
      <span>{{ currentDate }}</span>
      <span class="text-[50px]">{{ currentTime }}</span>
    </div>
    <div class="flex flex-col w-full justify-center gap-10">
      <PrimaryButton
        :text="
          attendanceStore.startButton === BUTTON_CONDITION.NOT_ENABLED
            ? '勤務中'
            : '勤務開始'
        "
        :condition="attendanceStore.startButton"
        @on-click="onClickStart()"
      />
      <PrimaryButton
        :text="
          attendanceStore.breakButton === BUTTON_CONDITION.NOT_ENABLED
            ? '休憩中'
            : '休憩開始'
        "
        :condition="attendanceStore.breakButton"
        @on-click="onClickBreak()"
      />
      <PrimaryButton
        text="勤務終了"
        :condition="attendanceStore.endButton"
        @on-click="onClickEnd()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PrimaryButton, {
  BUTTON_CONDITION,
} from '../components/primaryButton.component.vue';
import { useAttendanceStore } from '../stores/attendance.store';

const attendanceStore = useAttendanceStore();

const currentDate = ref('');
const currentTime = ref('');
const week = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'];

/**
 * 勤務開始ボタン押下時の処理を実行します。
 * 休憩中であれば勤務再開、そうでなければ勤務開始の打刻を行います。
 */
const onClickStart = () => {
  attendanceStore.start();
};
/**
 * 休憩開始ボタン押下時の処理を実行します。
 * 現在時刻で休憩開始の打刻を行い、ストアの状態を更新します。
 */
const onClickBreak = () => {
  attendanceStore.break();
};
/**
 * 勤務終了ボタン押下時の処理を実行します。
 * 現在時刻で勤務終了の打刻を行い、今日の打刻情報をサーバーに送信します。
 */
const onClickEnd = async () => {
  attendanceStore.end();
};
/**
 * 現在の日付と時刻を算出し、リアクティブ変数にセットします。
 */
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
/**
 * コンポーネントがマウントされた際に実行される処理です。
 * 現在時刻の表示をセットし、ロード状態を管理します。
 */
onMounted(async () => {
  // 現在時刻の表示処理
  setCurrent(); // 初回実行
  setInterval(() => {
    setCurrent();
  }, 1000); // 毎秒更新されるよう処理をセット
});
</script>

<style scoped></style>
