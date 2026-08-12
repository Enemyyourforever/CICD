# 待办事项 Todo（Vue3 + TS 练手项目）

一个用于练习 Vue3 + TypeScript 的待办事项应用，带完整的工程化工具链（ESLint + Prettier + husky + CI/CD）。

## 技术栈

- **Vue 3**（`<script setup>` 组合式 API）
- **TypeScript**（~6.0）
- **Vite 8**（Rolldown 构建）
- **Vue Router**（History 模式 + 路由懒加载）
- **Pinia**（状态管理）

## 快速开始

```bash
# 安装依赖
pnpm install

# 本地开发（热更新）
pnpm dev

# 生产构建（vue-tsc 类型检查 + vite build）
pnpm build

# 预览构建产物
pnpm preview
```

## 代码质量命令

```bash
pnpm lint          # ESLint 检查
pnpm lint:fix      # ESLint 自动修复
pnpm format        # Prettier 格式化
pnpm format:check  # Prettier 格式检查
```

## 工程化配置

| 工具                | 作用                                      |
| ------------------- | ----------------------------------------- |
| ESLint              | 代码质量检查（Vue 推荐规则 + TS 规则）    |
| Prettier            | 代码格式化（单引号/分号/2 空格/120 列）   |
| husky + lint-staged | 提交前自动检查暂存区文件                  |
| GitHub Actions      | 推送到 main 自动构建并部署到 GitHub Pages |
| Terser              | 生产构建时自动删除 console/debugger       |

## 部署

访问地址：<https://enemyyourforever.github.io/CICD/>

推送到 `main` 分支即自动触发部署，无需手动操作。

## 目录结构

```
src/
├── assets/       # 静态资源
├── composable/   # 组合式函数（useCurrentTask）
├── pages/        # 页面组件（Tasks 列表 / Task 详情）
├── router/       # 路由配置
├── store/        # Pinia 状态（task）
├── App.vue       # 根组件
└── main.ts       # 入口文件
```
