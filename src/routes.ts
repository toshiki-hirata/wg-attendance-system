import { createRouter, createWebHistory } from 'vue-router';
import PunchClockPage from '../src/pages/punchClockPage.vue';
import OverTimePage from '../src/pages/overTimePage.vue';
import ApiSamplePage from '../src/pages/apiSamplePage.vue';
import { SIDENAV_ITEM } from '../src/stores/sidenav.store';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PunchClockPage },
    /**
     * `/punchClock` のパスに打刻画面をマッピングします。
     * 例: `http://localhost:4000/punchClock`
     */
    { path: '/punchClock', component: PunchClockPage },
    { path: '/overTime', component: OverTimePage },
    { path: '/apiSample', component: ApiSamplePage },
  ],
});

/**
 * 列挙型 `SIDENAV_ITEM` から対応するパス文字列に変換します。
 * @param {SIDENAV_ITEM} item - 変換するサイドナビゲーションアイテム。
 * @returns {string} 変換されたパス文字列。
 */
export const getItemPath = (item: SIDENAV_ITEM): string => {
  switch (item) {
    case SIDENAV_ITEM.PUNCH_CLOCK:
      return '/punchClock';
    case SIDENAV_ITEM.OVER_TIME:
      return '/overTime';
    default:
      return '/';
  }
};
