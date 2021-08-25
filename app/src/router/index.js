import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/:any*',
    component: () => import('@/views/Back.vue'),
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    meta: { keepAlive: true },
  },
  {
    path: '/category',
    component: () => import('@/views/Category.vue'),
    meta: { keepAlive: true },
  },
  {
    path: '/cart',
    component: () => import('@/views/Cart.vue'),
    meta: { keepAlive: true },
  },
  {
    path: '/user',
    component: () => import('@/views/User.vue'),
    meta: { keepAlive: true },
  },
  {
    path: '/search',
    component: () => import('@/views/Search.vue'),
    beforeEnter(to) {
      if (to.query.length) {
        return { path: '/search-sult', query: to.query };
      }
      return true;
    },
  },
  {
    path: '/search-result',
    component: () => import('@/views/SearchResult.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
