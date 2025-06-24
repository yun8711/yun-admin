import { createAlova, type Method } from 'alova';
import adapterFetch from 'alova/fetch';
import VueHook from 'alova/vue';
import { ElMessage } from 'element-plus';

export const alovaInstance = createAlova({
  baseURL: 'http://localhost:3000/monitor/api',
  requestAdapter: adapterFetch(),
  timeout: 30000,
  statesHook: VueHook,
  // 设置全局的请求拦截器，与axios相似
  // beforeRequest?: (method: Method<S, E, any, any, RC, RE, RH>) => void | Promise<void>;
  beforeRequest(config: Method) {
    // console.log('beforeRequest', config);
    // 假设我们需要添加token到请求头
    // config.config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    // headers: {
    //   'Content-Type': 'application/json;charset=UTF-8'
    // }
  },

  /**
   * 全局的响应钩子，可传一个也可以设置为带onSuccess和onError的对象，表示请求成功和请求错误的钩子
   * 如果在全局onSuccess中抛出错误不会触发全局onError，而是会触发请求位置的onError
   * 当指定了全局onError捕获错误时，如果没有抛出错误则会触发请求位置的onSuccess
   * @version 2.1.0
   */
  responded: async response => {
    const json = await response.json();
    console.log('response json', json);
    console.log('response json.data', json.data);
    console.log('response json.data.data', json.data.data);
    if (json.code !== 200) {
      // console.log('response error', json);
      // 这边抛出错误时，将会进入请求失败拦截器内
      ElMessage({
        type: 'error',
        message: json.data.message,
      });
      throw new Error(json.data.message);
    }
    return json.data;
    // return json;
  },
  // responded: {
  //   // onSuccess: response => {
  //   //   console.log('onSuccess', response);
  //   //   return response;
  //   // },
  //   onSuccess: async (response, method) => {
  //     // console.log('onSuccess response', response);
  //     // console.log('onSuccess method', method);
  //     // if (response.status >= 400) {
  //     //   throw new Error(response.statusText);
  //     // }
  //     const json = await response.json();
  //     console.log('onSuccess', json);
  //     if (json.code !== 200) {
  //       // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
  //       throw new Error(json.message);
  //     }
  //
  //     // 解析的响应数据将传给method实例的transformData钩子函数，这些函数将在后续讲解
  //     return json.data;
  //   },
  // },
  // responded?: ResponsedHandler<S, E, RC, RE, RH> | ResponsedHandlerRecord<S, E, RC, RE, RH>;
});
