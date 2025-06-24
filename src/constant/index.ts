export const brandStatusMap = {
  ONLINE: '上线',
  OFFLINE: '下线',
  DRAFT: '草稿',
};

export const typeMap = {
  performance: '性能',
  error: '错误',
  behavior: '行为',
};

export const subTypeMap = {
  performance: {
    resource: '资源加载',
    xhr: 'xhr请求',
    fetch: 'fetch请求',
    page: '页面加载',
  },
  error: {
    code: '代码',
    console: '控制台',
    resource: '资源加载',
    unhandledrejection: '未处理的promise',
    xhr: 'xhr请求',
    fetch: 'fetch请求',
    crash: '页面崩溃',
    vue: 'vue错误',
  },
  behavior: {
    click: '点击',
    pv: '路由跳转',
    beforeunload: '页面关闭',
  },
};

export const feModuleMap = {
  '/gaea': '通用配置',
  '/cdp/themis': '数据同步',
  '/cdp/tethys': '运维中心',
  '/cdp/achilles': '离线开发',
  '/cdp/apollo': '实时计算',
  '/cdp/resource': '资源中心',
  '/uranus': '主数据',
  '/rhea/assets': '数据资产',
  '/rhea/maya': '查询分析',
  '/poseidon': '数据湖',
  '/label': '数据标签',
  '/daas': '数据服务',
  '/dg/odin': '数据质量',
  '/dg/crius': '数据标准',
  '/dg/anquan': '数据安全',
  '/indicator': '数据指标',
  '/metadata': '元数据管理',
  '/science': '科学平台',
  '/cdp/zeus': '可视化开发',
};

export const behaviorPvActionMap = {
  navigate: '路由跳转',
  navigation: '路由跳转',
  reload: '页面刷新',
  back_forward: '前进/后退',
  reserved: '其他',
};
