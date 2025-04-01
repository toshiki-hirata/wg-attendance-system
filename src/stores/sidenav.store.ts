import { defineStore } from 'pinia';

export enum SIDENAV_ITEM {
  PUNCK_CLOCH = '打刻',
  OVER_TIME = '残業確認',
}

export interface SideNavState {
  currentItem: string;
}

export const useSideNavStore = defineStore('attendance.sidenav', {
  state: (): SideNavState => ({
    currentItem: SIDENAV_ITEM.PUNCH_CLOCK,
  }),
  persist: { storage: sessionStorage },
  getters: {},
  actions: {
    setCurrentItem(item: SIDENAV_ITEM) {
      this.currentItem = item;
    },
  },
});
