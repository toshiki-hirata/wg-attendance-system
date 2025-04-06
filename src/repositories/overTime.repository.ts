import apiClient from './axiosInstance.ts';

export interface OverTime {
  applicationDate: string;
  reviewer: string;
  overTime: string;
  reason: string;
}

export interface OverTimeList {
  overTimeList: OverTime[];
}

export const overTimeRepository = {
  async fetchOverTime(requestData: any) {
    try {
      const response = await apiClient.post('/overtime/fetch', requestData);
      return response.data;
    } catch (error) {
      console.error('超過報告情報取得APIコールに失敗しました。', error);
      throw error;
    }
  },
};
