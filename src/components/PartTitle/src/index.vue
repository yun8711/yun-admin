<template>
  <div class="part-title">
    <div class="block"></div>
    <div class="title">{{ title }}</div>
    <el-tooltip v-if="tip" class="box-item" effect="dark" :content="tip" placement="top">
      <div class="i-ep:info-filled m-l-8" style="color: var(--el-color-primary)"></div>
    </el-tooltip>

    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'PartTitle',
});

const props = defineProps({
  // 标题
  title: {
    type: String,
    required: true,
  },
  tip: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.part-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--font-size-base);

  .block {
    width: 3px;
    height: var(--font-size-base);
    margin-right: var(--gap-base);
    background-color: var(--el-color-primary);
  }

  .title {
    font-size: var(--font-size-base);
    font-weight: bold;
    line-height: var(--font-size-base);
    color: var(--text-color-85);
  }
}
</style>
