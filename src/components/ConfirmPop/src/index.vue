<template>
  <el-popover
    ref="confirmPop"
    popper-class="confirm-pop"
    :visible="visible"
    :virtual-ref="props.tempRef"
    trigger="click"
    :title="parentInfo.title"
    virtual-triggering
    width="260"
  >
    <template #default>
      <slot>{{ parentInfo?.content }}</slot>
      <div style="margin-top: 10px; text-align: right">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="confirm">确定</el-button>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

defineOptions({
  name: 'ConfirmPop',
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  tempRef: {
    type: Object,
    default: () => ({}),
  },
  parentInfo: {
    type: Object,
    default: () => ({
      // id: String,
      title: String,
      content: String,
    }),
  },
});
const { modelValue } = toRefs(props);
const emits = defineEmits(['confirm', 'cancel', 'update:parentInfo', 'update:modelValue']);

const visible = computed({
  get: () => modelValue.value,
  set: val => {
    emits('update:modelValue', val);
  },
});

const isSubmit = ref(false);
const confirm = () => {
  isSubmit.value = true;
  emits('confirm');
  emits('update:modelValue', false);
};

const cancel = () => {
  emits('cancel');
  // emits('update:parentInfo', {
  //   id: '',
  //   title: '',
  // });
  visible.value = false;
  // emits('update:modelValue', false);
};

// const handleBlur = async () => {
//   // addEventListener('blur') 执行比按钮事件快,因此需要加个延时
//   setTimeout(() => {
//     if (isSubmit.value) {
//     } else {
//       // cancelDel()
//       cancel();
//     }
//   }, 100);
// };

const confirmPop = ref(null);
onClickOutside(
  confirmPop,
  () => {
    if (modelValue.value) {
      visible.value = false;
      // emits('update:modelValue', false);
    }
  },
  {
    ignore: ['.confirm-pop'],
  }
);
</script>

<style scoped lang="scss"></style>
