<template>
  <div class="page-view">
    <el-scrollbar always>
      <!--<Breadcrumb></Breadcrumb>-->
      <!--@see https://router.vuejs.org/zh/guide/advanced/router-view-slot.html#RouterView-%E6%8F%92%E6%A7%BD-->
      <router-view v-slot="{ Component, route }">
        <!--@see https://cn.vuejs.org/api/built-in-components.html#transition-->
        <Transition name="fade" mode="out-in">
          <!--@see https://cn.vuejs.org/api/built-in-components.html#keepalive-->
          <keep-alive :include="usePermissionStoreHook().cachedList" :max="10">
            <component :is="Component" :key="route.fullPath"></component>
          </keep-alive>
        </Transition>
      </router-view>
    </el-scrollbar>
  </div>
  <el-backtop
    :right="24"
    :bottom="24"
    :visibility-height="100"
    target=".page-view .el-scrollbar__wrap"
  ></el-backtop>
</template>

<script setup lang="ts">
import Breadcrumb from '@/layouts/components/breadcrumb.vue';
import { usePermissionStoreHook } from '@/store/modules/permission';

// const cachedList = usePermissionStoreHook().cachedList;
</script>

<style scoped>
.page-view {
  position: relative;
  height: 100%;
  overflow-y: hidden;
}
</style>
