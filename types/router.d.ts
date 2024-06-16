// 全局路由类型声明

import type { RouteComponent, RouteLocationNormalized } from 'vue-router';

declare global {
  interface ToRouteType extends RouteLocationNormalized {
    meta: RouteMetaType;
  }
}

/**
 * @description 路由配置项
 */
interface RouteItemType {
  path: string;
  name: string;
  redirect?: string;
  component?: RouteComponent;
  meta?: RouteMetaType;
  children?: Array<RouteItemType>;
}

/**
 * @description 路由的`meta`配置
 */
interface RouteMetaType {
  /** 菜单名称（兼容国际化、非国际化，如何用国际化的写法就必须在根目录的`locales`文件夹下对应添加） `必填` */
  title?: string;
  /** 菜单图标 `可选` */
  icon?: string;
  /** 是否隐藏菜单（默认`false`）`可选` */
  hideMenu?: boolean;
  /** 页面级别权限设置 `可选` */
  permissions?: Array<string>;
  /** 路由组件缓存（开启 `true`、关闭 `false`）`可选` */
  keepAlive?: boolean;
  activePath?: string;
  /** 外链地址 `可选` */
  externalLink?: string;
  /** 父级路由名称 `可选` */
  parentName?: string;
  /** 菜单升序排序，值越高排的越后,默认值为0，`可选` */
  rank?: number;
  /** 是否固定标签（默认`false`）`可选` */
  affix?: boolean;
}

// 接口返回的动态路由类型
interface DynamicRouteItemType {
  /** 路由地址 `必填` */
  path: string;
  activePath?: string;
  /** 路由名字（保持唯一）`可选` */
  name?: string;
  component?: string;
  /** 路由重定向 `可选` */
  redirect?: string;
  /** 菜单名称（兼容国际化、非国际化，如何用国际化的写法就必须在根目录的`locales`文件夹下对应添加）`必填` */
  title: string;
  /** 菜单图标 `可选` */
  icon?: string;
  /** 是否在菜单中隐藏（默认`false`）`可选` */
  hideMenu?: boolean;
  /** 菜单升序排序，值越高排的越后（只针对顶级路由）`可选` */
  rank?: number;
  /** 路由组件缓存（开启 `true`、关闭 `false`）`可选` */
  keepAlive?: boolean;
  /** 页面级别权限设置 `可选` */
  permissions?: Array<string>;
  /** 外链地址 `可选` */
  externalLink?: string;
  /** 父级路由名称 `可选` */
  parentName?: string;
}

// https://router.vuejs.org/zh/guide/advanced/meta.html#typescript
declare module 'vue-router' {
  interface RouteMeta extends RouteMetaType {}
}
