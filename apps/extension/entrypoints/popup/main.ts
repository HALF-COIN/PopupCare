import { POPUP_CATEGORIES } from '@popupcare/core';

const status = document.getElementById('status');
if (status) {
  status.textContent = `阶段 0：扩展骨架已就绪，共享核心模块已连接（${POPUP_CATEGORIES.length} 种弹窗类别），弹窗检测尚未启用。`;
}