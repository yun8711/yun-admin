<template>
  <div>首页</div>
  <div text-center font-sans p4>
    <div logo></div>
    <div text-green5 text-lg>Hello UnoCSS + Vue</div>
    <div text-blue text-lg>Hello UnoCSS + Vue</div>
    <div i-custom-card></div>
    <div i-custom-folder></div>
    <div i-custom-project_manage size-20></div>
    <!-- @unocss-skip-start -->
    <div class="bg-[url(../src/logo.svg)] bg-[url(/project_manage.svg)]"></div>
    <!-- @unocss-skip-end -->
    <el-button type="primary">测试</el-button>
  </div>
</template>

<script setup lang="ts" name="HomePage"></script>

<style scoped></style>
