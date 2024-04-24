<template>
  <component :is="LayoutComponents[layout]"></component>
</template>

<script setup lang="ts" name="Layout">
import LayoutMixed from '@/layouts/layout-mixed/index.vue';
import LayoutTopNav from '@/layouts/layout-top-nav/index.vue';
import LayoutClassic from '@/layouts/layout-classic/index.vue';
import { getConfig } from '@/utils/config';

const LayoutComponents = {
  mixed: LayoutMixed,
  topNav: LayoutTopNav,
  classic: LayoutClassic,
};

const layout: string = getConfig('Layout');
</script>

<style scoped lang="scss"></style>
