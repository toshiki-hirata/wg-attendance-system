import { defineStore } from 'pinia';
import { axiosInstance } from '../api/axios';
import type { GetSampleResponse } from '../api/types';
import type { Attendance } from '../components/footer.component.vue';


export interface AttendanceState {
    attendanceHistory: Attendance[];
  }
  
  export const useAttendanceStore = defineStore('attendance.loading', {
    state: (): AttendanceState => ({
        attendanceHistory: [],
    }),
    persist: { storage: sessionStorage },
    getters: {
        getAttendanceHistory: (state) => state.attendanceHistory,
    },
    actions: {
        async fetchAttendanceHistory() {
            try {
                const response = await axiosInstance.get<GetSampleResponse>('/attendances/history');
                const dataArray = Array.isArray(response.data) ? response.data : [];
                this.attendanceHistory = dataArray.map(item => ({
                    date: item.date,
                    start: item.startTime,
                    break: item.breaks[0]?.start || '',
                    restart: item.breaks[0]?.end || '',
                    end: item.endTime,
                }));
                // console.log('GET request successful:', this.attendanceHistory);
              } catch (error) {
                console.error('GET request failed:', error);
              }
        }
    },
  });
  