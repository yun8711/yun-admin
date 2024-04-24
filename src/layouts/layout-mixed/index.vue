<template>
  <el-container class="mixed-layout">
    <el-header height="50px" class="z-10">
      <Navbar></Navbar>
    </el-header>
    <el-container class="mixed-layout__container">
      <SidebarVertical></SidebarVertical>
      <el-main>
        <PageView></PageView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="LayoutMixed">
import PageView from '../components/page-view.vue';
import Navbar from '../components/navbar/index.vue';
import SidebarVertical from '../components/sidebar/vertical.vue';
import Breadcrumb from '../components/breadcrumb.vue';
</script>

<style scoped lang="scss">
.mixed-layout {
  position: relative;
  width: 100%;
  height: 100vh;

  :deep(.el-header) {
    padding: 0;
  }

  :deep(.el-main) {
    box-sizing: border-box;
    padding: 0;
  }

  &__container {
    position: relative;
    height: calc(100% - 50px);

    :deep(.el-aside) {
      box-sizing: border-box;
      border-right: 1px solid #eee;
    }
  }
}
</style>
