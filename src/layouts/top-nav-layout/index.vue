<template>
  <el-container class="top-nav-layout">
    <el-header>
      <Navbar></Navbar>
    </el-header>
    <el-main>
      <PageView></PageView>
    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="TopNavLayout">
import Navbar from '../components/navbar/index.vue';
import PageView from '../components/PageView.vue';
</script>

<style lang="scss" scoped>
.top-nav-layout {
  width: 100%;
  height: 100vh;

  :deep(.el-header) {
    padding: 0;
  }

  :deep(.el-main) {
    box-sizing: border-box;
    padding: 0;
  }
}
</style>
