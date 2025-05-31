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
        <Field v-model="dateSelected" name="applicationDate" rules="required">
          <SelectComponent v-model="dateSelected" :options="dateOptions" />
        </Field>
        <ErrorMessage
          name="applicationDate"
          class="text-red-500 text-xs mt-1"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">申請先</label>
        <Field v-slot="{ field, errors }" name="reviewer" rules="required">
          <InputComponent v-bind="field" />
          <p v-if="errors.length" class="text-red-500 text-xs mt-1">
            {{ errors[0] }}
          </p>
        </Field>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700"
          >時間 (例: 1.0)</label
        >
        <Field
          v-slot="{ field, errors }"
          name="overTime"
          rules="required|decimal"
        >
          <InputComponent v-bind="field" placeholder="1.0" :hour="true" />
          <p v-if="errors.length" class="text-red-500 text-xs mt-1">
            {{ errors[0] }}
          </p>
        </Field>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">理由</label>
        <Field v-slot="{ field, errors }" name="reason" rules="required">
          <InputComponent v-bind="field" :high="true" :is-text-field="true" />
          <p v-if="errors.length" class="text-red-500 text-xs mt-1">
            {{ errors[0] }}
          </p>
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
import { Form, Field, ErrorMessage, defineRule, useForm } from 'vee-validate';
import { required as originalRequired } from '@vee-validate/rules';
import SelectComponent from '../components/select.component.vue';
import InputComponent from '../components/input.component.vue';
import type { OverTime } from '../repositories/overTime.repository';

const isShow = defineModel<boolean>({ required: true });
const emit = defineEmits(['onClickSubmit']);

defineRule('required', (value: string) => {
  if (originalRequired(value)) {
    return true;
  }
  return 'この項目は必須です。';
});
defineRule('decimal', (value: string) => {
  const regex = /^[1-9]\d*\.\d{1}$/;
  if (regex.test(value)) {
    return true;
  }
  return '小数点形式 (例: 1.0) で入力してください。';
});

const dateSelected = ref('');
const dateOptions = ref<{ value: string; text: string }[]>([]);

const initialFormValues = computed<OverTime>(() => ({
  applicationDate: dateSelected.value,
  reviewer: '',
  overTime: '',
  reason: '',
}));

const closeDialog = () => {
  isShow.value = false;
};

// useForm 関数の戻り値の型から FormReset 型を取得
type FormReturnType = ReturnType<typeof useForm>;
type FormReset = FormReturnType['resetForm'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSubmit = (values: any, { resetForm }: { resetForm: FormReset }) => {
  const typedValues = values as OverTime;
  const submissionData = {
    applicationDate: typedValues.applicationDate,
    reviewer: typedValues.reviewer,
    overTime: typedValues.overTime + 'h',
    reason: typedValues.reason,
  } as OverTime;
  // NOTE: 本来であればここで送信APIをコールする
  emit('onClickSubmit', submissionData);
  alert('申請が送信されました。');
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

onMounted(() => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const dateList = [];
  const currentDate = new Date(today);

  while (currentDate >= startDate) {
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const formattedDate = `${year}/${month}/${day}`;
    dateList.push({ value: formattedDate, text: formattedDate });
    currentDate.setDate(currentDate.getDate() - 1);
  }
  dateOptions.value = dateList;
  if (dateList.length > 0) {
    dateSelected.value = dateList[0].value;
  }
});

watch(isShow, (newVal) => {
  if (newVal && dateOptions.value.length > 0 && !dateSelected.value) {
    dateSelected.value = dateOptions.value[0].value;
  }
});
</script>

<style></style>
