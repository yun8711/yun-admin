<template>
  <div>登录页</div>
  <el-button type="primary" @click="navigateHandle('LoginPage')">登录</el-button>
  <el-button type="primary" @click="navigateHandle('TestPage')">测试页</el-button>
</template>

<script setup lang="ts" name="LoginPage">
const router = useRouter();
const navigateHandle = (name: string) => {
  console.log("登录");
  router.push({ name });
};
</script>

<style scoped></style>
