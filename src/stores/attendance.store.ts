import { defineStore } from 'pinia';
import { BUTTON_CONDITION } from '../components/primaryButton.component.vue';
import {
  punchClockRepository,
  type Attendance,
} from '../repositories/punchClock.repository';

export interface AttendanceState {
  attendanceHistory: Attendance[];
  startButton: BUTTON_CONDITION;
  breakButton: BUTTON_CONDITION;
  endButton: BUTTON_CONDITION;
}

export const useAttendanceStore = defineStore('attendance.attendance', {
  state: (): AttendanceState => ({
    attendanceHistory: [],
    startButton: BUTTON_CONDITION.ENABLED,
    breakButton: BUTTON_CONDITION.DISABLED,
    endButton: BUTTON_CONDITION.DISABLED,
  }),
  persist: { storage: sessionStorage },
  getters: {
    getAttendanceHistory: (state) => state.attendanceHistory,
  },
  actions: {
    async fetchAttendanceHistory() {
      const response = await punchClockRepository.fetchAttendanceHistory();
      this.attendanceHistory = response.map((item) => ({
        date: item.date,
        start: item.startTime,
        break: item.breaks[0]?.start || '',
        restart: item.breaks[0]?.end || '',
        end: item.endTime,
      }));
      // console.log('GET request successful:', this.attendanceHistory);
    },
    addAttendanceHistory(attendance: Attendance) {
      this.attendanceHistory.push(attendance);
    },
    async postAttendance(attendance: Attendance) {
      const response =
        await punchClockRepository.submitAttendanceHistory(attendance);
      return response;
    },
    start() {
      this.startButton = BUTTON_CONDITION.NOT_ENABLED;
      this.breakButton = BUTTON_CONDITION.ENABLED;
      this.endButton = BUTTON_CONDITION.ENABLED;
    },
    break() {
      this.startButton = BUTTON_CONDITION.ENABLED;
      this.breakButton = BUTTON_CONDITION.NOT_ENABLED;
      this.endButton = BUTTON_CONDITION.DISABLED;
    },
    end() {
      this.startButton = BUTTON_CONDITION.ENABLED;
      this.breakButton = BUTTON_CONDITION.DISABLED;
      this.endButton = BUTTON_CONDITION.DISABLED;
    },
  },
});
