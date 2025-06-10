import { defineStore } from 'pinia';
import {
  overTimeRepository,
  type OverTime,
} from '../repositories/overTime.repository';

export const useOverTimeStore = defineStore('overTimeStore', {
  state: () => {
    return {
      // 残業申請リスト（全件）
      overTimeList: [] as OverTime[],
      // 残業申請リスト（月単位のフィルター結果リスト）
      filteredOverTimeList: [] as OverTime[],
    };
  },
  persist: { storage: sessionStorage },
  getters: {},
  actions: {
    /**
     * 残業申請をAPIから取得し、ストアに格納します。
     * @param {string} userId - ユーザーID。
     */
    async fetchOverTimeInfo(userId: string) {
      this.overTimeList = [];

      const response = await overTimeRepository.fetchOverTime(userId);

      this.overTimeList = response.map((item) => ({
        applicationDate: item.applicationDate.replace(/-/g, '/'),
        reviewer: item.reviewer,
        overTime: item.overTime,
        reason: item.reason,
      }));

      this.filteredOverTimeList = this.overTimeList;
    },
    /**
     * 残業申請をAPIで登録します。
     * @param {OverTime} overTime - 登録する残業申請データ。
     */
    async postOverTimeInfo(overTime: OverTime) {
      await overTimeRepository.submitOvertime(overTime);
    },
    /**
     * 特定日の残業申請をストアから削除します。
     * @param {string} date - 削除する残業申請の日付。
     */
    removeOverTimeInfo(date: string) {
      this.overTimeList = this.overTimeList.filter(
        (item) => item.applicationDate !== date
      );
    },
    /**
     * 残業申請をストアに追加します。
     * 同じ日に申請済みの残業申請があれば、該当の申請を今回の申請で置き換えます。
     * @param {OverTime} submission - 追加する残業申請データ。
     */
    addOverTimeInfo(submission: OverTime) {
      // 同じ日に申請済みの残業申請を検索する
      const index = this.overTimeList.findIndex(
        (item) => item.applicationDate === submission.applicationDate
      );
      // 同じ日に申請済みの残業申請があれば、該当の申請を今回の申請で置き換える
      if (index !== -1) {
        this.overTimeList[index] = submission;
      } else {
        this.overTimeList.push(submission);
      }
    },
    /**
     * 特定月の残業申請のみをフィルターしてストアに格納します。
     * @param {string} condition - フィルター条件となる年月（例: '2025/06'）。
     */
    filterOverTimeInfo(condition: string) {
      // フィルター条件がない場合は、全残業申請をフィルター結果に保持する
      if (condition == null || condition.length === 0) {
        this.filteredOverTimeList = this.overTimeList;
      } else {
        this.filteredOverTimeList = this.overTimeList.filter((item) =>
          item.applicationDate.startsWith(condition)
        );
      }
    },
  },
});
