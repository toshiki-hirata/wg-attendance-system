import { axiosInstance } from '../api/axios';
import type { GetSampleResponse } from '../api/types';

export interface Attendance {
  date: string;
  start: string;
  break: string;
  restart: string;
  end: string;
}

export const punchClockRepository = {
  /**
   * 打刻情報を取得するためのAPIを呼び出します。
   * @returns {Promise<GetSampleResponse[]>} 打刻情報の配列、または空の配列を返します。
   * @throws {Error} APIコールに失敗した場合にエラーをスローします。
   */
  async fetchAttendanceHistory() {
    try {
      const response = await axiosInstance.get<GetSampleResponse>(
        '/attendances/history'
      );
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('打刻情報取得APIコールに失敗しました。', error);
      throw error;
    }
  },
  /**
   * 打刻情報を登録するためのAPIを呼び出します。
   * @param {Attendance} attendance - 登録する打刻データ。
   * @returns {Promise<any>} APIからのレスポンスデータを返します。
   * @throws {Error} APIコールに失敗した場合にエラーをスローします。
   */
  async submitAttendanceHistory(attendance: Attendance) {
    try {
      const response = await axiosInstance.post('/attendances', {
        date: attendance.date,
        startTime: attendance.start,
        endTime: attendance.end,
        breaks: [
          {
            start: attendance.break,
            end: attendance.restart,
          },
        ],
      });
      return response.data;
    } catch (error) {
      console.error('打刻情報登録APIコールに失敗しました。', error);
      throw error;
    }
  },
};
