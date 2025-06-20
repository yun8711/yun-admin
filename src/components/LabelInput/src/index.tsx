import { defineComponent } from 'vue';
import BaseLabel from 'src/components/YBaseLabel';
import { ElInput } from 'element-plus';

export default defineComponent({
  name: 'LabelInput',
  inheritAttrs: false,
  props: {
    labelAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { attrs }) {
    return () => (
      <BaseLabel {...props.labelAttrs}>
        <ElInput {...attrs} />
      </BaseLabel>
    );
  },
});
