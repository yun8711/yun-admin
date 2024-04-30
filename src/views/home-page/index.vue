<template>
  <div>首页</div>
  <div text-center font-sans p4>
    <div class="border border-1">
      <div class="i-fill:logo size-300"></div>
    </div>

    <!--<div class="i-ep:user size-300"></div>-->
    <div class="i-ep:reading size-300"></div>
    <div text-green5 text-20>Hello UnoCSS + Vue</div>
    <div text-blue text-30>Hello UnoCSS + Vue</div>
    <div class="i-icon:card size-16"></div>
    <div class="h-1500"></div>
    <!-- @unocss-skip-start -->
    <!--<div class="bg-[url(/assets/svg/fill/logo.svg)] bg-[url(/project_manage.svg)]"></div>-->
    <!-- @unocss-skip-end -->
    <el-button type="primary">测试</el-button>
  </div>
</template>

<script setup lang="ts" name="HomePage"></script>

<style scoped>
.border {
  display: inline-block;
  border: 1px solid #000;
}
</style>
