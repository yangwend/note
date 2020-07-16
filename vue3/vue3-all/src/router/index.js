import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(), // 定义 hash 模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'), // 懒加载
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'), // 懒加载
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/Test.vue") // 懒加载
    },
    {
      path: "/mouse",
      name: "mouse",
      component: () => import("../views/Mouse.vue") // 懒加载
    }
  ]
});

export default router;