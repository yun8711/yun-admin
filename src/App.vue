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
  <!--<div class="border-1">测试</div>-->

  <!--<div text-center font-sans p4>-->
  <!--  <div logo />-->
  <!--  <div text-green5 text-lg>Hello UnoCSS + Vue</div>-->
  <!--  <div text-blue text-lg>Hello UnoCSS + Vue</div>-->
  <!--  <div i-custom-card />-->
  <!--  <div i-custom-folder />-->
  <!--  <div i-custom-project_manage size-20 />-->
  <!--  &lt;!&ndash; @unocss-skip-start &ndash;&gt;-->
  <!--  <div class="bg-[url(../src/logo.svg)] bg-[url(/project_manage.svg)]" />-->
  <!--  &lt;!&ndash; @unocss-skip-end &ndash;&gt;-->
  <!--  <el-button type="primary">测试</el-button>-->
  <!--</div>-->
</template>

<script setup lang="ts">
//  我的注释
import { ref } from "vue";
</script>

<style scoped></style>
