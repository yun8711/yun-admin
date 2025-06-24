<template>
  <el-popover
    trigger="hover"
    placement="bottom-end"
    width="260"
    :show-arrow="false"
    :offset="0"
    :popper-style="popperStyle"
  >
    <div class="user-popover">
      <div class="user-popover__head">
        <y-text>admin</y-text>
      </div>

      <div class="user-popover__menus">
        <div class="user-popover__menus-item flex flex-items-center space-x-8 p-x-10">
          <div class="i-icon:notice size-16 cursor-pointer"></div>
          <y-text>账号中心</y-text>
        </div>
        <div class="user-popover__menus-item flex flex-items-center space-x-8 p-x-10">
          <div class="i-icon:notice size-16 cursor-pointer"></div>
          <y-text>消息通知</y-text>
        </div>
        <div class="user-popover__menus-item flex flex-items-center space-x-8 p-x-10">
          <div class="i-icon:notice size-16 cursor-pointer"></div>
          <y-text>系统配置</y-text>
        </div>
      </div>

      <div class="user-popover__foot">
        <el-button plain class="w-100%" @click="logout">退出登录</el-button>
      </div>
    </div>
    <template #reference>
      <div class="navbar_user max-w-140 box-center space-x-8">
        <y-text>{{ userInfo.username || 'admin' }}</y-text>
        <div class="i-fill:avatar_man size-24 rounded-full"></div>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts" name="UserPopover">
import { useRouter } from 'vue-router';
const router = useRouter();
import { useAuthStoreHook } from '@/store/modules/auth';

const userInfo = useAuthStoreHook().userInfo;

const popperStyle = {
  padding: 0,
};

function logout() {
  console.log('logout');
  router.push('/login');
}
</script>

<style scoped lang="scss">
.navbar_user {
  height: 100%;
  padding: 0 10px;
  border-left: 1px solid #eee;

  &:hover {
    background: #f4f6f7;
  }
}

.user-popover {
  &__head {
    padding: 10px;
    background: #f4f6f7;
  }

  &__menus {
    padding: 10px 0;

    &-item {
      height: 30px;
      line-height: 30px;

      &:hover {
        background: #f4f6f7;
      }
    }
  }

  &__foot {
    padding: 10px;
    border-top: 1px solid #eee;
  }
}
</style>
