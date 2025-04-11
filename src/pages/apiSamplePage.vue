<template>
  <div class="p-6 max-w-7xl h-full w-full">
    <h1 class="text-2xl font-bold mb-8">API Sample Page</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- GET Request Section -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 class="text-xl font-semibold mb-4">GET Request Test</h2>
        <div class="flex flex-col">
          <button
            class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-fit"
            @click="handleGetRequest"
          >
            Send GET Request
          </button>
          <div
            class="mt-4 p-4 bg-gray-50 rounded border border-gray-200 flex-1 overflow-auto"
            :class="{ 'flex items-center justify-center text-gray-500': !getResponse }"
          >
            <template v-if="getResponse">
              <pre>{{ JSON.stringify(getResponse, null, 2) }}</pre>
            </template>
            <template v-else>
              Response will appear here
            </template>
          </div>
        </div>
      </div>

      <!-- POST Request Section -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 class="text-xl font-semibold mb-4">POST Request Test</h2>
        <div class="flex flex-col">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <input
              v-model="postData.message"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a message to send"
            />
          </div>
          <button
            class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed w-fit"
            @click="handlePostRequest"
            :disabled="!postData.message"
          >
            Send POST Request
          </button>
          <div
            class="mt-4 p-4 bg-gray-50 rounded border border-gray-200 flex-1 overflow-auto"
            :class="{ 'flex items-center justify-center text-gray-500': !postResponse }"
          >
            <template v-if="postResponse">
              <pre>{{ JSON.stringify(postResponse, null, 2) }}</pre>
            </template>
            <template v-else>
              Response will appear here
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { axiosInstance } from '../api/axios';
import type { GetSampleResponse, PostSampleRequest, PostSampleResponse } from '../api/types';

const getResponse = ref<GetSampleResponse | null>(null);
const postResponse = ref<PostSampleResponse | null>(null);
const postData = ref<PostSampleRequest>({
  message: '',
});

const handleGetRequest = async () => {
  try {
    const response = await axiosInstance.get<GetSampleResponse>('/get');
    getResponse.value = response.data;
  } catch (error) {
    console.error('GET request failed:', error);
    getResponse.value = { message: 'Failed to fetch data' };
  }
};

const handlePostRequest = async () => {
  try {
    const response = await axiosInstance.post<PostSampleResponse>('/post', postData.value);
    postResponse.value = response.data;
  } catch (error) {
    console.error('POST request failed:', error);
    postResponse.value = { message: 'Failed to send data', data: postData.value };
  }
};
</script>