import type { RouteItemType } from '../../types/router';

export const rootRoute: RouteItemType[] = [
  {
    path: '/',
    redirect: '/login',
    name: 'Root',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '/home',
        name: 'HomePage',
        component: () => import('@/views/home-page/index.vue'),
        meta: {
          title: '首页',
          icon: 'i-fill:folder',
          activePath: '/home',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/login-page/index.vue'),
    meta: {
      title: '登录',
      hideMenu: true,
    },
  },
];
