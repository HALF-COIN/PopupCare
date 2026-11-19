# 探窗 PopupCare

> 探知弹窗背后的信息，守护每一次自主选择。

探窗 PopupCare 是一套面向全盲用户的 **AI 网页弹窗理解与安全交互助手**：主动检测网页弹窗，提取弹窗语义并分析风险，用中文向用户解释弹窗内容与后果，并通过屏幕阅读器协同（ARIA Live Region）实现无障碍、不抢夺焦点的安全交互。

本项目参加 **2026 Qoder 高校创造力大赛 · Hack4Good 技术向善赛道**。

当前处于 **阶段 0（项目初始化）**：仅包含可运行的项目骨架、共享核心类型模块、最小网站入口、最小 Chrome 扩展入口与测试机制，尚未实现弹窗检测与 AI 解释等业务功能。

## 技术栈

- React 19 + TypeScript（严格模式）+ Vite 6 —— 官方网站与在线体验
- WXT + Chrome Extension Manifest V3 —— 桌面版扩展
- Vitest —— 单元测试
- pnpm workspaces —— Monorepo 管理
- Git —— 版本控制

网站与扩展共用 `packages/core` 中的 TypeScript 核心分析模块（类型与纯业务逻辑，UI 无关）。

## 项目目录

```
PopupCare/
├── apps/
│   ├── web/          # 官方网站与在线体验实验室（React + Vite）
│   ├── extension/    # Chrome 扩展（WXT + Manifest V3）
│   └── api/          # 预留 AI 服务端代理（本阶段仅占位，不部署）
├── packages/
│   └── core/         # 共享核心模块：PopupInfo 等类型定义与纯逻辑
├── tests/            # Vitest 测试案例
├── docs/             # 技术文档
├── package.json      # 工作区根配置与统一脚本
├── pnpm-workspace.yaml
├── tsconfig.base.json# 全局严格 TypeScript 配置
└── vitest.config.ts
```

## 环境要求

- Node.js ≥ 20（已在 v24 上验证）
- pnpm ≥ 12（已在 12.21.0 上验证；安装：`npm install -g pnpm`）
- Git
- Chrome 浏览器（用于加载扩展）

## 安装

```bash
pnpm install
```

## 常用命令（在仓库根目录执行）

| 用途 | 命令 |
| --- | --- |
| 启动网站开发服务器 | `pnpm dev`（默认 http://localhost:5173） |
| 构建网站（生产） | `pnpm build:web`（产物在 `apps/web/dist/`） |
| 构建 Chrome 扩展 | `pnpm build:ext`（产物在 `apps/extension/.output/chrome-mv3/`） |
| 构建全部 | `pnpm build` |
| 运行单元测试 | `pnpm test` |
| TypeScript 类型检查（全部工作区） | `pnpm typecheck` |
| 扩展开发模式（自动重载） | `pnpm --filter @popupcare/extension dev` |

## 在 Chrome 中加载扩展

1. 执行 `pnpm build:ext` 生成扩展产物。
2. 打开 Chrome，地址栏输入 `chrome://extensions` 并回车。
3. 打开右上角的 **开发者模式**。
4. 点击 **加载已解压的扩展程序**，选择目录：
   `apps/extension/.output/chrome-mv3`
5. 加载成功后，工具栏会出现「探窗 PopupCare」图标，点击可打开 popup。

阶段 0 的扩展不申请任何网站访问权限（content script 仅匹配保留示例域名 `example.com`），不会读取任何页面内容。

## 全局开发约束

1. TypeScript 严格类型检查；业务逻辑与 UI 分离。
2. 网站与扩展共享 `@popupcare/core` 核心分析模块。
3. 不在前端暴露任何 API Key（AI 调用未来经由 `apps/api` 服务端代理）。
4. 不读取、不保存密码与验证码输入值。
5. 不自动执行支付、授权、订阅或登录。
6. 屏幕阅读器协同使用 ARIA Live Region，不抢夺用户当前焦点。
7. 用户权限必须明确授予，不默认静默读取所有网站。
8. 核心功能必须有可验证的测试；不使用虚假数据冒充真实检测。

## 更多文档

- [技术架构说明](docs/architecture.md)