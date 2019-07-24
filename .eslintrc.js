module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript',
  ],
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
  rules: {
    'import/extensions': ['.js', '.jsx', 'ts', 'vue'],
    'import/no-extraneous-dependencies': 'off',
    'space-before-function-paren': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 'off',
    /* 允许阴影变量state */
    'no-shadow': ['error', {
      allow: ['state'],
    }],
    'no-underscore-dangle': 0,
    'no-mixed-operators': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-plusplus': 0,
    'max-len': 0,
    'semi': 0,
    /* 剪裁最后一个属性的逗号 */
    'comma-dangle': 0,
    /* 驼峰命名：关闭 */
    camelcase: 0,
    // 'no-plusplus': 0,
    'no-restricted-globals': 0,
    'class-methods-use-this': 0,
    /* NOTE: 以下规则依赖于eslint-plugin-vue，eslint-plugin-html */
    /* template内部缩进2个空格，属性间隔开1个空格，自动对其属性缩进 */
    'vue/html-indent': [
      2,
      2,
      {
        attribute: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
      },
    ],
    /* html标签关闭前强制换行：单行不执行，多行执行 */
    'vue/html-closing-bracket-newline': [
      2,
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    /* html标签关闭前后不允许空格： < i />不被允许 */
    'vue/html-closing-bracket-spacing': [
      2,
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'never',
      },
    ],
    /* 强制html标签结束 */
    'vue/html-end-tags': 2,
    'vue/mustache-interpolation-spacing': 2,
    /* 禁止重复空格 */
    'vue/no-multi-spaces': 2,
    'vue/v-bind-style': 1,
    'vue/v-on-style': 1,
    /* 每行最多2个属性，超出则单个属性一行进行分行对齐 */
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 2,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    /* html属性必须用双引号括起来 */
    'vue/attribute-hyphenation': [
      0,
      'never',
      {
        ignore: ['data-', 'aria-', 'slot-scope'],
      },
    ],
    /* 计算属性中禁止包含异步方法 */
    'vue/no-async-in-computed-properties': 2,
    /* 禁止在对象字面量中出现重复的键 */
    'vue/no-dupe-keys': 2,
    /* 禁止出现语法错误 */
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false,
    }],
    /* 禁止覆盖保留字 */
    'vue/no-reserved-keys': 2,
    /* 禁止在textarea出现{{value}} */
    'vue/no-textarea-mustache': 2,
    /* 禁止定义无用参数：过于严格，可以不使用 */
    'vue/no-unused-vars': 2,
    /* <component> 必须绑定is传参 */
    'vue/require-component-is': 2,
    /* render函数必须有返回值 */
    'vue/require-render-return': 2,
    /* v-for必须定义key */
    'vue/require-v-for-key': 2,
    /* 校验template的根节点：必须唯一且合法 */
    'vue/valid-template-root': 2,
    'vue/valid-v-bind': 2,
    'vue/valid-v-cloak': 2,
    'vue/valid-v-else-if': 2,
    'vue/valid-v-else': 2,
    'vue/valid-v-for': 2,
    'vue/valid-v-html': 2,
    'vue/valid-v-if': 2,
    'vue/valid-v-model': 2,
    'vue/valid-v-on': 2,
    'vue/valid-v-once': 2,
    'vue/valid-v-pre': 2,
    'vue/valid-v-show': 2,
    'vue/valid-v-text': 2,
    /* html属性值必须用双括号括起来 */
    'vue/html-quotes': 2,
    /* 禁止出现无法理解的v-for或v-if */
    'vue/no-confusing-v-for-v-if': 2,
    'import/no-dynamic-require': 1,
    'global-require': 0,
    // 接口和类型字面量中每一行都必须以分号结尾
    // 'typescript/member-delimiter-style': 'off',
    // // 属性和方法必须按照排序规则排序
    // 'typescript/member-ordering': 'error',
    // // 类型定义的冒号前后是否需要空格
    // // 默认冒号前必须没有空格，冒号后必须有空格
    // 'typescript/type-annotation-spacing': 'error',
  },
};
