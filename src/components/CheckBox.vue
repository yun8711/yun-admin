<template>
  <div class="custom-select" :class="{ inline: props.multiple }">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="custom-select_item"
      :class="{ selected: isSelected(item), disabled: props.disabled }"
      @click="!props.disabled && toggleSelect(item)"
    >
      <slot :item="item">{{ item.name }}</slot>
      <span v-if="isSelected(item)" class="checkmark">✔</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [Array, Object, String, Number],
    default: () => [],
  },
  items: {
    type: Array,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedItems = ref(props.modelValue);

watch(
  () => props.modelValue,
  newValue => {
    selectedItems.value = newValue;
  }
);

const isSelected = item => {
  if (props.multiple) {
    return selectedItems.value.includes(item);
  } else {
    return selectedItems.value === item;
  }
};

const toggleSelect = item => {
  if (props.multiple) {
    if (isSelected(item)) {
      selectedItems.value = selectedItems.value.filter(i => i !== item);
    } else {
      selectedItems.value.push(item);
    }
  } else {
    selectedItems.value = isSelected(item) ? null : item;
  }
  emit('update:modelValue', selectedItems.value);
};
</script>

<style lang="scss" scoped>
.custom-select {
  display: flex;
  flex-wrap: wrap;

  &.inline {
    flex-wrap: nowrap;
  }

  .custom-select_item {
    position: relative;
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    border: 1px solid #ccc;

    &.selected {
      background-color: #e6f7ff;
      border-color: #1890ff;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .checkmark {
      position: absolute;
      top: 5px;
      right: 5px;
      color: #1890ff;
    }
  }
}
</style>
