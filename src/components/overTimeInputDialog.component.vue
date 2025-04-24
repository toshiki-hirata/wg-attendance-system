<template>
  <div
    v-if="isShow"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div
      class="absolute inset-0 bg-gray-800 opacity-50"
      @click="closeDialog"
    ></div>
    <div
      class="relative flex flex-col bg-white p-6 rounded-md shadow-lg h-2/3 w-full max-w-[500px] justify-between"
    >
      <button class="absolute top-4 right-4 text-gray-800" @click="closeDialog">
        &times;
      </button>
      残業申請をしてください。
      <div>
        日付<br />
        <SelectComponent v-model="dateSelected" :options="dateOptions" />
      </div>
      <InputComponent v-model="inputReviewer" label="レビュワー" />
      <InputComponent
        v-model="inputOverTime"
        label="残業申請時間"
        placeholder="1.0"
        :hour="true"
      />
      <InputComponent v-model="inputReason" label="残業申請理由" :high="true" />
      <div class="flex justify-between gap-4">
        <button
          class="h-[60px] w-full rounded-3xl bg-gray-300 hover:bg-gray-400 border border-gray-800 text-3xl text-gray-800"
          @click="closeDialog()"
        >
          キャンセル
        </button>
        <button
          class="h-[60px] w-full rounded-3xl bg-purple-500 hover:bg-purple-600 border border-gray-800 text-3xl text-gray-100"
          @click="closeDialog()"
        >
          申請
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SelectComponent from '/src/components/select.component.vue';
import InputComponent from '/src/components/input.component.vue';

const isShow = defineModel({ type: Boolean, required: true });

const dateSelected = ref('2025/03/01');
const dateOptions = [
  { value: '2025/03/01', text: '2025/03/01' },
  { value: '2025/03/02', text: '2025/03/02' },
  { value: '2025/03/03', text: '2025/03/03' },
];

const inputReviewer = ref('');
const inputOverTime = ref('');
const inputReason = ref('');

const closeDialog = () => {
  isShow.value = !isShow.value;
};

onMounted(() => {
  // const today = new Date();
  // const addZero = (time: string | number): string => ('0' + time).slice(-2);
  // dateSelected.value =
  // today.getFullYear() +
  //  '/' +
  // addZero(today.getMonth() + 1) +
  // '/' +
  //  addZero(today.getDate());
});
</script>

<style></style>
