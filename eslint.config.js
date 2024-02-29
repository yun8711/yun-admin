import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import * as parserVue from "vue-eslint-parser";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import { defineFlatConfig } from "eslint-define-config";
import * as parserTypeScript from "@typescript-eslint/parser";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";

export default defineFlatConfig([
  // 默认配置，对所有js文件生效
  {
    // 这里没有配置files字段，实际上它相当于[**/*.js,**/*.cjs,**/*.mjs],
    // 使用 @eslint/js 提供的推荐规则，只有rules
    ...js.configs.recommended,
    // 忽略静态资源文件
    ignores: ["src/assets/**", "src/**/iconfont/**"],
    // 语言选项
    languageOptions: {
      // 全局变量
      globals: {
        // index.d.ts
        RefType: "readonly",
        EmitType: "readonly",
        TargetContext: "readonly",
        ComponentRef: "readonly",
        ElRef: "readonly",
        ForDataType: "readonly",
        AnyFunction: "readonly",
        PropType: "readonly",
        Writable: "readonly",
        Nullable: "readonly",
        NonNullable: "readonly",
        Recordable: "readonly",
        ReadonlyRecordable: "readonly",
        Indexable: "readonly",
        DeepPartial: "readonly",
        Without: "readonly",
        Exclusive: "readonly",
        TimeoutHandle: "readonly",
        IntervalHandle: "readonly",
        Effect: "readonly",
        ChangeEvent: "readonly",
        WheelEvent: "readonly",
        ImportMetaEnv: "readonly",
        Fn: "readonly",
        PromiseFn: "readonly",
        ComponentElRef: "readonly",
        parseInt: "readonly",
        parseFloat: "readonly",
      },
    },
    plugins: {
      // 使用 eslint-plugin-prettier 插件，把prettier 的规则转换成 ESLint 规则
      prettier: pluginPrettier,
    },
    rules: {
      // 使用 eslint-plugin-prettier 中的推荐规则
      ...pluginPrettier.configs.recommended.rules,
      // 使用 eslint-config-prettier 关闭所有可能与 Prettier 冲突的 ESLint 规则
      ...configPrettier.rules,
      "no-debugger": "off",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
  {
    // 对所有ts文件生效
    files: ["**/*.?([cm])ts", "**/*.?([cm])tsx"],
    languageOptions: {
      // 使用 @typescript-eslint/parser 解析器
      parser: parserTypeScript,
      parserOptions: {
        // 指定源码使用esm模块
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTypeScript,
    },
    rules: {
      ...pluginTypeScript.configs.strict.rules,
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/prefer-as-const": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/prefer-literal-enum-member": ["error", { allowBitwiseExpressions: true }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "eslint-comments/no-unlimited-disable": "off",
      "import/no-duplicates": "off",
      "unused-imports/no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.?([cm])js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      globals: {
        // $: "readonly",
        // $$: "readonly",
        // $computed: "readonly",
        // $customRef: "readonly",
        // $ref: "readonly",
        // $shallowRef: "readonly",
        // $toRef: "readonly",
      },
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: [".vue"],
        parser: "@typescript-eslint/parser",
        sourceType: "module",
      },
    },
    plugins: {
      vue: pluginVue,
    },
    processor: pluginVue.processors[".vue"],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs["vue3-essential"].rules,
      ...pluginVue.configs["vue3-recommended"].rules,
      "no-undef": "off",
      "no-unused-vars": "off",
      "vue/no-v-html": "off",
      "vue/require-default-prop": "off",
      "vue/require-explicit-emits": "off",
      "vue/multi-word-component-names": "off",
      "vue/no-setup-props-reactivity-loss": "off",
      // 顶级元素的顺序
      "vue/component-tags-order": [
        "error",
        {
          order: ["template", "script", "style"], // 按习惯设置的顺序
        },
      ],
      // "vue/singleline-html-element-content-newline": ["off"],
      // 标签自闭合配置
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "never",
            component: "never",
          },
          svg: "always",
          math: "always",
        },
      ],
      // 控制元素中第一个属性的位置
      // "vue/first-attribute-linebreak": [
      //   "error",
      //   {
      //     singleline: "beside", // 单行时第一个属性不换行
      //     multiline: "below", // 多行时第一个属性不换行
      //   },
      // ],
      // 元素有多属性时每行属性数量，单行时一行最多个，多行时每行1个，
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: 10,
          multiline: {
            max: 1,
          },
        },
      ],

      // "vue/html-closing-bracket-newline": [
      //   "error",
      //   {
      //     singleline: "never",
      //     multiline: "never",
      //   },
      // ],
      // "vue/html-indent": [
      //   "error",
      //   2,
      //   {
      //     attribute: 1,
      //     baseIndent: 1,
      //     closeBracket: 0,
      //     alignAttributesVertically: true,
      //     ignores: [],
      //   },
      // ],
    },
  },
]);
