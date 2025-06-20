<template>
  <div class="fuzzy-search">
    <div class="fuzzy-search__fuzzy-row">
      <div class="fuzzy-search__fuzzy-row__left">
        <base-label v-bind="fuzzyItem.labelAttr" style="margin-right: 8px">
          <component
            :is="fuzzyItem.comp"
            v-bind="fuzzyItem.attrs"
            v-model="form[fuzzyItem.prop]"
          ></component>
        </base-label>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="info" @click="onReset">重置</el-button>
        <el-button v-if="unFuzzyItems.length > 0" link @click="isFold = !isFold">
          {{ isFold ? props.unFoldText : props.foldText }}
          <div :class="[isFold ? 'i-ep:arrow-down' : 'i-ep:arrow-up']" class="m-l-4"></div>
        </el-button>
      </div>
      <div class="fuzzy-search__fuzzy-row__right"></div>
    </div>
    <div v-show="!isFold" v-if="unFuzzyItems.length > 0" class="fuzzy-search__more">
      <div v-for="item in unFuzzyItems" :key="item.prop" class="fuzzy-search__more__item">
        <base-label v-bind="item.labelAttr" style="margin-right: 8px">
          <component :is="item.comp" v-bind="item.attrs" v-model="form[item.prop]"></component>
        </base-label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es';
import { ElInput } from 'element-plus';

defineOptions({
  name: 'FuzzySearch',
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
      {
        prop: 'keyword',
        label: '关键词',
        comp: markRaw(ElInput), // 默认为ElInput
        width: '220px', // 默认为220px
        fuzzy: true, // 是否模糊搜索项
        attrs: {
          placeholder: '请输入关键词',
          clearable: true,
        },
      },
    ],
  }
);

const form = ref<Record<string, any>>({}); // 表单数据
const isFold = ref(true); // 是否折叠
const fuzzyItem = ref<any>({}); // 模糊搜索项
const unFuzzyItems = ref<Array<any>>([]); // 非模糊搜索项
const initVal = {}; // 初始化值，用于重置表单

watch(
  () => props.formArr,
  val => {
    if (!Array.isArray(val) || val.length === 0) return;
    // 1、格式化表单项
    const formArrTemp: Array<any> = [];
    val.forEach(item => {
      const obj = {
        comp: item.comp || markRaw(ElInput),
        fuzzy: item.fuzzy,
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
    });
    fuzzyItem.value = formArrTemp.find(item => item.fuzzy);
    unFuzzyItems.value = formArrTemp.filter(item => !item.fuzzy);
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
$prefix: '.fuzzy-search';
#{$prefix} {
  height: min-content;

  &__fuzzy-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    &__left {
      display: flex;
      align-items: center;
    }
  }
}
</style>
