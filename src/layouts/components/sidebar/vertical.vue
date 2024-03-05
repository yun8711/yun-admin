<template>
  <el-scrollbar>
    <el-menu :collapse-transition="false" :default-active="activeMenu">
      <SubMenu :menu-list="menuList"></SubMenu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts" name="SidebarVertical">
import SubMenu from '@/layouts/components/sidebar/SubMenu.vue';
import { useAuthStore } from '@/stores/modules/auth';
const route = useRoute();

const authStore = useAuthStore();
const menuList = shallowRef(authStore.menuList);

const activeMenu = ref<string>(route.meta.activePath ? route.meta.activePath : route.path);
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
</style>
