declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

import type { AttributifyAttributes } from '@unocss/preset-attributify';

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}

//
// declare module "*.scss" {
//   const scss: Record<string, string>;
//   export default scss;
// }
//
// declare module "vue-virtual-scroller";
// declare module "vuedraggable/src/vuedraggable";
// declare module "element-plus/dist/locale/en.mjs";
// declare module "element-plus/dist/locale/zh-cn.mjs";
