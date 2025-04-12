import { defineStore } from 'pinia';
import { axiosInstance } from '../api/axios';
import type { GetSampleResponse } from '../api/types';
import type { Attendance } from '../components/footer.component.vue';


export interface AttendanceState {
    attendanceHistory: Attendance[];
  }
  
  export const useAttendanceStore = defineStore('attendance.attendance', {
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
        },
        addAttendanceHistory(attendance: Attendance) {
            this.attendanceHistory.push(attendance); 
        },
        async postAttendance(attendance: Attendance) {
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
                console.error('POST request failed:', error);
                throw error;
            }
        },
    },
  });
  