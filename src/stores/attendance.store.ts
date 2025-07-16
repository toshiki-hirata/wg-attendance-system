import { defineStore } from 'pinia';
import { BUTTON_CONDITION } from '../components/primaryButton.component.vue';
import {
  punchClockRepository,
  type Attendance,
} from '../repositories/punchClock.repository';

export interface AttendanceState {
  // 打刻時刻のリスト
  attendanceHistory: Attendance[];
  // 勤務開始ボタンの状態
  startButton: BUTTON_CONDITION;
  // 休憩開始ボタンの状態
  breakButton: BUTTON_CONDITION;
  // 勤務終了ボタンの状態
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
  getters: {},
  actions: {
    /**
     * 打刻時間をAPIから取得します。
     */
    async fetchAttendanceHistory() {
      // TODO: Implement it
    },
    /**
     * 指定された打刻時間をストアの`attendanceHistory`に追加します。
     * @param {Attendance} attendance - 追加する打刻時間データ。
     */
    addAttendanceHistory(attendance: Attendance) {
      this.attendanceHistory.push(attendance);
    },
    /**
     * 打刻時間をAPIで登録します。
     * @param {Attendance} attendance - 登録する打刻時間データ。
     * @returns {Promise<any>} APIからのレスポンス。
     */
    async postAttendance(attendance: Attendance) {
      const response =
        await punchClockRepository.submitAttendanceHistory(attendance);
      return response;
    },
    /**
     * ストアの各ボタンの状態を「勤務開始後」の状態に更新します。
     */
    start() {
      this.startButton = BUTTON_CONDITION.NOT_ENABLED;
      this.breakButton = BUTTON_CONDITION.ENABLED;
      this.endButton = BUTTON_CONDITION.ENABLED;
    },
    /**
     * ストアの各ボタンの状態を「休憩中」の状態に更新します。
     */
    break() {
      this.startButton = BUTTON_CONDITION.ENABLED;
      this.breakButton = BUTTON_CONDITION.NOT_ENABLED;
      this.endButton = BUTTON_CONDITION.DISABLED;
    },
    /**
     * ストアの各ボタンの状態を「勤務開始前」の状態に更新します。
     */
    end() {
      this.startButton = BUTTON_CONDITION.ENABLED;
      this.breakButton = BUTTON_CONDITION.DISABLED;
      this.endButton = BUTTON_CONDITION.DISABLED;
    },
  },
});
