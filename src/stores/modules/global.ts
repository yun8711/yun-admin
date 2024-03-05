import { store } from 'src/stores';

export const useGlobalStore = defineStore({
  id: 'global',
  state: () => ({
    count: 0,
  }),
});

export function useGlobalStoreHook() {
  return useGlobalStore(store);
}
