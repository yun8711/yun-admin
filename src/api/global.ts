import type { DynamicRouteItemType } from '../../types/router';

/**
 * 获取动态路由列表
 */
export function getDynamicRoutesApi(): Promise<{ data: DynamicRouteItemType[] }> {
  return Promise.resolve({
    data: [
      // {
      //   path: '/test',
      //   name: 'TestPage',
      //   component: 'TestPage',
      //   title: '测试页面',
      //   icon: 'icon-tongzhi1',
      //   iconType: 'iconfont',
      // },
      // {
      //   path: '/test2',
      //   name: 'TestPage2',
      //   component: 'TestPage2',
      //   title: '测试页面2',
      //   icon: 'i-ep:memo',
      //   iconType: 'iconify',
      // },
      // {
      //   path: '/icon',
      //   name: 'IconPage',
      //   component: 'IconPage',
      //   icon: 'i-ep:user',
      //   title: '图标',
      // },
      // {
      //   path: '/about',
      //   name: 'AboutPage',
      //   component: 'AboutPage',
      //   title: '关于项目',
      //   icon: 'i-fill:folder',
      //   activePath: '/about',
      // },
    ],
  });
  // return new Promise((resolve, reject) => {
  //   resolve({ data: [] });
  // });
}
