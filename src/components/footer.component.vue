<template>
  <footer
    class="absolute flex flex-col bottom-0 inset-x-0 w-full pl-56 shadow-2xl items-center bg-gray-300 transition-all duration-200"
    :class="[isShow ? 'h-2/3' : 'h-20']"
  >
    <div
      class="flex w-full justify-between px-4 pt-4 font-bold"
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
            v-for="(row, rowIndex) in ['start', 'break', 'restart', 'end']"
            :key="rowIndex"
          >
            <td
              v-for="(column, columnIndex) in header"
              :key="columnIndex"
              class="h-10 bg-gray-100 px-2 border-2 border-gray-300"
            >
              <div v-if="rowIndex === 0">{{ data[columnIndex].start }}</div>
              <div v-if="rowIndex === 1">{{ data[columnIndex].break }}</div>
              <div v-if="rowIndex === 2">{{ data[columnIndex].restart }}</div>
              <div v-if="rowIndex === 3">{{ data[columnIndex].end }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ArrowIcon from '/src/assets/icons/arrow.icon.vue';

const isShow = ref(false);

const header = ref<{ label: string; field: string; width: string }[]>([
  { label: '', field: 'period', width: '200px' },
]);

interface RowItem {
  rowLabel: string;
  start: string;
  break: string;
  restart: string;
  end: string;
}
const data = ref<RowItem[]>([
  {
    rowLabel: 'period',
    start: '勤務開始時刻',
    break: '休憩開始時刻',
    restart: '勤務再開時刻',
    end: '勤務終了時刻',
  },
]);

onMounted(() => {
  const today = new Date();
  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const weekday = daysOfWeek[currentDate.getDay()];

    header.value.push({
      label: `${month}/${day}`,
      field: `${month}/${day}`,
      width: `100px`,
    });

    data.value[i + 1] = {
      period: '',
      start: '',
      break: '',
      restart: '',
      end: '',
    };

    // mock
    data.value[2] = {
      period: '04/01',
      start: '09:00',
      break: '12:00',
      restart: '13:00',
      end: '18:00',
    };
    data.value[3] = {
      period: '04/02',
      start: '09:05',
      break: '12:05',
      restart: '13:05',
      end: '18:05',
    };
    data.value[4] = {
      period: '04/03',
      start: '09:00',
      break: '12:00',
      restart: '',
      end: '',
    };
  }
});
</script>

<style></style>
