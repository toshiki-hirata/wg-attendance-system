import { axiosInstance } from '../api/axios';
import type { GetSampleResponse } from '../api/types';

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
      const response = await axiosInstance.get<GetSampleResponse>(
        '/overtime/fetch',
        requestData
      );
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('超過報告情報取得APIコールに失敗しました。', error);
      throw error;
    }
  },
};
