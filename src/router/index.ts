import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layouts/index.vue";
// import MixedLayout from "@/layouts/mixed-layout/index.vue";
// import TopNavLayout from "@/layouts/top-nav-layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Layout,
      redirect: "/test",
      children: [
        {
          path: "test",
          name: "TestPage",
          component: () => import("@/views/test-page/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "LoginPage",
      component: () => import("../views/login-page/index.vue"),
    },
    {
      path: "/home",
      name: "HomePage",
      component: () => import("../views/home-page/index.vue"),
    },
  ],
});

export default router;
