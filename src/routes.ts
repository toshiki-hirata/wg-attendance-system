import { createRouter, createWebHistory } from 'vue-router';
import punchClockPage from '../src/pages/punchClockPage.vue';
import OverTimePage from '../src/pages/overTimePage.vue';
import ApiSamplePage from '../src/pages/apiSamplePage.vue';
import { SIDENAV_ITEM } from '../src/stores/sidenav.store';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: punchClockPage },
    { path: '/punchClock', component: punchClockPage },
    { path: '/overTime', component: OverTimePage },
    { path: '/apiSample', component: ApiSamplePage },
  ],
});

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
