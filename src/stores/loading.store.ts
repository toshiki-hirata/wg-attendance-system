import { defineStore } from 'pinia';

export interface LoadingState {
  isLoading: boolean;
}

export const useLoadingStore = defineStore('attendance.loading', {
  state: (): LoadingState => ({
    isLoading: false,
  }),
  persist: { storage: sessionStorage },
  getters: {},
  actions: {
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
  },
});
