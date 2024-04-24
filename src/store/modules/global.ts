import { store } from '@/store';

export const useGlobalStore = defineStore({
  id: 'global',
  state: () => ({
    isCollapse: false,
  }),
  actions: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
});

export function useGlobalStoreHook() {
  return useGlobalStore(store);
}
