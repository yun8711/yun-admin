// 这是一个适用于vue3+ts 的配置，可根据项目需要进行修改
export default {
  // 对所有js 类型的文件进行 eslint --fix 操作
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],

  // 除package.json 外的所有 .json 文件；所有后缀为 .code-snippets 和除了 .browserslistrc 以外所有以 .rc 结尾的文件
  '{!(package)*.json,*.code-snippets,.!({browserslist,npm})*rc}': [
    'prettier --write --parser json',
  ],

  // eslint配置了 jsonc-eslint-parser，可以格式化json文件
  'package.json': ['prettier --write'],

  '*.vue': ['prettier --write', 'eslint --fix', 'stylelint --fix --allow-empty-input'],

  // 因为stylelint v15 之后不做样式检查，所以需要先用prettier 格式化后再用stylelint 格式化
  '*.{css,scss,less,html}': ['prettier --write', 'stylelint --fix --allow-empty-input'],

  '*.md': ['prettier --write'],
};
