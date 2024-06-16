import router from '@/router';
// import { useAuthStore } from '@/store/modules/auth';
import { getDynamicRoutesApi } from '@/api/global';
import { usePermissionStoreHook } from '@/store/modules/permission';
import type { RouteRecordRaw } from 'vue-router';
import type { DynamicRouteItemType, RouteItemType } from '../../types/router';
import * as allViews from '@/views';
import { rootRoute } from '@/router/static-routes';

/**
 * 初始化动态路由
 */
export async function initDynamicRouter() {
  // const authStore = useAuthStore();
  try {
    // const routeComponents = import.meta.glob('@/views/**/*.vue');
    // console.log('routeComponents', routeComponents);

    // 1.获取动态路由列表
    const { data } = await getDynamicRoutesApi();
    // 2.把动态路由列表转换成vue-router对象数组
    const dynamicRoutes = convertToRoutes(data);
    // console.log('dynamicRoutes', dynamicRoutes);
    // 3.把动态路由添加到根路由下
    dynamicRoutes.forEach(route => {
      router.addRoute('Root', route as RouteRecordRaw);
    });
    // 4.组合出全部二级路由
    const allRoutes: RouteItemType[] = rootRoute[0].children.concat(dynamicRoutes);
    console.log('allRoutes', allRoutes);
    // 5.把动态路由转换成树形结构，用于菜单显示
    const menuList = routeToMenu(allRoutes);
    // console.log('menuList', menuList);
    usePermissionStoreHook().setMenuList(menuList);
    // return { dynamicRoutes, menuList };
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * 把后端返回的动态路由转换成 vue-router 对象数组
 * @param routes
 */
function convertToRoutes(routes: DynamicRouteItemType[]): RouteItemType[] {
  return routes.map(route => {
    return {
      path: route.path,
      name: route.name,
      redirect: route?.redirect,
      component: allViews[route.component],
      meta: {
        title: route?.title,
        icon: route?.icon,
        hideMenu: route?.hideMenu ?? false,
        permissions: route.permissions,
        keepAlive: route.keepAlive ?? false,
        activePath: route.activePath ?? route.path,
        externalLink: route.externalLink ?? '',
        rank: route?.rank ?? 0,
        parentName: route.parentName,
      },
    };
  });
}

/**
 * 把路由列表转换成菜单列表
 * @param routes
 */
function routeToMenu(routes: RouteItemType[]): RouteItemType[] {
  const map: Record<string, RouteItemType> = {};
  const result: RouteItemType[] = [];

  // 首先，将所有的路由添加到 map 中
  routes.forEach(route => {
    map[route.name] = { ...route, children: [] };
  });

  // 然后，遍历 map 来构建树形结构
  for (const name in map) {
    const route = map[name];
    // 隐藏的路由不添加到菜单中
    if (route.meta?.hideMenu) continue;
    if (route.meta?.parentName) {
      const parent = map[route.meta.parentName];
      if (parent) {
        parent.children.push(route);
      }
    } else {
      result.push(route);
    }
  }

  return sortMenus(result);
}

// 同级菜单排序
function sortMenus(menus: RouteItemType[]): RouteItemType[] {
  // 对当前级别的菜单进行排序
  menus.sort((a, b) => (a.meta?.rank ?? 0) - (b.meta?.rank ?? 0));

  // 对每个子菜单进行递归排序
  menus.forEach(menu => {
    if (menu.children.length > 0) {
      sortMenus(menu.children);
    }
  });

  return menus;
}
