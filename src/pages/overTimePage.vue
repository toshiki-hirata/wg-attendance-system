<template>
  <div class="flex flex-col gap-10 items-center">
    <button
      class="h-[60px] w-[300px] rounded-3xl bg-purple-500 hover:bg-purple-600 border border-gray-800 text-3xl text-gray-100"
      @click="isShowDialog = true"
    >
      残業申請
    </button>
    <div class="w-full flex flex-row px-2 gap-2">
      <SelectComponent v-model="dateSelected" :options="dateOptions" />
      <SelectComponent
        v-model="selected"
        :options="options"
        placeholder="please select item"
      />
    </div>
    <div class="flex flex-col gap-10">
      <table class="table-auto">
        <thead>
          <tr>
            <th
              v-for="(column, columnIndex) in requestHeader"
              :key="columnIndex"
              class="h-10 text-3xl text-gray-800 underline"
              :style="{ width: column.width }"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in requestData" :key="rowIndex">
            <td
              v-for="(column, columnIndex) in requestHeader"
              :key="columnIndex"
              class="h-20 bg-purple-200 px-2 border-b-2 border-b-gray-100"
            >
              <div v-if="column.field === 'button'" class="flex justify-center">
                <button
                  class="h-8 bg-purple-500 rounded-[50px] px-3 border border-gray-100 hover:bg-purple-600"
                  @click="onClickRemove(rowIndex)"
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
    </div>
  </div>
  <OverTimeInputDialog v-model="isShowDialog" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSideNavStore, SIDENAV_ITEM } from '/src/stores/sidenav.store';
import { useLoadingStore } from '/src/stores/loading.store';
import SelectComponent from '/src/components/select.component.vue';
import OverTimeInputDialog from '/src/components/overTimeInputDialog.component.vue';

const sideNavStore = useSideNavStore();
const loadingStore = useLoadingStore();

const isShowDialog = ref(false);

const dateSelected = ref('2025/01');
const selected = ref('');
const dateOptions = [
  { value: '2025/01', text: '2025/01' },
  { value: '2025/02', text: '2025/02' },
  { value: '2025/03', text: '2025/03' },
];
const options = [
  { value: 'option1', text: 'オプション 1' },
  { value: 'option2', text: 'オプション 2' },
  { value: 'option3', text: 'オプション 3' },
];

const requestHeader: { label: string; field: string; width: string }[] = [
  { label: '日付', field: 'date', width: '20vw' },
  { label: 'レビュワー', field: 'reviewer', width: '20vw' },
  { label: '時間', field: 'overTime', width: '10vw' },
  { label: '報告理由', field: 'reason', width: '35vw' },
  { label: '', field: 'button', width: '15vw' },
];

const requestData = ref([
  {
    date: '2024/12/31',
    reviewer: 'taro.tanaka',
    overTime: '1.0h',
    reason: 'XXX調査',
  },
  {
    date: '2025/01/01',
    reviewer: 'taro.tanaka',
    overTime: '3.0h',
    reason: 'XXX実装',
  },
  {
    date: '2025/02/01',
    reviewer: 'taro.tanaka',
    overTime: '2.0h',
    reason: 'OOOテスト',
  },
]);

const onClickRemove = (index: number) => {
  requestData.value.splice(index, 1);
};

onMounted(async () => {
  loadingStore.setLoading(true);
  sideNavStore.setCurrentItem(SIDENAV_ITEM.OVER_TIME);

  await new Promise<void>((r) => {
    setTimeout(() => {
      r();
    }, 2000);
  });
  loadingStore.setLoading(false);
});
</script>

<style scoped></style>
