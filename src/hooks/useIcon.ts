import type { Component, HTMLAttributes } from 'vue';

/**
 * 图标渲染hook
 * @param icon - 图标名，如unocss支持的i-ep:plus，iconfont支持的icon-plus
 * @param classes - 图标附加类名
 * @param attrs - 图标元素附加属性
 * @returns Component - 图标组件
 */
export function useIcon(icon: string, classes?: string, attrs?: HTMLAttributes): Component {
  let classArr: string[] = [];
  if (classes) {
    classArr = classes?.includes(',') ? classes.split(',') : [classes];
  }

  classArr.unshift(icon);
  if (!icon.includes(':')) {
    classArr.unshift('iconfont');
  }
  if (attrs?.class) {
    classArr.push(attrs.class);
  }

  return {
    name: 'YIcon',
    render() {
      return h('i', {
        ...attrs,
        class: classArr,
      });
    },
  };
}
