<template>
  <el-container class="classic-layout">
    <el-aside width="200px">
      <SidebarVertical></SidebarVertical>
    </el-aside>
    <el-main>
      <PageView></PageView>
    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="LayoutClassic">
import PageView from '../layout-mixed/page-view.vue';
import SidebarVertical from '@/layouts/layout-mixed/sidebar/sidebar.vue';
</script>

<style scoped lang="scss">
.classic-layout {
  position: relative;
  width: 100%;
  height: 100vh;

  :deep(.el-aside) {
    box-sizing: border-box;
    border-right: 1px solid #eee;
  }

  :deep(.el-main) {
    box-sizing: border-box;
    padding: 0;
  }
}
</style>
