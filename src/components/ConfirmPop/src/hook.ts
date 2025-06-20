import { ref, reactive, nextTick } from 'vue';

export function useConfirmPop() {
  // 控制popover显示隐藏
  const visiblePop = ref(false);
  // 动态获取点击元素，虚拟触发popover
  const tempRef = ref(null);
  // popover显示的内容
  const showInfo = reactive({
    title: '提示',
    id: '',
    content: '',
  });

  const showPop = async (e, row, title, content) => {
    showInfo.id = row.id;
    showInfo.title = title;
    showInfo.content = content;
    if (tempRef.value) visiblePop.value = false;
    await nextTick();
    tempRef.value = e.currentTarget;
    visiblePop.value = !visiblePop.value;
  };

  return {
    visiblePop,
    tempRef,
    showInfo,
    showPop,
  };
}
