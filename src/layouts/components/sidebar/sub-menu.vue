<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <el-icon size="14">
        <component :is="useIcon(subItem.meta.icon)" v-if="subItem.meta.icon"></component>
      </el-icon>
      <template #title>
        <span class="text-12" :class="{ 'ml-6': !isCollapse }">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children"></SubMenu>
    </el-sub-menu>
    <el-menu-item v-else :route="subItem" :index="subItem.path" @click="handleClickMenu(subItem)">
      <el-icon size="14">
        <component :is="useIcon(subItem.meta.icon)" v-if="subItem.meta.icon"></component>
      </el-icon>
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
import { useGlobalStore } from '@/stores/modules/global';
const globalStore = useGlobalStore();
defineProps<{ menuList: Menu.MenuOptions[] }>();

const isCollapse = computed(() => {
  return globalStore.isCollapse;
});

const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank');
  router.push(subItem.path);
};
</script>

<style lang="scss"></style>
