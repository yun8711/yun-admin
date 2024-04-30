<template>
  <div v-element-size="onResize" class="page">
    <el-space direction="vertical" size="large" fill>
      <el-card>
        <y-text tag="div" color="title" size="16" class="mb-12px">简介</y-text>
        <y-text tag="div" size="14">
          Yun-Admin 一款基于 Vue3.4、TypeScript5、Vite5、Pinia、Element-Plus、UnoCSS
          开源的后台管理系统模板，使用目前最新技术栈开发。项目中封装了一些常用的组件、Hooks、指令，
          在一定程度上提高您的开发效率；同时还对一些常见的业务场景进行技术验证，积累业务经验；另外本项目还对很多工程化方案进行了实现和验证。
        </y-text>
      </el-card>
      <el-card>
        <y-text tag="div" color="title" size="16" class="mb-12px">项目信息</y-text>
        <el-descriptions :column="column" border size="large">
          <el-descriptions-item label="版本号" label-align="right">
            <el-tag>{{ version }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="发布时间" label-align="right">
            <el-tag>{{ lastBuildTime }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Github" label-align="right">
            <el-link type="primary" href="/Users/liuyun/Documents/ly/yun-admin" target="_blank">
              Github
            </el-link>
          </el-descriptions-item>
          <el-descriptions-item label="文档地址" label-align="right">
            <!--<el-link type="primary" href="https://docs.spicyboy.cn" target="_blank"> 文档地址 </el-link>-->
          </el-descriptions-item>
          <el-descriptions-item label="预览地址" label-align="right">
            <!--<el-link type="primary" href="https://admin.spicyboy.cn" target="_blank"> 预览地址 </el-link>-->
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card>
        <y-text tag="div" color="title" size="16" class="mb-12px">生产依赖</y-text>
        <el-descriptions :column="column" border size="large">
          <el-descriptions-item
            v-for="(value, key) in dependencies"
            :key="key"
            width="400px"
            :label="key"
            label-align="right"
            label-class-name="cursor-pointer underline underline-offset-2"
          >
            <template #label>
              <div @click.stop="openTab(key)">
                {{ key }}
              </div>
            </template>
            <el-tag type="info">
              {{ value }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card>
        <y-text tag="div" color="title" size="16" class="mb-12px">开发依赖</y-text>
        <el-descriptions :column="column" border size="large">
          <el-descriptions-item
            v-for="(value, key) in devDependencies"
            :key="key"
            width="400px"
            :label="key"
            label-align="right"
            label-class-name="cursor-pointer underline underline-offset-2"
          >
            <template #label>
              <div @click.stop="openTab(key)">
                {{ key }}
              </div>
            </template>
            <el-tag type="info">
              {{ value }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-space>
  </div>
</template>

<script setup lang="ts" name="AboutPage">
import { vElementSize } from '@vueuse/components';
const { pkg, lastBuildTime } = __APP_INFO__;
const { dependencies, devDependencies, version } = pkg;

const column = ref(2);
const onResize = ({ width }) => {
  if (width < 900) {
    column.value = 1;
  } else if (width < 1200) {
    column.value = 2;
  } else if (width < 1600) {
    column.value = 3;
  } else {
    column.value = 4;
  }
};

const openTab = async packageName => {
  window.open(`https://www.npmjs.com/package/${packageName}`);
};
</script>

<style scoped lang="scss">
.page {
  min-height: 100%;
  padding: 24px;
}
</style>
