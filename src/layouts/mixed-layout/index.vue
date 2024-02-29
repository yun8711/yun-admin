<template>
  <el-container class="mixed-layout">
    <el-header height="50px">
      <Navbar></Navbar>
    </el-header>
    <el-container class="mixed-layout__container">
      <el-aside width="200px">
        <SidebarVertical></SidebarVertical>
      </el-aside>
      <el-main>
        <PageView></PageView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="MixedLayout">
import PageView from "@/layouts/components/PageView.vue";
import Navbar from "../components/Navbar.vue";
import SidebarVertical from "@/layouts/components/sidebar/vertical.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
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
