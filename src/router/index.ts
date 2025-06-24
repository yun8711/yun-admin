import { getConfig } from '@/utils/config';
import NProgress from '@/utils/nprogress';
import { initDynamicRouter } from '@/router/dynamic-routes';
// import { useAuthStoreHook } from '@/store/modules/auth';
import { usePermissionStoreHook } from '@/store/modules/permission';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { rootRoute } from './static-routes';
import type { RouteItemType } from '../../types/router';

/** 路由白名单 */
const ROUTER_WHITE_LIST = ['/login'];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: rootRoute as unknown as RouteRecordRaw[],
  strict: true, // 禁止尾部斜线
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async (to: ToRouteType, _from, next) => {
  // console.log('to', to);
  // console.log('_from', _from);
  usePermissionStoreHook().viewOperate(to as RouteItemType, 'add');
  // if (to.meta?.keepAlive) {
  //   // 页面整体刷新和点击标签页刷新
  //   // if (_from.name === undefined || _from.name === 'Redirect') {
  //   // if (_from.name === 'Redirect') {
  //   usePermissionStoreHook().cacheOperate(to as RouteItemType);
  //   // }
  // }
  // const userInfo = storageLocal().getItem<DataInfo<number>>(userKey);

  // 1.NProgress 开始
  NProgress.start();

  // 2.动态设置标题
  // const title = import.meta.env.VITE_GLOB_APP_TITLE;
  const websiteTitle = getConfig('title');
  document.title = to.meta.title ? `${to.meta.title} - ${websiteTitle}` : websiteTitle;

  // 3.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
  // if (to.path.toLocaleLowerCase() === LOGIN_URL) {
  //   if (userStore.token) return next(from.fullPath);
  //   resetRouter();
  //   return next();
  // }

  // 4.判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
  if (ROUTER_WHITE_LIST.includes(to.path)) return next();

  // 5.判断是否有 Token，没有重定向到 login 页面
  // if (!userStore.token) return next({ path: LOGIN_URL, replace: true });

  // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!usePermissionStoreHook().menuList.length) {
    await initDynamicRouter();
    return next({ ...to, replace: true });
  }

  next();
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  NProgress.done();
  console.warn('路由错误', error.message);
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});

export default router;
