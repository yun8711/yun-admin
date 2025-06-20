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
          keepAlive: true, // 是否缓存
          affix: true, // 是否固定标签
        },
      },
      {
        path: '/about',
        name: 'AboutPage',
        component: () => import('@/views/about-page/index.vue'),
        meta: {
          title: '关于',
          icon: 'i-fill:folder',
          // activePath: '/home',
        },
      },
      {
        path: '/error-info',
        name: 'ErrorInfo',
        component: () => import('@/views/error-info/index.vue'),
        meta: {
          title: '报错信息',
          icon: 'i-fill:folder',
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
  // 重定向页面
  {
    path: '/redirect/:path(.*)',
    name: 'Redirect',
    component: () => import('@/views/redirect-page.vue'),
    meta: {
      title: '重定向',
      hideMenu: true,
    },
  },
];
