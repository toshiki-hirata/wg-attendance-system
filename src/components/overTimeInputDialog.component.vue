<template>
  <div
    v-if="isShow"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div
      class="absolute inset-0 bg-gray-800 opacity-50"
      @click="closeDialog"
    ></div>
    <Form
      v-slot="{ meta }"
      :initial-values="initialFormValues"
      class="relative flex flex-col bg-white p-6 rounded-md shadow-lg h-auto w-full max-w-[500px] justify-between space-y-3"
      @submit="onSubmit"
    >
      <button class="absolute top-4 right-4 text-gray-800" @click="closeDialog">
        &times;
      </button>
      <h2 class="text-xl font-semibold text-gray-800">残業申請</h2>

      <div>
        <label class="block text-sm font-medium text-gray-700">日付</label>
        <Field v-model="dateSelected" name="applicationDate">
          <SelectComponent v-model="dateSelected" :options="dateOptions" />
        </Field>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">申請先</label>
        <Field v-slot="{ field }" name="reviewer">
          <InputComponent v-bind="field" />
        </Field>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700"
          >時間 (例: 1.0)</label
        >
        <Field v-slot="{ field }" name="overTime">
          <InputComponent v-bind="field" placeholder="1.0" :hour="true" />
        </Field>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">理由</label>
        <Field v-slot="{ field }" name="reason">
          <InputComponent v-bind="field" :high="true" :is-text-field="true" />
        </Field>
      </div>
      <div class="flex justify-between gap-4 pt-4">
        <button
          type="button"
          class="h-[50px] w-full rounded-lg bg-gray-300 hover:bg-gray-400 border border-gray-500 text-xl text-gray-800"
          @click="closeDialog()"
        >
          キャンセル
        </button>
        <button
          type="submit"
          class="h-[50px] w-full rounded-lg bg-purple-500 hover:bg-purple-600 border border-gray-800 text-xl text-gray-100"
          :disabled="!meta.valid && meta.touched"
        >
          申請
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { Form, Field } from 'vee-validate';
import SelectComponent from '../components/select.component.vue';
import InputComponent from '../components/input.component.vue';
import type { OverTime } from '../repositories/overTime.repository';
import { useOverTimeStore } from '../stores/overTime.store';

const isShow = defineModel<boolean>({ required: true });
const emit = defineEmits(['onClickSubmit']);
const overtimeInfo = useOverTimeStore();

// 申請日ドロップダウンで選択した日付
const dateSelected = ref('');
// 申請日ドロップダウンに表示するリスト
const dateOptions = ref<{ value: string; text: string }[]>([]);
// 入力フォームの各フィールドの初期値
const initialFormValues = computed<OverTime>(() => ({
  applicationDate: dateSelected.value,
  reviewer: '',
  overTime: '',
  reason: '',
}));
/**
 * 残業申請ダイアログを閉じる。
 */
const closeDialog = () => {
  isShow.value = false;
};

/**
 * 申請ボタン押下時の処理を実行する。
 * フォームの値を送信し、ダイアログを閉じ、フォームをリセットする。
 * @param {any} values - フォームの入力値。
 * @param {{ resetForm: FormReset }} context - VeeValidateのコンテキスト（フォームリセット関数を含む）。
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSubmit = async (values: OverTime, { resetForm }: any) => {
  // 入力値を構造化
  const submissionData = {
    applicationDate: values.applicationDate,
    reviewer: values.reviewer,
    overTime: values.overTime + 'h',
    reason: values.reason,
  } as OverTime;
  await overtimeInfo.postOverTimeInfo(submissionData);
  emit('onClickSubmit', submissionData);
  alert('申請が送信されました。');
  // 入力フォームの初期化
  resetForm({
    values: {
      applicationDate:
        dateOptions.value.length > 0 ? dateOptions.value[0].value : '',
      reviewer: '',
      overTime: '',
      reason: '',
    },
  });
  closeDialog();
};
/**
 * コンポーネントがマウントされた際に実行される処理です。
 * 日付リストを生成し、ドロップダウンのオプションと初期選択値を設定します。
 */
onMounted(() => {
  // 当日日付
  const today = new Date();
  // 2ヶ月前の1日
  const startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const dateList = [];
  const currentDate = new Date(today);

  // 2ヶ月前の1日 ~ 当日 までの日付リストを生成する
  while (currentDate >= startDate) {
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const formattedDate = `${year}/${month}/${day}`;
    dateList.push({ value: formattedDate, text: formattedDate });
    currentDate.setDate(currentDate.getDate() - 1);
  }
  // 生成結果を画面表示用の変数にセットする
  dateOptions.value = dateList;
  if (dateList.length > 0) {
    dateSelected.value = dateList[0].value;
  }
});
/**
 * `isShow` プロパティの変更を監視し、ダイアログが表示状態になった際に申請日の初期値を設定します。
 * @param {boolean} newVal - `isShow` の新しい値。
 */
watch(isShow, (newVal) => {
  // 表示状態に変わったら、申請日の初期値を申請日ドロップダウンの1件目の日付に設定する
  if (newVal && dateOptions.value.length > 0 && !dateSelected.value) {
    dateSelected.value = dateOptions.value[0].value;
  }
});
</script>

<style></style>
