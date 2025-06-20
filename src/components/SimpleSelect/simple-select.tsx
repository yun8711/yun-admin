import { ElSelect, ElOption } from 'element-plus';

export default defineComponent({
  name: 'SimpleSelect',
  inheritAttrs: true,
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: 'label',
    },
    value: {
      type: String,
      default: 'value',
    },
  },
  setup(props, { attrs }) {
    const selectProps = {
      label: props.label,
      value: props.value,
    };
    return () => (
      <ElSelect {...attrs} props={selectProps}>
        {props.options.map((option: any) => (
          <ElOption
            key={option[props.value]}
            label={option[props.label]}
            value={option[props.value]}
          ></ElOption>
        ))}
      </ElSelect>
    );
  },
});
