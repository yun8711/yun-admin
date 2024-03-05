import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: '',
    // 后端返回的动态路由，后端已经过滤了权限，前端用来addRoutes
    // dynamicRoutes: [],
    // 菜单列表，经静态路由和动态路由处理后的菜单列表
    menuList: [],
  }),
  getters: {
    // 获取有权限的路由列表
    // getRoutesList: state => getShowMenuList(state.authMenuList),
  },
  actions: {
    login(token: string) {
      this.token = token;
    },
    logout() {
      this.token = '';
    },
  },
});
