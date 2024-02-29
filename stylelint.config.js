// @ts-check

/** @type {import("stylelint").Config} */
export default {
  extends: [
    "stylelint-config-standard",
    // 只使用stylelint-config-recommended-vue的解析器
    "stylelint-config-html/vue",
    "stylelint-config-recess-order",
  ],
  plugins: ["stylelint-scss", "stylelint-order"],
  overrides: [
    {
      files: ["**/*.(html|vue)"],
      customSyntax: "postcss-html",
    },
    {
      files: ["*.scss", "**/*.scss"],
      customSyntax: "postcss-scss",
      extends: ["stylelint-config-standard-scss", "stylelint-config-recommended-vue/scss"],
    },
  ],
  rules: {
    "no-empty-source": null,
    "selector-class-pattern": null,
    "no-descending-specificity": null,
    "scss/dollar-variable-pattern": null,
    "scss/double-slash-comment-whitespace-inside": null,
    "scss/comment-no-empty": null,
    "function-no-unknown": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep", "global"],
      },
    ],
    // 未知的伪类选择器不报错
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep", "v-global", "v-slotted"],
      },
    ],
    // 未知的at规则不报错
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "function",
          "if",
          "each",
          "include",
          "mixin",
          "use",
          "forward",
        ],
      },
    ],
    "rule-empty-line-before": [
      "always",
      {
        ignore: ["after-comment", "first-nested"],
      },
    ],
    "unit-no-unknown": [true, { ignoreUnits: ["rpx"] }],
    "order/order": [
      [
        "dollar-variables",
        "custom-properties",
        "at-rules",
        "declarations",
        {
          type: "at-rule",
          name: "supports",
        },
        {
          type: "at-rule",
          name: "media",
        },
        "rules",
      ],
      { severity: "warning" },
    ],
  },
  ignoreFiles: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
};
