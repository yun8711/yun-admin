<template>
  <div class="navbar box-border flex flex-items-center space-x-16">
    <div class="navbar_logo px-20 box-border box-center">
      <!--      {{ title }}-->
      <el-image style="width: 100px" :src="logoImg" fit="fill"></el-image>
    </div>

    <div class="navbar_function flex-1"></div>
    <div class="i-icon:notice size-18 cursor-pointer"></div>
    <div class="i-icon:full-screen size-16 cursor-pointer" @click="toggle"></div>
    <div class="i-icon:language size-18 cursor-pointer"></div>
    <UserPopover></UserPopover>
  </div>
</template>

<script setup lang="ts" name="Navbar">
import UserPopover from './user-popover.vue';
import { useAuthStoreHook } from '@/store/modules/auth';
import { useFullscreen } from '@vueuse/core';
const { userInfo } = useAuthStoreHook();
const { toggle } = useFullscreen();
import { getConfig } from '@/utils/config';
import logoImg from '@/assets/images/logo.png';
const config = getConfig();
const title = ref(config.title);
</script>

<style scoped lang="scss">
.navbar {
  height: var(--header-height);
  border-bottom: 1px solid #eee;

  .navbar_logo {
    width: 200px;
    height: 100%;
    font-size: 20px;
    font-weight: 600;
    color: transparent;
    background-color: #f5f5f5;
    background-image: linear-gradient(to right, #9cecfb, #65c7f7, #0052d4);
    background-clip: text;
  }
}
</style>
