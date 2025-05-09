import { defineStore } from 'pinia';
import {
  overTimeRepository,
  type OverTime,
} from '../repositories/overTime.repository';

export const useOverTimeStore = defineStore('overTimeStore', {
  state: () => {
    return {
      overTimeList: [] as OverTime[],
      filteredOverTimeList: [] as OverTime[],
    };
  },
  persist: { storage: sessionStorage },
  getters: {},
  actions: {
    async fetchOverTimeInfo(userId: string) {
      this.overTimeList = [];

      const response = await overTimeRepository.fetchOverTime(null);

      this.overTimeList = response.map((item) => ({
        applicationDate: item.applicationDate.replace(/-/g, '/'),
        reviewer: item.reviewer,
        overTime: item.overTime,
        reason: item.reason,
      }));

      this.filteredOverTimeList = this.$state.overTimeList;
    },
    removeOverTimeInfo(date: string) {
      this.overTimeList = this.overTimeList.filter(
        (item) => item.applicationDate !== date
      );
    },
    addOverTimeInfo(submission: OverTime) {
      const index = this.overTimeList.findIndex(
        (item) => item.applicationDate === submission.applicationDate
      );

      if (index !== -1) {
        this.overTimeList[index] = submission;
      } else {
        this.overTimeList.push(submission);
      }
    },
    filterOverTimeInfo(condition: string) {
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
