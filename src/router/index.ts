import { createRouter, createWebHistory } from 'vue-router';

// 路由懒加载 按需加载
const routes = [
  {
    path: '/',
    name: 'tasks',
    component: () => import('../pages/Tasks/index.vue'),
  },
  {
    path: '/task/:id',
    name: 'task',
    component: () => import('../pages/Task/index.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory('/CICD/'),
  routes,
});
