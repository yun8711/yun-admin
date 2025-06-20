import { store } from '@/store';
import type { RouteItemType } from '../../../types/router';
import router from '@/router';
// import type { permissionType } from '../types';

export const usePermissionStore = defineStore({
  id: 'shortcut',
  state: () => ({
    // shortcutList: [],
    // 静态路由生成的菜单
    // constantMenus,
    // 后端返回的动态路由，后端已经过滤了权限，前端用来addRoutes
    // dynamicRoutes: [],
    // 整体路由生成的菜单（静态、动态）
    menuList: [],
    // 整体路由（一维数组格式）
    flatteningRoutes: [],
    // 所有访问过的页面
    viewList: [],
    // 缓存页面keepAlive
    cachedList: [],
    // 当前激活的页面
    activeView: {} as RouteItemType,
  }),
  actions: {
    /** 缓存页面操作 */
    setMenuList(list: RouteItemType[]) {
      this.menuList = list;
      const routes = router.getRoutes();
      this.viewList = routes.filter(v => v.meta?.affix);
    },
    /** 访问历史页面操作 */
    viewOperate(route: RouteItemType | RouteItemType[], operate = 'add') {
      const index = this.viewList.findIndex(v => v.name === route?.name);
      if (operate === 'add') {
        if ((!Array.isArray(route) && route?.name === 'Redirect') || route.path === '/redirect')
          return;
        index === -1 && this.viewList.push(route);
      }
      if (operate === 'delete') {
        index !== -1 && !route?.meta?.affix && this.viewList.splice(index, 1);
        if (route.name === this.activeView.name) {
          router.push(this.viewList[this.viewList.length - 1].path);
        }
      }
      if (operate === 'deleteBranch') {
        const deleteViewNames = route instanceof Array ? route.map(v => v.name) : [route.name];
        this.viewList = this.viewList.filter(
          v => v.meta?.affix && !deleteViewNames.includes(v.name)
        );
      }

      if (operate === 'deleteAll') {
        this.viewList = this.viewList.filter(v => v.meta?.affix);
      }

      this.activeView = route;
      this.cacheOperate(route, operate);
    },
    /** 缓存页面操作 */
    cacheOperate(route: RouteItemType, operate = 'add') {
      const index = this.cachedList.findIndex(v => v === route.name);
      if (operate === 'add' && route.meta?.keepAlive && index === -1) {
        this.cachedList.push(route.name);
      }
      if (operate === 'delete') {
        index !== -1 && this.cachedList.splice(index, 1);
      }
      if (operate === 'refresh') {
        index !== -1 && this.cachedList.splice(index, 1);
      }
    },
    /** 清空缓存页面 */
    clearCache() {
      this.cachedList = [];
    },
  },
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
