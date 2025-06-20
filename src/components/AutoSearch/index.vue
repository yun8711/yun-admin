<template>
  <div class="auto-search">
    <div class="auto-search__left">
      <template v-if="itemArr.length > 0">
        <div v-for="item in itemArr" :key="item.prop">
          <base-label v-bind="item.labelAttr" style="margin-right: 8px">
            <component :is="item.comp" v-bind="item.attrs" v-model="form[item.prop]"></component>
          </base-label>
        </div>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="info" @click="onReset">重置</el-button>
      </template>
    </div>
    <div class="auto-search__right">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es';

defineOptions({
  name: 'AutoSearch',
});

const props = withDefaults(
  defineProps<{
    foldText?: string;
    unFoldText?: string;
    formArr?: Array<any>;
    debounceTime?: number; // 防抖时间
  }>(),
  {
    foldText: '收起',
    unFoldText: '高级搜索',
    debounceTime: 300,
    formArr: () => [
      // {
      //   prop: 'keyword',
      //   label: '关键词',
      //   comp: markRaw(ElInput), // 默认为ElInput
      //   width: '220px', // 默认为220px
      //   fuzzy: true, // 是否模糊搜索项
      //   attrs: {
      //     placeholder: '请输入关键词',
      //     clearable: true,
      //   },
      // },
    ],
  }
);

const form = ref<Record<string, any>>({}); // 表单数据
const itemArr = ref<Array<any>>([]); // 搜索项
const initVal = {}; // 初始化值，用于重置表单
const formatMap = {}; // 格式化值

watch(
  () => props.formArr,
  val => {
    if (!Array.isArray(val) || val.length === 0) return;
    // 1、格式化表单项
    const formArrTemp: Array<any> = [];
    val.forEach(item => {
      const obj = {
        comp: item.comp || markRaw(ElInput),
        prop: item.prop,
        defaultValue: item.defaultValue,
        labelAttr: {
          label: item.label || item.prop,
          width: item.width || '220px',
        },
        attrs: {
          placeholder: item.placeholder,
          disabled: item.disabled,
          ...item.attrs,
        },
      };
      formArrTemp.push(obj);
      form.value[item.prop] = item.defaultValue || '';
      initVal[item.prop] = item.defaultValue || '';
      if (item.format && typeof item.format === 'function') {
        formatMap[item.prop] = item.format;
      }
    });
    itemArr.value = formArrTemp;
  },
  { deep: true, immediate: true }
);

// 3.3+：另一种更简洁的语法
const emits = defineEmits<{
  change: [form: object];
  search: [form: object];
  reset: [form: object];
}>();

function onSearch() {
  emits('search', form.value);
}

function onReset() {
  Object.keys(initVal).forEach(key => {
    form.value[key] = initVal[key];
  });
  emits('reset', form.value);
}

const debouncedChange = debounce(val => {
  const obj = {};

  emits('change', val);
}, props.debounceTime || 0);

watch(
  () => form,
  val => {
    debouncedChange(val);
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
$prefix: '.auto-search';
#{$prefix} {
  display: flex;
  align-items: start;
  justify-content: space-between;
  height: min-content;

  &__left {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
