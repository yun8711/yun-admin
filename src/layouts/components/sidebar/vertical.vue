<template>
  <el-aside :width="isCollapse ? '65px' : '200px'" class="flex flex-col hover:shadow">
    <el-scrollbar class="flex-1">
      <el-menu :collapse="isCollapse" :collapse-transition="false" :default-active="activeMenu">
        <SubMenu :menu-list="menuList"></SubMenu>
      </el-menu>
    </el-scrollbar>
    <div class="aside-foot" @click="triggerCollapse">
      <i v-show="!isCollapse" class="i-ep:fold mr-8"></i>
      <i v-show="isCollapse" class="i-ep:expand"></i>
      {{ isCollapse ? '' : '收起' }}
    </div>
  </el-aside>
</template>

<script setup lang="ts" name="SidebarVertical">
import SubMenu from '@/layouts/components/sidebar/SubMenu.vue';
import { useAuthStore } from '@/stores/modules/auth';
import { useGlobalStore } from '@/stores/modules/global';
const route = useRoute();
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const menuList = shallowRef(authStore.menuList);

const activeMenu = ref<string>(route.meta.activePath ? route.meta.activePath : route.path);

const isCollapse = computed(() => {
  return globalStore.isCollapse;
});

const triggerCollapse = () => {
  globalStore.toggleCollapse();
};
</script>

<style scoped lang="scss">
:deep(.el-menu) {
  border-right-style: none;
  border-right-width: 0;

  .el-sub-menu__title {
    height: 50px;
    line-height: 50px;
  }
}

.aside-foot {
  height: 50px;
  padding: 0 20px;
  line-height: 50px;
  cursor: pointer;
  border-top: 1px solid #f0f0f0;
}
</style>
