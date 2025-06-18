import { createRouter, createWebHistory } from 'vue-router';
import PunchClockPage from '../src/pages/punchClockPage.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PunchClockPage },
    /**
     * `/punchClock` のパスに打刻画面をマッピングします。
     * 例: `http://localhost:4000/punchClock`
     */
    { path: '/punchClock', component: PunchClockPage },
  ],
});
