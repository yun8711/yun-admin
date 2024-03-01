/**
 * @description: 组件props类型定义文件
 */

import type { ExtractPropTypes } from "vue";

// props 参数类型
export const Props = {
  // 使用辅助函数写法
  tag: {
    type: String,
    default: "span",
  },
  maxLine: {
    type: Number,
    default: 1,
  },
  ellipsis: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "12",
  },
  color: {
    type: String,
    default: "",
  },
} as const;

// 导出props类型
export type TextProps = ExtractPropTypes<typeof Props>;
