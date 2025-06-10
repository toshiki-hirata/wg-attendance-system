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
        v-model="dateSelected"
        class="flex-grow"
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
  <OverTimeInputDialog v-model="isShowDialog" @on-click-submit="addOverTime" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useSideNavStore, SIDENAV_ITEM } from '../stores/sidenav.store';
import { useLoadingStore } from '../stores/loading.store';
import SelectComponent from '../components/select.component.vue';
import OverTimeInputDialog from '../components/overTimeInputDialog.component.vue';
import { useOverTimeStore } from '../stores/overTime.store';
import type { OverTime } from '../repositories/overTime.repository';

const sideNavStore = useSideNavStore();
const loadingStore = useLoadingStore();
const overtimeInfo = useOverTimeStore();

// 残業申請ダイアログの表示中状態制御
const isShowDialog = ref(false);
// 選択した対象月
const dateSelected = ref('');
// 残業申請ダイアログで表示する申請日リスト
const dateOptions = ref<{ value: string; text: string }[]>([]);
// 残業情報表示テーブルのラベル表示名と情報の取得元と表示幅を保持
const requestHeader: { label: string; field: string; width: string }[] = [
  { label: '日付', field: 'applicationDate', width: '20vw' },
  { label: '時間', field: 'overTime', width: '10vw' },
  { label: '理由', field: 'reason', width: '35vw' },
  { label: '申請先', field: 'reviewer', width: '20vw' },
  { label: '', field: 'button', width: '15vw' },
];
/**
 * 残業申請リストの算出プロパティ。
 * `overtimeInfo.filteredOverTimeList` の値が変わるたびに自動的に再計算されます。
 * @returns {OverTime[]} フィルタリングされた残業申請リスト、または空の配列。
 */
const tableData = computed(() => {
  return overtimeInfo.filteredOverTimeList || [];
});
/**
 * 申請取り消しボタン押下時の処理。
 * 指定された日付の残業申請を削除し、リストを再フィルタリングします。
 * @param {string} date - 取り消す申請の年月日（YYYY/MM/DD形式）。
 */
const onClickRemove = (date: string) => {
  overtimeInfo.removeOverTimeInfo(date);
  overtimeInfo.filterOverTimeInfo(dateSelected.value);
};
/**
 * 対象月ドロップダウン変更時の処理。
 * 選択された月に基づいて残業申請リストをフィルタリングします。
 * @param {string} value - 選択された対象月（YYYY/MM形式）。
 */
const handleSelectChange = (value: string) => {
  dateSelected.value = value;
  overtimeInfo.filterOverTimeInfo(dateSelected.value);
};
/**
 * 残業申請ダイアログで申請ボタンが押下されたときの処理。
 * 新しい残業申請を追加し、リストを再フィルタリングします。
 * @param {OverTime} submissionOverTime - 送信された残業申請データ。
 */
const addOverTime = (submissionOverTime: OverTime) => {
  overtimeInfo.addOverTimeInfo(submissionOverTime);
  overtimeInfo.filterOverTimeInfo(dateSelected.value);
};
/**
 * コンポーネントがマウントされた際に実行される処理。
 * 残業申請情報を取得し、対象月のオプションを生成・設定します。
 */
onMounted(async () => {
  loadingStore.setLoading(true);
  sideNavStore.setCurrentItem(SIDENAV_ITEM.OVER_TIME);
  await overtimeInfo.fetchOverTimeInfo('dummyUserId');

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
/**
 * 現在日から過去3ヶ月間の「YYYY/MM」形式の文字列リストを生成して返します。
 * @returns {string[]} 過去3ヶ月間のYYYY/MM形式の文字列配列。
 */
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

<style scoped>
td {
  padding: 8px;
  word-wrap: break-word;
  white-space: normal;
  word-break: break-all;
}
</style>
