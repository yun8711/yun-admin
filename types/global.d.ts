/**
 * @description 环境变量对象
 */
declare interface ViteEnv {
  VITE_USER_NODE_ENV: 'development' | 'production' | 'test';
  VITE_GLOB_APP_TITLE: string; // 标题
  VITE_PORT: number; // 前端本地项目端口
  VITE_REPORT: boolean; // 是否开启构建报告
  VITE_ROUTER_MODE: 'hash' | 'history'; // 路由模式
  // VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean; // 是否删除原始文件
  VITE_DROP_CONSOLE: boolean; // 是否删除 console
  // VITE_PWA: boolean; // 是否开启 PWA
  VITE_PUBLIC_PATH: string; // 静态资源路径
  VITE_PROXY: [string, string][];
}

/* Vite */
declare type Recordable<T = any> = Record<string, T>;

/* __APP_INFO__ */
declare const __APP_INFO__: {
  pkg: {
    name: string;
    version: string;
    dependencies: Recordable<string>;
    devDependencies: Recordable<string>;
  };
  lastBuildTime: string;
};

/**
 * 对应 `public/platform-config.json` 文件的类型声明
 */
interface PlatformConfigs {
  Title?: string;
}
