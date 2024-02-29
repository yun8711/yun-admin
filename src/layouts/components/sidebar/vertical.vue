<template>
  <el-scrollbar>
    <el-menu :router="false" :collapse-transition="false">
      <SubMenu :menu-list="menuList"></SubMenu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts" name="SidebarVertical">
import SubMenu from "@/layouts/components/sidebar/SubMenu.vue";
const menuList = [
  {
    path: "/about",
    meta: {
      title: "关于",
      icon: "Document",
    },
    children: [
      {
        path: "/about/1",
        meta: {
          title: "关于11",
          icon: "Document",
        },
      },
      {
        path: "/about/2",
        meta: {
          title: "关于2",
          icon: "Document",
        },
      },
    ],
  },
  {
    path: "/menu",
    meta: {
      title: "菜单",
      icon: "Menu",
    },
  },
  {
    path: "/setting",
    meta: {
      title: "设置",
      icon: "Setting",
    },
  },
  {
    path: "/user",
    meta: {
      title: "用户",
      icon: "User",
    },
  },
  {
    path: "/role",
    meta: {
      title: "角色",
      icon: "Role",
    },
  },
  {
    path: "/permission",
    meta: {
      title: "权限",
      icon: "Permission",
    },
  },
  {
    path: "/log",
    meta: {
      title: "日志",
      icon: "Log",
    },
  },
  {
    path: "/error",
    meta: {
      title: "错误",
      icon: "Error",
    },
  },
  {
    path: "/test",
    meta: {
      title: "测试",
      icon: "Test",
    },
  },
];
</script>

<style scoped lang="scss">
:deep(.el-menu) {
  border-right-style: none;
  border-right-width: 0;

  .el-sub-menu__title {
    height: 50px;
    line-height: 50px;
  }
}
</style>
