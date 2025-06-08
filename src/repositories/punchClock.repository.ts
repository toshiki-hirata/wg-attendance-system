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
