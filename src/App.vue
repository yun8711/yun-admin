<template>
  <el-config-provider
    size="small"
    :z-index="2000"
    :button="{ autoInsertSpace: true }"
    :message="{ max: 5 }"
  >
    <router-view></router-view>
    <!--<ReDialog />-->
  </el-config-provider>
</template>

<script setup lang="ts">
//  我的注释
import { ref } from 'vue';
</script>

<style scoped></style>
