<template>
  <div class="shortcut-nav">
    <el-scrollbar>
      <div class="shortcut-nav-content">
        <template v-for="item in usePermissionStoreHook().viewList" :key="item.name">
          <div
            class="shortcut-nav-item"
            :class="[{ 'is-active': isActive(item) }, activeClass(item)]"
            @contextmenu.prevent="handleContextmenu($event, item)"
            @click.capture="handleClick(item)"
          >
            {{ item.meta?.title }}
            <div
              v-if="isActive(item) && !item.meta?.affix"
              class="i-ep:close size-12 ml-10"
              @click.stop="handleClose(item)"
            ></div>
            <div v-if="item.meta?.affix" class="i-icon:affix size-12 ml-10"></div>
          </div>
        </template>
      </div>
    </el-scrollbar>

    <contextmenu ref="contextmenuRef">
      <contextmenu-item @click="reloadCur">重新加载</contextmenu-item>
      <contextmenu-item :disabled="menuDisabled.closeCur" @click="closeCur">
        关闭当前
      </contextmenu-item>
      <contextmenu-divider></contextmenu-divider>
      <contextmenu-item :disabled="menuDisabled.closeLeft" @click="closeLeft">
        关闭左侧
      </contextmenu-item>
      <contextmenu-item :disabled="menuDisabled.closeRight" @click="closeRight">
        关闭右侧
      </contextmenu-item>
      <contextmenu-divider></contextmenu-divider>
      <contextmenu-item :disabled="menuDisabled.closeOther" @click="closeOther">
        关闭其它
      </contextmenu-item>
      <contextmenu-item :disabled="menuDisabled.closeAll" @click="closeAll">
        关闭所有
      </contextmenu-item>
    </contextmenu>
  </div>
</template>

<script setup lang="ts" name="ShortcutNav">
import { usePermissionStoreHook } from '@/store/modules/permission';
import {
  directive,
  version,
  Contextmenu,
  ContextmenuItem,
  ContextmenuDivider,
} from 'v-contextmenu';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const isActive = computed(() => item => {
  return usePermissionStoreHook().activeView.name === item.name;
});
const activeClass = computed(() => item => {
  if (isActive.value(item)) {
    if (item.meta?.affix) {
      return 'pr-16px';
    } else {
      return 'pr-8px';
    }
  } else {
    return 'pr-16px';
  }
});

defineOptions({
  name: 'TabItem',
  directives: {
    contextmenu: directive,
  },
  components: {
    Contextmenu,
    ContextmenuItem,
  },
});

const contextmenuRef = ref(null);
const curView = ref({});
// 点击标签页
function handleClick(item) {
  router.push(item);
  contextmenuRef.value?.hide();
}
// 关闭标签页
function handleClose(item) {
  // console.log('handleClose', item);
  usePermissionStoreHook().viewOperate(item, 'delete');
}
// 右键打开菜单
function handleContextmenu(event, item) {
  // console.log('handleContextmenu', item);
  curView.value = item;
  const { clientX, clientY } = event;
  nextTick(() => {
    contextmenuRef.value?.show({ top: clientY, left: clientX });
  });
}
addEventListener('click', e => {
  try {
    if (!e?.target?.className?.includes('shortcut-nav-item')) {
      contextmenuRef.value?.hide();
    }
  } catch (error) {
    // console.error('click error', error);
  }
});
const menuDisabled = computed(() => {
  const curIndex = usePermissionStoreHook().viewList.findIndex(
    item => item.name === curView.value.name
  );
  // console.log('menuDisabled', curIndex);
  return {
    closeCur: curView.value.meta?.affix,
    closeLeft: curIndex <= 0,
    closeRight: curIndex >= usePermissionStoreHook().viewList.length - 1,
    closeOther: usePermissionStoreHook().viewList.length === 1,
    closeAll: usePermissionStoreHook().viewList.length <= 1,
  };
});
// 关闭当前标签页
function closeCur() {
  usePermissionStoreHook().viewOperate(curView.value, 'delete');
}
// 关闭右侧标签页
function closeRight() {
  const curIndex = usePermissionStoreHook().viewList.findIndex(
    item => item.name === curView.value.name
  );
  const rightList = usePermissionStoreHook().viewList.slice(curIndex + 1);
  rightList.forEach(item => {
    usePermissionStoreHook().viewOperate(item, 'delete');
  });

  router.push(curView.value.path);
}
// 关闭左侧标签页
function closeLeft() {
  const curIndex = usePermissionStoreHook().viewList.findIndex(
    item => item.name === curView.value.name
  );
  const leftList = usePermissionStoreHook().viewList.slice(0, curIndex);
  leftList.forEach(item => {
    usePermissionStoreHook().viewOperate(item, 'delete');
  });

  router.push(curView.value.path);
}

// 关闭其它标签页
function closeOther() {
  const otherViews = usePermissionStoreHook().viewList.filter(
    item => item.path !== curView.value.path
  );
  usePermissionStoreHook().viewOperate(otherViews, 'deleteBranch');
  router.push(curView.value.path);
}

// 关闭所有标签页
function closeAll() {
  usePermissionStoreHook().viewOperate(usePermissionStoreHook().viewList, 'deleteAll');
  router.push(usePermissionStoreHook().viewList[0].path);
}

// 重新加载当前标签页
function reloadCur() {
  // console.log('reloadCur', curView.value?.path);
  usePermissionStoreHook().viewOperate(curView.value, 'refresh');
  router.push({
    name: 'Redirect',
    params: { path: curView.value?.path },
    query: curView.value?.query ?? {},
  });
}
</script>

<style scoped lang="scss">
.shortcut-nav {
  position: absolute;
  top: 0;
  left: var(--sidebar-width);
  box-sizing: border-box;
  width: 100%;
  height: var(--shortcut-nav-height);
  border-bottom: 1px solid #eee;

  &:hover {
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 10%),
      0 1px 2px -1px rgb(0 0 0 / 10%);
  }

  &-content {
    display: flex;
  }

  &-item {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    height: var(--shortcut-nav-height);
    padding-left: 16px;
    cursor: pointer;
    border-right: 1px solid #eee;

    &.is-active {
      background-color: #f5f7fa;

      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        content: '';
        background-color: var(--color-primary);
      }
    }
  }
}

:global(.v-contextmenu-item) {
  font-size: 12px;
  line-height: 1.2;
}
</style>
