import { POPUP_CATEGORIES } from '@popupcare/core';

export default function App() {
  return (
    <main className="home">
      <h1>探窗 PopupCare</h1>
      <p className="tagline">探知弹窗背后的信息，守护每一次自主选择。</p>
      <p>面向全盲用户的 AI 网页弹窗理解与安全交互助手。</p>
      <p className="status">
        阶段 0：项目骨架已就绪，共享核心模块已连接（当前定义{' '}
        {POPUP_CATEGORIES.length} 种弹窗类别）。
      </p>
    </main>
  );
}