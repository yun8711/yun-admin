import { store } from "@/store";

export const useGlobalStore = defineStore({
  id: "global",
  state: () => ({
    count: 0,
  }),
});

export function useGlobalStoreHook() {
  return useGlobalStore(store);
}
