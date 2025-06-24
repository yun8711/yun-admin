import { store } from '@/store';
import type { globalType } from '../types';

export const useGlobalStore = defineStore('global', {
  state: (): globalType => ({
    sidebar: {
      status: 'expanded', // 侧边栏状态：expanded，collapsed,hidden
    },
    viewportSize: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    },
  }),
  actions: {
    setSidebarStatus(status: 'expanded' | 'collapsed' | 'hidden') {
      this.sidebar.status = status;
    },
    setViewportSize({ width, height }) {
      if (width) this.viewportSize.width = width;
      if (height) this.viewportSize.height = height;
    },
  },
});

export function useGlobalStoreHook() {
  return useGlobalStore(store);
}
