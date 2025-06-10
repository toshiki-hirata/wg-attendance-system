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
import { useSideNavStore, SIDENAV_ITEM } from '../stores/sidenav.store';
import { useLoadingStore } from '../stores/loading.store';
import PrimaryButton, {
  BUTTON_CONDITION,
} from '../components/primaryButton.component.vue';
import type { Attendance } from '../components/footer.component.vue';
import { useAttendanceStore } from '../stores/attendance.store';
import { formatDate } from '../utils/dateFormatter';

const sideNavStore = useSideNavStore();
const loadingStore = useLoadingStore();
const attendanceStore = useAttendanceStore();

const currentDate = ref('');
const currentTime = ref('');
const week = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'];

/**
 * 勤務開始ボタン押下時の処理を実行します。
 * 休憩中であれば勤務再開、そうでなければ勤務開始の打刻を行います。
 */
const onClickStart = () => {
  if (attendanceStore.breakButton == BUTTON_CONDITION.NOT_ENABLED) {
    updateAttendance('restart', currentTime.value);
  } else {
    updateAttendance('start', currentTime.value);
  }
  attendanceStore.start();
};
/**
 * 休憩開始ボタン押下時の処理を実行します。
 * 現在時刻で休憩開始の打刻を行い、ストアの状態を更新します。
 */
const onClickBreak = () => {
  updateAttendance('break', currentTime.value);
  attendanceStore.break();
};
/**
 * 勤務終了ボタン押下時の処理を実行します。
 * 現在時刻で勤務終了の打刻を行い、今日の打刻情報をサーバーに送信します。
 */
const onClickEnd = async () => {
  updateAttendance('end', currentTime.value);
  const todayAttendance = attendanceStore.attendanceHistory.find(
    (p) => p.date === formatDate(new Date())
  );
  if (todayAttendance) {
    const response = await attendanceStore.postAttendance(todayAttendance);
    console.log('response', response);
  }
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

  loadingStore.setLoading(true);
  await new Promise<void>((r) => {
    setTimeout(() => {
      r();
    }, 2000);
  });
  loadingStore.setLoading(false);

  sideNavStore.setCurrentItem(SIDENAV_ITEM.PUNCH_CLOCK);
});
/**
 * 指定されたキーと時刻で打刻情報を更新または新規追加します。
 * @param {keyof Attendance} key - 更新する打刻情報のキー（例: 'start', 'break'）。
 * @param {string} time - 打刻時刻の文字列。
 */
function updateAttendance(key: keyof Attendance, time: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const YYYYMMDD = formatDate(today);

  // すでに存在するデータを取得
  const attendance = attendanceStore.attendanceHistory.find(
    (att) => att.date === YYYYMMDD
  );

  if (attendance) {
    // すでに存在していればその値を更新
    attendance[key] = time;
  } else {
    // 存在しない場合、新しく追加
    const newAttendance: Attendance = {
      date: YYYYMMDD,
      start: '',
      break: '',
      restart: '',
      end: '',
    };
    newAttendance[key] = time;
    attendanceStore.addAttendanceHistory(newAttendance);
  }
}
</script>

<style scoped></style>
