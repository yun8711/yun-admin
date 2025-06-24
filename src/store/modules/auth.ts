import { defineStore } from 'pinia';
import { store } from '@/store';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: '',

    userInfo: {
      username: '',
    },
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

export function useAuthStoreHook() {
  return useAuthStore(store);
}
