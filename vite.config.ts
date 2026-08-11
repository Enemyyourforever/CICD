import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 打包配置
  /* 
    1.极大的缓存优势 - vue被单独打包只要vue版本不改变则hash不变
    2.提升首屏加载并发度 - 浏览器在访问首页时，不仅可以下载首屏的业务代码，还可以同时并行下载 vue 这个依赖文件
    3.避免多版本依赖冲突 - 确保项目中所有的插件和组件都共用一个唯一的 Vue 实例
  */
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/vue')) {
            return 'vue';
          }
        },
      },
    },
  },
});
