<template>
  <div class="flex flex-col gap-10 items-center">
    <button
      class="h-[60px] w-[300px] rounded-3xl bg-purple-500 hover:bg-purple-600 border border-gray-800 text-3xl text-gray-100"
      @click="isShowDialog = true"
    >
      残業申請
    </button>
    <div class="w-full flex flex-row gap-2 items-center">
      <div>対象月</div>
      <SelectComponent
        class="flex-grow"
        v-model="dateSelected"
        :options="dateOptions"
        @change="handleSelectChange"
      />
    </div>
    <div class="flex flex-col gap-10">
      <table class="table-auto">
        <thead>
          <tr>
            <th
              v-for="(column, columnIndex) in requestHeader"
              :key="columnIndex"
              class="h-8 bg-purple-200 text-gray-800"
              :style="{ width: column.width }"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody v-if="tableData.length > 0">
          <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
            <td
              v-for="(column, columnIndex) in requestHeader"
              :key="columnIndex"
              class="h-20 bg-purple-100 px-2 border-b-2 border-b-gray-100"
            >
              <div v-if="column.field === 'button'" class="flex justify-center">
                <button
                  class="h-8 bg-purple-500 rounded-[50px] px-3 border border-gray-100 hover:bg-purple-600"
                  @click="onClickRemove(row.applicationDate)"
                >
                  取り消し
                </button>
              </div>
              <div v-else>
                {{ row[column.field] }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="tableData.length === 0">申請はありません。</div>
    </div>
  </div>
  <OverTimeInputDialog v-model="isShowDialog" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useSideNavStore, SIDENAV_ITEM } from '/src/stores/sidenav.store';
import { useLoadingStore } from '/src/stores/loading.store';
import SelectComponent from '/src/components/select.component.vue';
import OverTimeInputDialog from '/src/components/overTimeInputDialog.component.vue';
import { useOverTimeStore } from '/src/stores/overTime.store';

const sideNavStore = useSideNavStore();
const loadingStore = useLoadingStore();
const overtimeInfo = useOverTimeStore();

const isShowDialog = ref(false);

const dateSelected = ref('');
const dateOptions = ref([]);

const requestHeader: { label: string; field: string; width: string }[] = [
  { label: '日付', field: 'applicationDate', width: '20vw' },
  { label: '時間', field: 'overTime', width: '10vw' },
  { label: '理由', field: 'reason', width: '35vw' },
  { label: '申請先', field: 'reviewer', width: '20vw' },
  { label: '', field: 'button', width: '15vw' },
];

const tableData = computed(() => {
  return overtimeInfo.filteredOverTimeList || [];
});

const onClickRemove = (date: string) => {
  overtimeInfo.removeOverTimeInfo(date);
  overtimeInfo.filterOverTimeInfo(dateSelected.value);
};

const handleSelectChange = (value: string) => {
  dateSelected.value = value;
  overtimeInfo.filterOverTimeInfo(dateSelected.value);
};

onMounted(async () => {
  loadingStore.setLoading(true);
  sideNavStore.setCurrentItem(SIDENAV_ITEM.OVER_TIME);
  overtimeInfo.fetchOverTimeInfo();

  const pastThreeMonthsYYYYMM = getPastThreeMonthsYYYYMM();
  for (const yyyymm of pastThreeMonthsYYYYMM) {
    dateOptions.value.push({
      value: yyyymm,
      text: yyyymm,
    });
  }
  dateSelected.value = dateOptions.value[0].value;
  overtimeInfo.filterOverTimeInfo(dateSelected.value);

  await new Promise<void>((r) => {
    setTimeout(() => {
      r();
    }, 2000);
  });
  loadingStore.setLoading(false);
});

const getPastThreeMonthsYYYYMM = (): string[] => {
  const now = new Date();
  const result: string[] = [];

  for (let i = 0; i < 3; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    result.push(`${year}/${month}`);
  }

  return result;
};
</script>

<style scoped></style>
