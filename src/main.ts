import { createApp } from 'vue';
import { setupStore } from '@/store';
import { getPlatformConfig } from './utils/config';
import App from './App.vue';
import router from './router';
import './styles/index.scss';
import 'virtual:uno.css';
// 导入字体图标库
import '@/assets/iconfont/iconfont.css';
import '@/assets/iconfont/iconfont.js';
import 'v-contextmenu/dist/themes/default.css';
const app = createApp(App);

getPlatformConfig(app).then(async config => {
  console.log('config', config);
  // 先初始化store，再挂载路由，否则在路由守卫中使用store会报错
  setupStore(app);
  app.use(router);
  await router.isReady();
  // injectResponsiveStorage(app, config);
  // app
  //   .use(MotionPlugin)
  //   .use(useI18n)
  //   .use(useElementPlus)
  //   .use(Table)
  //   .use(PureDescriptions)
  //   .use(useEcharts);
  app.mount('#app');
});
