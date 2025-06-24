<template>
  <el-config-provider
    size="small"
    :z-index="2000"
    :button="{ autoInsertSpace: true }"
    :message="{ max: 5 }"
    :locale="zhCn"
  >
    <router-view></router-view>
    <!--<ReDialog />-->
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<style scoped></style>
