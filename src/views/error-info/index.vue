<template>
  <div class="p-24 pt-16">
    <div ref="searchBox" class="search-box mb-8">
      <el-space wrap>
        <y-label label="错误类型">
          <y-simple-select
            v-model="searchForm.subType"
            :options="options"
            width="220px"
          ></y-simple-select>
        </y-label>
        <y-label label="环境" block>
          <y-simple-select v-model="searchForm.env" :options="options"></y-simple-select>
        </y-label>
        <y-label label="项目">
          <y-simple-select v-model="searchForm.project" :options="options"></y-simple-select>
        </y-label>
        <y-label label="页面">
          <y-simple-select v-model="searchForm.page" :options="options"></y-simple-select>
        </y-label>
        <el-button type="primary" size="default">查询</el-button>
        <el-button type="primary" size="default">重置</el-button>
      </el-space>
    </div>

    <el-table :data="tableData.data" style="width: 100%" border :height="tableHeight">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="datetime" label="上报时间" width="160"></el-table-column>
      <el-table-column prop="page" label="页面" width="300"></el-table-column>
      <el-table-column prop="subType" label="错误类型" width="150"></el-table-column>
      <el-table-column
        prop="data"
        label="错误内容"
        :formatter="(row, column, cellValue) => JSON.stringify(cellValue)"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100px">
        <template #default>
          <el-button link type="primary" size="small" @click="toDetail"> 详情 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <y-pagination :total="tableData.total" @change="onPaginationChange"></y-pagination>
    <!--<el-pagination-->
    <!--  class="pt-8"-->
    <!--  background-->
    <!--  layout="total,prev, pager, next,sizes,jumper"-->
    <!--  :total="1000"-->
    <!--&gt;</el-pagination>-->
  </div>
</template>

<script setup lang="ts" name="ErrorInfo">
import { alovaInstance } from '@/utils/request';
import { useRequest } from 'alova';
import { usePagination } from '@alova/scene-vue';
import { useElementSize } from '@vueuse/core';
import { getErrorList } from '@/api/error';

const containerHeight: Ref<number> = inject('containerHeight');
const searchBox = ref(null);
const { height } = useElementSize(searchBox);
const tableHeight = computed(() => containerHeight.value - 40 - height.value - 8 - 32 - 8);

const searchForm = ref({
  subType: '',
  env: '',
  project: '',
  page: '',
});

const options = [
  { value: '1', label: '类型1' },
  { value: '2', label: '类型2' },
  { value: '3', label: '类型3' },
];

// const {
//   data: tableData2,
//   loading,
//   total,
//   page,
//   pageSize,
// } = usePagination((page, pageSize) => getErrorList({ page, pageSize, ...searchForm.value }), {
//   debounce: 500,
//   initialData: {
//     total: 0,
//     data: [],
//   },
//   watchingStates: [searchForm],
//   initialPage: 1,
//   initialPageSize: 50,
//   immediate: true,
// });

function onPaginationChange(currentPage: number, size: number) {
  // console.log('onCurrentChange', e);
  // page.value = currentPage;
  // pageSize.value = size;
  // page.value = page;
}

const { data: tableData } = useRequest(
  alovaInstance.Get('/error/list', { params: { size: 50, page: 1 } }),
  {
    initialData: [],
  }
);
// console.log('tableData', tableData);

function toDetail() {
  console.log('toDetail');
}
</script>

<style scoped></style>
