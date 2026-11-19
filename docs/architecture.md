# 探窗 PopupCare 技术架构（阶段 0）

## 总体结构

pnpm workspaces Monorepo，网站与扩展共享同一个 TypeScript 核心模块：

```
apps/web ────────┐
                 ├──► packages/core（类型 + 纯业务逻辑，无 UI、无副作用）
apps/extension ──┘
apps/api（预留）──► 未来唯一持有 API Key 的服务端代理
```

- `packages/core` 以 TypeScript 源码形式导出（`exports: "./src/index.ts"`），由 Vite / WXT / Vitest 直接编译消费，无需独立构建步骤。
- 核心模块只包含类型与纯函数，保证可在浏览器扩展、网站、Node 测试环境中同构运行。

## 各应用职责

| 模块 | 职责 | 阶段 0 状态 |
| --- | --- | --- |
| `apps/web` | 官方网站 + 在线体验实验室 | 最小首页（品牌名 + 宣传语），引用核心模块 |
| `apps/extension` | 弹窗检测、语义提取、风险分析、无障碍交互 | 最小骨架：background / content script / popup |
| `apps/api` | AI 服务端代理，隔离 API Key | 仅占位说明，无代码 |
| `packages/core` | `PopupInfo` 等类型与纯逻辑 | 类型定义 + 类别/风险等级守卫函数 |
| `tests` | 跨模块测试案例 | 核心模块基础测试（Vitest） |

## 核心类型

`PopupInfo`：`id`、`title`、`content`、`buttons`、`inputs`、`category`、`riskLevel`、`confidence`（0–1）、`evidence`。

- `PopupCategory`：advertisement / subscription / payment / privacy / authentication / unknown
- `RiskLevel`：low / medium / high / unknown
- `PopupInput` 只记录输入框用途（`kind`），**绝不存储用户输入值**，密码与验证码输入框的值在任何阶段都不进入数据流。

## 扩展权限策略

- Manifest V3，`permissions: []`，无 `host_permissions`。
- 阶段 0 content script 仅匹配 `https://example.com/*`（保留示例域名），不读取任何真实页面。
- 后续阶段采用用户主动授权（如 `activeTab` 或可选权限），绝不默认静默读取所有网站。

## 无障碍交互原则（后续阶段实现）

- 屏幕阅读器协同通过 ARIA Live Region 播报，不自动移动焦点。
- 所有支付、授权、订阅、登录操作只能由用户显式确认，扩展不代为执行。

## 质量保障

- 全局 `tsconfig.base.json`：`strict` + `noUncheckedIndexedAccess` 等严格选项，所有工作区继承。
- 根目录 `pnpm typecheck` 一次性检查全部工作区与测试。
- Vitest 测试位于 `tests/`，`pnpm test` 运行。