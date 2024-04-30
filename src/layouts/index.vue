<template>
  <component :is="LayoutComponents[layout]"></component>
</template>

<script setup lang="ts" name="Layout">
import LayoutMixed from '@/layouts/layout-mixed/index.vue';
import LayoutTopNav from '@/layouts/layout-top-nav/index.vue';
import LayoutClassic from '@/layouts/layout-classic/index.vue';
// import { useResizeObserver } from '@vueuse/core';
import { getConfig } from '@/utils/config';
// import { useGlobalStoreHook } from '@/store/modules/global';

const LayoutComponents = {
  mixed: LayoutMixed,
  topNav: LayoutTopNav,
  classic: LayoutClassic,
};

const layout: string = getConfig('layout');

// const el = ref(null);

// useResizeObserver(el, entries => {
//   console.log('resize', entries);
//   const entry = entries[0];
//   const { width, height } = entry.contentRect;
// });
</script>

<style scoped lang="scss"></style>
