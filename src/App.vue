<template>
  <div id="app">
    123
    <div class="border-1">测试</div>

    <div text-center font-sans p4>
      <div logo />
      <div text-green5 text-lg>Hello UnoCSS + Vue</div>
      <div text-blue text-lg>Hello UnoCSS + Vue</div>
      <div i-custom-card />
      <div i-custom-folder />
      <div i-custom-project_manage size-20 />
      <!-- @unocss-skip-start -->
      <div class="bg-[url(../src/logo.svg)] bg-[url(/project_manage.svg)]" />
      <!-- @unocss-skip-end -->
    </div>
  </div>
</template>

<script setup lang="ts">
//  我的注释
import { ref } from "vue";
</script>

<style scoped></style>
