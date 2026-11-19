import { POPUP_CATEGORIES } from '@popupcare/core';
import { defineBackground } from 'wxt/utils/define-background';

export default defineBackground(() => {
  console.debug('[PopupCare] background service worker 已就绪', {
    popupCategories: POPUP_CATEGORIES.length,
  });
});