<template>
  <div class="y-pagination">
    <el-pagination
      v-bind="$attrs"
      background
      layout="total,prev, pager, next,sizes,jumper"
    ></el-pagination>
  </div>
</template>

<script setup lang="ts" name="YPagination">
const props = defineProps({
  // total: {
  //   type: Number,
  //   default: 0,
  // },
});
</script>

<style scoped lang="scss">
.y-pagination {
  margin-top: 8px;

  :deep(.el-pagination > *.is-first) {
    flex: 1;
  }
}
</style>
