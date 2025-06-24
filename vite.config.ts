import { fileURLToPath, URL } from 'node:url';
import { type ConfigEnv, defineConfig, loadEnv, type UserConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite'; // 模块自动按需导入
import Components from 'unplugin-vue-components/vite'; // 组件自动按需导入
import { codeInspectorPlugin } from 'code-inspector-plugin';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'; // element-plus 组件自动按需导入解析器
import { visualizer } from 'rollup-plugin-visualizer'; // 构建分析插件
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import dayjs from 'dayjs';
import { wrapperEnv } from './build/getEnv';
import pkg from './package.json';
// import viteCompression from "vite-plugin-compression"; // 构建压缩插件

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// https://cn.vitejs.dev/config/#conditional-config
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  // console.log("viteEnv", viteEnv);

  return {
    plugins: [
      // VueDevTools(),
      Vue(),
      // vue 可以使用 jsx/tsx 语法
      VueJsx(),
      // name 可以写在 script 标签上
      vueSetupExtend({}),
      UnoCSS(),
      // 注入变量到 html 文件
      createHtmlPlugin({
        minify: true,
        inject: {
          data: { title: viteEnv.VITE_GLOB_APP_TITLE },
        },
      }),
      codeInspectorPlugin({
        bundler: 'vite',
      }),
      AutoImport({
        dts: 'types/auto-imports.d.ts',
        resolvers: [
          // 自动导入element-plus组件
          ElementPlusResolver(),
        ],
        imports: ['vue', 'vue-router', 'pinia'],
      }),
      Components({
        dts: 'types/components.d.ts',
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        // 自动导入全局组件的位置
        dirs: ['src/components'],
        // 添加命名转换规则
        directoryAsNamespace: true, // 使用目录作为命名空间
        globalNamespaces: ['global'], // 全局命名空间
      }),
      // 创建打包压缩配置
      // viteCompression(),
      // 打包分析工具
      visualizer(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          // additionalData: `@use "~/styles/element/index.scss" as *;`,
        },
      },
    },
    // 服务端渲染
    server: {
      port: viteEnv.VITE_PORT,
      host: '0.0.0.0',
      cors: true,
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {},
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@build': fileURLToPath(new URL('./build', import.meta.url)),
      },
    },
    /**
     * @description esbuild配置
     * @see https://cn.vitejs.dev/config/shared-options.html#esbuild
     */
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild',
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      target: 'es2018',
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        // input: {
        //   index: pathResolve("./index.html", import.meta.url)
        // },
        // 静态资源分类打包
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    /**
     * @description 定义全局常量
     * @see https://cn.vitejs.dev/config/shared-options.html#define
     */
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
});
