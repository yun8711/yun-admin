<template>
  <div class="page-view">
    <el-scrollbar always>
      <!--<Breadcrumb></Breadcrumb>-->
      <router-view></router-view>
    </el-scrollbar>
  </div>
  <el-backtop
    :right="24"
    :bottom="24"
    :visibility-height="100"
    target=".page-view .el-scrollbar__wrap"
  ></el-backtop>
</template>

<script setup lang="ts">
import Breadcrumb from '@/layouts/components/breadcrumb.vue';
</script>

<style scoped>
.page-view {
  position: relative;
  height: 100%;
  overflow-y: auto;
}
</style>
