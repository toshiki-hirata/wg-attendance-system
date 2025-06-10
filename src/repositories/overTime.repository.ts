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
  /**
   * 超過報告情報を取得するためのAPIを呼び出します。
   * @param {string} _userId - ユーザーID。
   * @returns {Promise<GetSampleResponse[]>} 超過報告情報の配列、または空の配列を返します。
   * @throws {Error} APIコールに失敗した場合にエラーをスローします。
   */
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
  /**
   * 超過勤務情報を登録するためのAPIを呼び出します。
   * @param {OverTime} overTime - 登録する超過勤務データ。
   * @returns {Promise<any>} APIからのレスポンスデータを返します。
   * @throws {Error} APIコールに失敗した場合にエラーをスローします。
   */
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
