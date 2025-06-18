import { defineStore } from 'pinia';
import { BUTTON_CONDITION } from '../components/primaryButton.component.vue';

export interface AttendanceState {
  // 勤務開始ボタンの状態
  startButton: BUTTON_CONDITION;
  // 休憩開始ボタンの状態
  breakButton: BUTTON_CONDITION;
  // 勤務終了ボタンの状態
  endButton: BUTTON_CONDITION;
}

export const useAttendanceStore = defineStore('attendance.attendance', {
  state: (): AttendanceState => ({
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
