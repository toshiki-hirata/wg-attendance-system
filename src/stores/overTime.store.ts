import { defineStore } from 'pinia';
import {
  overTimeRepository,
  type OverTimeList,
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
    fetchOverTimeInfo(userId: string) {
      this.overTimeList = [];
      const mockResponse: OverTimeList = {
        overTimeList: [
          {
            applicationDate: '2025/01/02',
            reviewer: '山田 太郎',
            overTime: '1.0h',
            reason: '超過報告画面実装1',
          },
          {
            applicationDate: '2025/02/02',
            reviewer: '山田 太郎',
            overTime: '2.0h',
            reason: '超過報告画面実装2',
          },
          {
            applicationDate: '2025/03/02',
            reviewer: '山田 太郎',
            overTime: '3.0h',
            reason: '超過報告画面実装3',
          },
        ],
      };
      const response = mockResponse;
      //TODO: APIコールして、Stateに格納
      //overTimeRepository.fetchOverTime;

      for (const overTimeItem of response.overTimeList) {
        const tmpItem = {
          applicationDate: overTimeItem.applicationDate,
          reviewer: overTimeItem.reviewer,
          overTime: overTimeItem.overTime,
          reason: overTimeItem.reason,
        };

        this.overTimeList.push(tmpItem);
      }
      this.filteredOverTimeList = this.$state.overTimeList;
    },
    removeOverTimeInfo(date: string) {
      this.overTimeList = this.overTimeList.filter(
        (item) => item.applicationDate !== date
      );
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
