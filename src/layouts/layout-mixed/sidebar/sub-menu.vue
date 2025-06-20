<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <el-icon size="14">
          <component :is="useIcon(subItem.meta.icon)" v-if="subItem.meta.icon"></component>
        </el-icon>
        <span class="text-12" :class="{ 'ml-6': !isCollapse }">{{ subItem.meta?.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children"></SubMenu>
    </el-sub-menu>
    <el-menu-item v-else :route="subItem" :index="subItem.path" @click="handleClickMenu(subItem)">
      <el-icon v-if="subItem.meta.icon" size="14">
        <component :is="useIcon(subItem.meta.icon)" v-if="subItem.meta.icon"></component>
      </el-icon>
      <div v-else class="w-12"></div>
      <template #title>
        <span class="text-12" :class="{ 'ml-6': !isCollapse }">{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { useIcon } from '@/hooks';
import { useRouter } from 'vue-router';
const router = useRouter();
import { useGlobalStoreHook } from '@/store/modules/global';
defineProps<{ menuList: Menu.MenuOptions[] }>();

const isCollapse = computed(() => {
  return useGlobalStoreHook().sidebar.status === 'collapsed';
});

const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank');
  router.push(subItem.path);
};
</script>

<style lang="scss"></style>
