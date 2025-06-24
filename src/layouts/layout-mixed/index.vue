<template>
  <div
    ref="el"
    class="mixed-layout"
    :style="{
      '--sidebar-width': isCollapse ? collapseWidth + 'px' : expandWidth + 'px',
      '--collapse-width': collapseWidth + 'px',
      '--expand-width': expandWidth + 'px',
      '--header-height': headerHeight + 'px',
      '--shortcut-nav-height': shortcutNav.show ? shortcutNav.height + 'px' : '0',
    }"
  >
    <div class="layout-head">
      <Navbar></Navbar>
    </div>
    <div class="layout-container">
      <Sidebar></Sidebar>
      <div class="layout-main">
        <ShortcutNav></ShortcutNav>
        <!--<div>Height: {{ height }} Width: {{ width }} containerHeight:{{ containerHeight }}</div>-->
        <PageView></PageView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="LayoutMixed">
import { getConfig } from '@/utils/config';
import Navbar from './navbar/index.vue';
import PageView from './page-view.vue';
import Sidebar from './sidebar/sidebar.vue';
import ShortcutNav from './shortcut-nav/index.vue';
import { useGlobalStoreHook } from '@/store/modules/global';
import { useResizeObserver } from '@vueuse/core';
import { useElementSize } from '@vueuse/core';

const { collapseWidth, expandWidth } = getConfig('sidebar');
const headerHeight: number = getConfig('header.height');
const shortcutNav = getConfig('shortcutNav');
const isCollapse: ComputedRef<boolean> = computed(() => {
  return useGlobalStoreHook().sidebar.status === 'collapsed';
});

// 容器尺寸变化监听
const el = ref(null);
const { width, height } = useElementSize(el);
// console.log('elSize', width.value, height.value);
// const elSize = ref({ width: 0, height: 0 });
// useResizeObserver(el, entries => {
//   const entry = entries[0];
//   const { width, height } = entry.contentRect;
//   elSize.value = { width, height };
//   useGlobalStoreHook().setViewportSize({ width, height });
// });

// 向后代组件传递数据
// 计算 containerHeight
const containerHeight: ComputedRef<number> = computed(() => {
  return height.value - headerHeight - (shortcutNav.show ? shortcutNav.height : 0);
});
// console.log('containerHeight', containerHeight.value);

// export interface LayoutData {
//   isCollapse: Ref<boolean>;
//   collapseWidth: number;
//   expandWidth: number;
//   headerHeight: number;
//   shortcutNavHeight: number;
//   elSize: { width: number; height: number };
//   containerHeight: ComputedRef<number>;
// }

// const layoutData = ref<LayoutData>({
//   isCollapse,
//   collapseWidth,
//   expandWidth,
//   headerHeight,
//   shortcutNavHeight: shortcutNav.show ? shortcutNav.height : 0,
//   elSize: {
//     width: elSize.width.value,
//     height: elSize.height.value,
//   },
//   containerHeight,
// });
provide('containerHeight', containerHeight);
</script>

<style scoped lang="scss">
.mixed-layout {
  width: 100%;
  min-width: 1200px;
  max-width: 100vw;
  height: 100vh;

  .layout-head {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;

    &:hover {
      box-shadow:
        0 1px 3px 0 rgb(0 0 0 / 10%),
        0 1px 2px -1px rgb(0 0 0 / 10%);
    }
  }

  .layout-container {
    box-sizing: border-box;
    height: 100%;
    padding-top: var(--header-height);

    .layout-main {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding-top: var(--shortcut-nav-height);
      padding-left: var(--sidebar-width);
      overflow-x: hidden;
    }
  }
}
</style>
