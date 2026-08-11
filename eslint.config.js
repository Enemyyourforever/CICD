import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import vueEslintParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // ① Vue 官方推荐规则集：flat/recommended 是多段数组（118 条规则），必须整体展开
  ...pluginVue.configs['flat/recommended'],

  // ② 自定义段：TS 适配 + 项目规则
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {
      ...js.configs.recommended.rules, // JS 推荐规则
      ...tsPlugin.configs.recommended.rules, // TS 推荐规则
      // TS 由类型检查兜底，关掉 JS 版误报规则
      'no-undef': 'off',
      'no-unused-vars': 'off',
      // 变量未使用检测
      '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
      // 路由页面组件（pages/Task/index.vue）不强制多词命名
      'vue/multi-word-component-names': 'off',
      // 设置标签没有闭合报错
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always', // 空标签（input、img）强制写成 <input />
            normal: 'never', // 普通标签（div、section）强制写成 <div>xxx</div>
            component: 'always', // 组件强制自闭合
          },
          svg: 'always',
          math: 'always',
        },
      ],
      // 设置文件中能否写 console
      'no-console': 'warn',
    },
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        extraFileExtension: ['.vue'],
        parser: tsParser,
      },
    },
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': tsPlugin,
    },
  },

  // ③ 关闭与 Prettier 冲突的格式规则（quotes/semi/indent 等）——必须放最后
  eslintConfigPrettier,

  // ④ 忽略构建产物与临时文件
  {
    ignores: ['dist/**', 'node_modules/**', 'eslint.config.js.bak'],
  },
];
