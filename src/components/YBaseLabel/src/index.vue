<template>
  <div
    class="base-label"
    :style="{ width: prop.width, display: prop.block ? 'block' : 'inline-block' }"
  >
    <div class="base-label__inner">
      <div v-if="prop.label" class="base-label__label">{{ prop.label }}</div>
      <div class="base-label__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BaseLabel',
});
const prop = defineProps({
  // 使用辅助函数写法
  label: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: 'auto',
  },
  block: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
$prefix: '.base-label';

#{$prefix} {
  display: inline-block;

  &__inner {
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
    height: 32px;

    > #{$prefix}__label {
      padding: 0 8px;
      font-size: 12px;
      line-height: 32px;
      color: var(--text-title);
      border: 1px solid var(--line-border);
      border-right-width: 0;
    }

    > #{$prefix}__content {
      flex: 1;
      height: 100%;

      //输入框
      > .el-input {
        width: 100%;
        height: 100%;

        > .el-input__wrapper {
          padding-top: 0;
          padding-bottom: 0;
        }
      }

      //下拉框
      > .el-select {
        width: 100%;
        height: 100%;

        > .el-select__wrapper {
          height: 100%;
          padding-top: 0;
          padding-bottom: 0;
        }
      }

      //级联选择器
      > .el-cascader {
        width: 100%;
        height: 100%;

        > .el-input {
          width: 100%;
          height: 100%;
        }
      }

      // 日期时间范围选择器
      .el-date-editor {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
