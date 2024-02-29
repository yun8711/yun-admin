<template>
  <div>
    <div class="login-box">
      <div class="login-box__logo">
        <img class="login-box__logo-icon" src="@/assets/images/logo.svg" alt="" />
        <h2 class="login-box__logo-text">{{ title }}</h2>
      </div>
      <el-form
        ref="loginFormRef"
        label-position="top"
        label-width="100px"
        :model="loginForm"
        style="max-width: 460px"
        size="large"
        :rules="loginRules"
      >
        <el-form-item label="" prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名：admin / user">
            <template #prefix>
              <div class="i-ep:user"></div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码：123456"
            show-password
            autocomplete="new-password"
          >
            <template #prefix>
              <div class="i-ep:lock"></div>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)">
          重置
        </el-button>
        <el-button
          :icon="UserFilled"
          round
          size="large"
          type="primary"
          :loading="loading"
          @click="login(loginFormRef)"
        >
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="LoginPage">
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import { getConfig } from "@/config";
const router = useRouter();

const title = ref("Yun Admin");
const config = getConfig();
title.value = config.Title;

type FormInstance = InstanceType<typeof ElForm>;
const loading = ref(false);
const loginForm = reactive({
  username: "",
  password: "",
});
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

// resetForm
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// login
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    console.log("登录");

    setTimeout(() => {
      loading.value = false;
      router.push({ name: "HomePage" });
    }, 1000);
    // try {
    //   // 1.执行登录接口
    //   const { data } = await loginApi({ ...loginForm, password: md5(loginForm.password) });
    //   userStore.setToken(data.access_token);
    //
    //   // 2.添加动态路由
    //   await initDynamicRouter();
    //
    //   // 3.清空 tabs、keepAlive 数据
    //   tabsStore.setTabs([]);
    //   keepAliveStore.setKeepAliveName([]);
    //
    //   // 4.跳转到首页
    //   router.push(HOME_URL);
    //   ElNotification({
    //     title: getTimeState(),
    //     message: "欢迎登录 Geeker-Admin",
    //     type: "success",
    //     duration: 3000
    //   });
    // } finally {
    //   loading.value = false;
    // }
  });
};
</script>

<style scoped lang="scss">
#particles {
  position: absolute;
  top: 0;
  left: 0;
  //z-index: 0;
  width: 100%;
  height: 100%;
  background: #232741;

  :deep(.particles-js-canvas-el) {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
}

.login-box {
  position: absolute;
  right: 200px;
  bottom: 30%;
  width: 420px;
  padding: 50px 40px 45px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 10%) 0 2px 10px 2px;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 45px;

    &-icon {
      width: 60px;
      height: 52px;
    }

    &-text {
      padding: 0 0 0 25px;
      margin: 0;
      font-size: 42px;
      font-weight: bold;
      color: #34495e;
      white-space: nowrap;
    }
  }

  .el-form-item {
    margin-bottom: 40px;
  }

  .login-btn {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 40px;
    white-space: nowrap;

    .el-button {
      width: 185px;
    }
  }
}
</style>
