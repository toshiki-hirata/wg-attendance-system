<template>
  <footer
    class="absolute flex flex-col bottom-0 inset-x-0 w-full pl-56 shadow-2xl items-center bg-gray-300 transition-all duration-200"
    :class="[isShow ? 'h-1/3' : 'h-20']"
  >
    <div
      class="flex w-full justify-between px-4 pt-4 font-bold cursor-pointer"
      @click="isShow = !isShow"
    >
      打刻時間
      <ArrowIcon :class="[isShow ? 'rotate-180' : '']" />
    </div>
    <div v-if="isShow" class="flex justify-center w-full">
      <table class="table-auto">
        <thead>
          <tr>
            <th
              v-for="(column, columnIndex) in header"
              :key="columnIndex"
              class="h-10 underline"
              :style="{ width: column.width }"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(key, rowIndex) in [
              'start',
              'break',
              'restart',
              'end',
            ] as Array<keyof Omit<Attendance, 'date'>>"
            :key="rowIndex"
          >
            <td
              v-for="(_, columnIndex) in header"
              :key="columnIndex"
              class="h-10 px-2 border-2 border-gray-300 bg-gray-100"
            >
              <template v-if="columnIndex === 0">
                {{ attendanceLabels[key] }}
              </template>
              <template v-else>
                {{
                  attendanceStore.attendanceHistory[columnIndex - 1][key] || ''
                }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ArrowIcon from '../assets/icons/arrow.icon.vue';
import { useAttendanceStore } from '../stores/attendance.store';
import { formatDate, formatMMDD } from '../utils/dateFormatter';

const attendanceStore = useAttendanceStore();
const isShow = ref(false);

export interface Attendance {
  date: string;
  start: string;
  break: string;
  restart: string;
  end: string;
}

const attendanceLabels: Record<keyof Omit<Attendance, 'date'>, string> = {
  start: '勤務開始',
  break: '休憩開始',
  restart: '勤務再開',
  end: '勤務終了',
};

// ...existing code...
const header = ref<{ label: string; field: string; width: string }[]>([
  { label: '', field: 'label', width: '150px' },
]);

onMounted(async () => {
  await attendanceStore.fetchAttendanceHistory();

  // 日付範囲の生成
  const dateRange = generateDateRangeFromToday(-2, 5);

  // ヘッダー情報を更新
  header.value = [
    { label: '', field: 'label', width: '150px' },
    ...generateHeaderColumns(dateRange),
  ];

  // 欠損データを補完
  const updatedAttendances = fillMissingAttendances(
    dateRange,
    attendanceStore.attendanceHistory
  );

  // ストアを更新
  attendanceStore.attendanceHistory = updatedAttendances;
});

/**
 * 今日の日付を基準に指定された範囲の日付配列を生成
 */
function generateDateRangeFromToday(startOffset: number, count: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return generateDateRange(today, startOffset, count);
}

/**
 * 指定された基準日から特定の範囲の日付配列を生成
 */
function generateDateRange(baseDate: Date, startOffset: number, count: number) {
  const result = [];
  for (let i = startOffset; i < startOffset + count; i++) {
    const targetDate = new Date(baseDate);
    targetDate.setDate(baseDate.getDate() + i);
    result.push({
      date: targetDate,
      formattedDate: formatDate(targetDate),
      formattedShortDate: formatMMDD(targetDate),
    });
  }
  return result;
}

/**
 * 日付範囲からヘッダーカラムを生成
 */
function generateHeaderColumns(
  dateRange: { date: Date; formattedDate: string; formattedShortDate: string }[]
) {
  return dateRange.map(({ formattedDate, formattedShortDate }) => ({
    label: formattedShortDate,
    field: formattedDate,
    width: '150px',
  }));
}

/**
 * 欠損している日付のデータを補完した新しい配列を返す
 */
function fillMissingAttendances(
  dateRange: {
    date: Date;
    formattedDate: string;
    formattedShortDate: string;
  }[],
  existingAttendances: Attendance[]
) {
  // 関数内でマップを生成
  const attendanceMap = new Map<string, Attendance>();
  existingAttendances.forEach((attendance) => {
    attendanceMap.set(attendance.date, attendance);
  });

  // 既存の配列をコピーして変更せず、新しい配列を作成
  const result = [...existingAttendances];

  for (const { formattedDate } of dateRange) {
    if (!attendanceMap.get(formattedDate)) {
      // 新しい要素を作成して追加
      result.push({
        date: formattedDate,
        start: '',
        break: '',
        restart: '',
        end: '',
      });
    }
  }

  return result;
}
</script>
