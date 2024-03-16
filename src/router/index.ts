import { createMemoryHistory, createRouter } from 'vue-router';

import IndexPage from '../views/IndexPage.vue';
import AppLayout from '../layouts/AppLayout.vue';

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [{ path: '', component: IndexPage }],
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
export default router;
