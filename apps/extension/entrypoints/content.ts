import { defineContentScript } from 'wxt/utils/define-content-script';

export default defineContentScript({
  // 阶段 0 仅匹配保留示例域名，不申请全站访问；后续阶段改为用户主动授权模式。
  matches: ['https://example.com/*'],
  main() {
    console.debug('[PopupCare] content script 已就绪（尚未启用弹窗检测）');
  },
});