<template>
  <div class="layout-sidebar">
    <el-scrollbar class="flex-1">
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activePath"
        :style="{ '--el-menu-base-level-padding': menuItemPadding + 'px' }"
      >
        <SubMenu :menu-list="menuList"></SubMenu>
      </el-menu>
    </el-scrollbar>
    <div class="aside-foot" @click="triggerCollapse">
      <el-tooltip class="box-item" effect="dark" content="点击折叠" placement="right">
        <i v-show="!isCollapse" class="i-ep:fold mr-8"></i>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="点击展开" placement="right">
        <i v-show="isCollapse" class="i-ep:expand"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts" name="Sidebar">
import { usePermissionStoreHook } from '@/store/modules/permission';
import SubMenu from './sub-menu.vue';
import { useGlobalStoreHook } from '@/store/modules/global';
import { getConfig } from '@/utils/config';
const route = useRoute();
const menuList = shallowRef(usePermissionStoreHook().menuList);

const activePath = ref('');

watch(
  () => route,
  val => {
    activePath.value = val.meta?.activePath ?? val.path;
  },
  {
    immediate: true,
    deep: true,
  }
);

const isCollapse = computed(() => {
  return useGlobalStoreHook().sidebar.status === 'collapsed';
});
const triggerCollapse = () => {
  useGlobalStoreHook().setSidebarStatus(isCollapse.value ? 'expanded' : 'collapsed');
};

// 菜单项左右内边距
const menuItemPadding = (getConfig().sidebar.collapseWidth - 24) / 2;
</script>

<style scoped lang="scss">
.layout-sidebar {
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  border-right: 1px solid #eee;

  &:hover {
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 10%),
      0 1px 2px -1px rgb(0 0 0 / 10%);
  }

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
}
</style>
