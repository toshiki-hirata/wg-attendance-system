<template>
  <div class="flex flex-col h-full gap-20 tabular-nums">
    <div class="flex flex-col h-20 text-center gap-2">
      <span>{{ currentDate }}</span>
      <span class="text-[50px]">{{ currentTime }}</span>
    </div>
    <div class="flex flex-col w-full justify-center gap-10">
      <PrimaryButton
        :text="
          attendanceStore.startButton === BUTTON_CONDITION.NOT_ENABLED ? '勤務中' : '勤務開始'
        "
        :condition="attendanceStore.startButton"
        @on-click="onClickStart()"
      />
      <PrimaryButton
        :text="
          attendanceStore.breakButton === BUTTON_CONDITION.NOT_ENABLED ? '休憩中' : '休憩開始'
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

const onClickStart = () => {
  if (attendanceStore.breakButton == BUTTON_CONDITION.NOT_ENABLED) {
    updateAttendance('restart', currentTime.value);
  } else {
    updateAttendance('start', currentTime.value);
  }
  attendanceStore.start();
};
const onClickBreak = () => {
  updateAttendance('break', currentTime.value);
  attendanceStore.break();
};
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
  setCurrent(); // 初回実行
  setInterval(() => {
    setCurrent();
  }, 1000); // 毎秒更新
  loadingStore.setLoading(true);
  await new Promise<void>((r) => {
    setTimeout(() => {
      r();
    }, 2000);
  });
  loadingStore.setLoading(false);

  sideNavStore.setCurrentItem(SIDENAV_ITEM.PUNCH_CLOCK);
});

function updateAttendance(key: keyof Attendance, time: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yyyyMmDd = formatDate(today);

  // すでに存在するデータを取得
  const attendance = attendanceStore.attendanceHistory.find(
    (att) => att.date === yyyyMmDd
  );

  if (attendance) {
    // すでに存在していればその値を更新
    attendance[key] = time;
  } else {
    // 存在しない場合、新しく追加
    const newAttendance: Attendance = {
      date: yyyyMmDd,
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
