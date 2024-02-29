import type { App } from "vue";

let config: object = {};
const { VITE_PUBLIC_PATH } = import.meta.env;

/**
 * 设置全局配置
 * @param cfg
 */
const setConfig = (cfg?: unknown) => {
  config = Object.assign(config, cfg);
};

/**
 * 获取项目动态全局配置，如果有key则获取某个属性的值
 * @param [key]
 */
const getConfig = (key?: string): PlatformConfigs => {
  if (typeof key === "string") {
    const arr = key.split(".");
    if (arr && arr.length) {
      let data = config;
      arr.forEach(v => {
        if (data && typeof data[v] !== "undefined") {
          data = data[v];
        } else {
          data = null;
        }
      });
      return data;
    }
  }
  return config;
};

/** 获取项目动态全局配置 */
const getPlatformConfig = async (app: App): Promise<undefined> => {
  app.config.globalProperties.$config = getConfig();
  // fetch发送请求获取，也可以使用axios
  return fetch(`${VITE_PUBLIC_PATH}platform-config.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(config => {
      let $config = app.config.globalProperties.$config;
      // 自动注入项目配置
      if (app && $config && typeof config === "object") {
        $config = Object.assign($config, config);
        app.config.globalProperties.$config = $config;
        // 设置全局配置
        setConfig($config);
      }
      return $config;
    })
    .catch(() => {
      throw new Error("请在public文件夹下添加platform-config.json配置文件");
    });
};

export { getConfig, setConfig, getPlatformConfig };
