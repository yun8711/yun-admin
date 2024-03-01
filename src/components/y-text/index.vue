<template>
  <component :is="prop.tag" class="k-text" :class="textClasses" :style="textStyles">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup name="YText">
import { Props } from "./props";
import type { ComputedRef } from "vue";

// defineOptions({ name: "KText" });

const prop = defineProps(Props);

const lineHeightMap = {
  "12px": "18px",
  "14px": "22px",
  "16px": "24px",
  "20px": "28px",
  "24px": "32px",
  "36px": "44px",
};

const textClasses: ComputedRef<string[]> = computed(() => {
  const classes = [];
  if (prop.ellipsis) {
    classes.push("is-ellipsis");
  }
  if (Number(prop.maxLine) > 1) {
    classes.push("is-break");
  }
  return classes;
});

const textStyles: ComputedRef<{
  "font-size": string;
  "line-height": string;
  color: string;
  [key: string]: string | number;
}> = computed(() => {
  const styles = {
    "font-size": "",
    "line-height": "",
    color: "",
  };

  if (prop.size) {
    styles["font-size"] = /^\d+$/g.test(prop.size) ? prop.size + "px" : prop.size;
  } else {
    styles["font-size"] = "12px";
  }
  styles["line-height"] = lineHeightMap[styles["font-size"]] || 1.5;

  if (!prop.color) {
    styles["color"] = "var(--text-color)";
  } else {
    if (["title", "secondary", "disabled"].includes(prop.color)) {
      styles["color"] = "var(--text-" + prop.color + ")";
    } else {
      styles["color"] = prop.color;
    }
  }

  if (prop.color === "title") {
    styles["font-weight"] = 500;
  } else {
    styles["font-weight"] = "inherit";
  }

  if (Number(prop.maxLine) > 1) {
    styles["-webkit-line-clamp"] = prop.maxLine;
  }

  return styles;
});
</script>
