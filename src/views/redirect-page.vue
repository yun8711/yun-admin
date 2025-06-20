<template>
  <div></div>
</template>

<script setup lang="ts">
import { unref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'Redirect',
});

const { currentRoute, replace } = useRouter();
console.log('currentRoute', currentRoute);

// params是动态路由，即要跳转的目标页面，query包含查询参数
const { params, query } = unref(currentRoute);
const { path } = params;
console.log('path', path);
// path是一个数组，需要转换成字符串，因为直接使用/会被解析成路径
const _path = Array.isArray(path) ? path.join('/') : path;
console.log('_path', _path);

replace({
  path: _path,
  query,
});
</script>
