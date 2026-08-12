# CI/CD 流程记录（GitHub Pages 练手版）

> 记录日期：2026-08-12
> 项目：Enemyyourforever/CICD（Vue3 + Vite8 + TS，GitHub Pages 部署）

---

## 一、当前架构（重要认知）

```
开发 → push 分支 → PR → ci 检查 → 合并到 main → 自动部署
```

| 环节            | 实际状态                                | 说明                             |
| --------------- | --------------------------------------- | -------------------------------- |
| 代码存储        | GitHub 仓库 Enemyyourforever/CICD       | 远程名 `CICD`（不是 origin！）   |
| 分支保护        | main 不能直接 push，必须走 PR + ci 通过 | 已开启 "Do not allow bypassing"  |
| PR 审批         | 已关闭 "Require approvals"              | 单人项目自己不能审自己，会死锁   |
| ci 检查         | lint + build                            | PR 必须通过才能合并              |
| staging 部署    | 合并 main 后自动部署到 GitHub Pages     | **页面唯一可见的站点**           |
| production 部署 | 需人工审批（Actions 里点 Approve）      | **当前是 echo 模拟，无真实页面** |

⚠️ **当前局限**：只有一个 GitHub Pages 站点，被 staging 占用。

- 提交代码 → staging 部署 → 页面立即变最新
- production 审批只是走流程（echo），页面本身不会因审批变化
- 真实公司：dev/staging/prod 各有独立服务器和 URL，内容互不相同
- 升级方案（未做）：建第二个仓库当 production 站点，审批后才更新

---

## 二、日常开发流程（完整命令）

### ① 每次开发前：同步最新代码

```bash
git checkout main
git pull CICD main
```

### ② 新建功能分支

```bash
git checkout -b feat/功能名
# 命名规范：feat/(功能) fix/(修复) chore/(杂项) docs/(文档)
```

### ③ 写代码 + 本地自查

```bash
pnpm lint        # 代码质量检查（0 error）
pnpm build       # 类型检查 + 生产构建
```

### ④ 提交推送

```bash
git add .
git commit -m "feat: 功能描述"    # 格式：type: 描述
git push -u CICD HEAD
```

### ⑤ 开 PR

- 终端输出末尾的链接，或 GitHub 页面黄色横幅 "Compare & pull request"
- 标题：与 commit 信息一致；描述：说明改了什么

### ⑥ 等 ci 自动检查

- PR 页面看 `ci` 状态，绿色 ✅ 才允许合并
- 失败 → 点 Details 看日志 → 修代码 → `git push` 自动重跑

### ⑦ 合并

- ci 绿后点 **Merge pull request** → **Confirm merge** → **Delete branch**

### ⑧ 看自动部署

- Actions 页面：`ci ✅ → deploy-staging ✅（自动）→ deploy-production ⏳（待审批）`
- production 需点 **Review deployments → Approve**

### ⑨ 同步本地

```bash
git checkout main
git pull CICD main
```

---

## 三、踩过的坑（全部实测）

| #   | 坑                                              | 原因                                 | 解决                                         |
| --- | ----------------------------------------------- | ------------------------------------ | -------------------------------------------- |
| 1   | GitHub Pages 白屏                               | 路由 History 模式没配子路径          | `createWebHistory('/CICD/')`                 |
| 2   | CI 报 `packages field missing or empty`         | pnpm-workspace.yaml 无 packages 字段 | 加 `packages: []`                            |
| 3   | `esbuild.drop` 类型报错                         | Vite 8 已弃用 esbuild 改用 Rolldown  | 用 `minify: 'terser'` + `drop_console`       |
| 4   | `git push origin` 失败                          | 远程名是 `CICD` 不是 `origin`        | 用 `git push CICD xxx`                       |
| 5   | 删远程分支被拒                                  | 不能删 GitHub 默认分支               | Settings 改默认分支后再删                    |
| 6   | push main 被拒 `protected branch hook declined` | 分支保护生效（这是预期！）           | 走 PR 流程                                   |
| 7   | Merge 按钮永远灰色 `Review required`            | 单人项目自己不能审自己的 PR（死锁）  | **关闭 Require approvals**                   |
| 8   | 状态检查列表搜不到 ci                           | 列表只显示过去一周跑过的检查         | 先推送 workflow 触发一次，再回分支保护页面选 |
| 9   | 直接 push main 竟然成功                         | 没勾选 "Do not allow bypassing"      | 勾选后 Owner 也无法绕过                      |

---

## 四、GitHub 设置备忘（配过一次，忘了回来查）

### 分支保护（Settings → Branches）

```
main 规则：
✅ Require a pull request before merging
   （取消 Require approvals——单人项目）
✅ Require status checks → 选 ci
✅ Do not allow bypassing the above settings
```

### 环境（Settings → Environments）

```
staging：无保护规则，合并后自动部署
production：加 Required reviewers（需人工审批）
```

### GitHub Pages（Settings → Pages）

```
Source = GitHub Actions（不是 Deploy from a branch！）
```

---

## 五、当前项目配置要点

| 配置       | 位置                                  | 值                                                                      |
| ---------- | ------------------------------------- | ----------------------------------------------------------------------- |
| base 路径  | vite.config.ts                        | `/CICD/`                                                                |
| 路由 base  | src/router/index.ts                   | `createWebHistory('/CICD/')`                                            |
| 删 console | vite.config.ts                        | `minify: 'terser'` + `compress.pure_funcs: ['console.log']`（只删 log） |
| workflow   | .github/workflows/deploy.yml          | ci / deploy-staging / deploy-production 三 job                          |
| 备份       | .github/workflows/deploy_back.yml.bak | 旧版逐行注释（.bak 后缀不会被 GitHub 执行）                             |
| 提交前检查 | .husky/pre-commit                     | `pnpm exec lint-staged`                                                 |

---

## 六、待办 / 可升级项

- [ ] production 真实部署（建第二仓库当 prod 站点，或接自有服务器）
- [ ] 页面加环境标识（staging/prod 版本号可见，验证部署差异）
- [ ] 组织级 reusable workflow（等多人协作场景）
- [ ] main 分支的 `test: verify protection again` 等测试提交可清理
- [ ] 本地 master 分支已废弃，可删除
