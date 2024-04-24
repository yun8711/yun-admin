<template>
  <component :is="LayoutComponents[layout]"></component>
</template>

<script setup lang="ts" name="Layout">
import MixedLayout from '@/layouts/mixed-layout/index.vue';
import TopNavLayout from '@/layouts/top-nav-layout/index.vue';
import ClassicLayout from '@/layouts/classic-layout/index.vue';
import { getConfig } from '@/utils/config';

const LayoutComponents = {
  mixed: MixedLayout,
  topNav: TopNavLayout,
  classic: ClassicLayout,
};

const layout: string = getConfig('Layout');
</script>

<style scoped lang="scss"></style>
