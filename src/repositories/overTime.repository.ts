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
  async fetchOverTime(_userId: string) {
    try {
      const response =
        await axiosInstance.get<GetSampleResponse>('/overtime/fetch');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('超過報告情報取得APIコールに失敗しました。', error);
      throw error;
    }
  },
  async submitOvertime(overTime: OverTime) {
    try {
      const response = await axiosInstance.post('/overtime', {
        applicationDate: overTime.applicationDate,
        reviewer: overTime.reviewer,
        overTime: overTime.overTime,
        reason: overTime.reason,
      });
      return response.data;
    } catch (error) {
      console.error('超過勤務登録APIコールに失敗しました。', error);
      throw error;
    }
  },
};
