import { describe, expect, it } from 'vitest';
import {
  POPUP_CATEGORIES,
  RISK_LEVELS,
  isPopupCategory,
  isRiskLevel,
  type PopupInfo,
} from '@popupcare/core';

describe('POPUP_CATEGORIES / isPopupCategory', () => {
  it('包含规格定义的全部六个类别', () => {
    expect([...POPUP_CATEGORIES]).toEqual([
      'advertisement',
      'subscription',
      'payment',
      'privacy',
      'authentication',
      'unknown',
    ]);
  });

  it('接受所有合法类别', () => {
    for (const category of POPUP_CATEGORIES) {
      expect(isPopupCategory(category)).toBe(true);
    }
  });

  it('拒绝非法值', () => {
    expect(isPopupCategory('cookie')).toBe(false);
    expect(isPopupCategory('')).toBe(false);
    expect(isPopupCategory(null)).toBe(false);
    expect(isPopupCategory(undefined)).toBe(false);
    expect(isPopupCategory(42)).toBe(false);
  });
});

describe('RISK_LEVELS / isRiskLevel', () => {
  it('包含规格定义的全部四个等级', () => {
    expect([...RISK_LEVELS]).toEqual(['low', 'medium', 'high', 'unknown']);
  });

  it('接受所有合法等级', () => {
    for (const level of RISK_LEVELS) {
      expect(isRiskLevel(level)).toBe(true);
    }
  });

  it('拒绝非法值', () => {
    expect(isRiskLevel('critical')).toBe(false);
    expect(isRiskLevel('')).toBe(false);
    expect(isRiskLevel(null)).toBe(false);
    expect(isRiskLevel(1)).toBe(false);
  });
});

describe('PopupInfo 类型契约', () => {
  it('可以构造符合规格的完整弹窗信息（测试夹具，非真实检测数据）', () => {
    const fixture: PopupInfo = {
      id: 'fixture-001',
      title: '示例订阅弹窗',
      content: '这是一个用于类型检查的测试夹具。',
      buttons: [{ label: '订阅' }, { label: '暂不' }],
      inputs: [{ label: '邮箱', kind: 'text' }],
      category: 'subscription',
      riskLevel: 'medium',
      confidence: 0.9,
      evidence: ['测试夹具'],
    };

    expect(isPopupCategory(fixture.category)).toBe(true);
    expect(isRiskLevel(fixture.riskLevel)).toBe(true);
    expect(fixture.confidence).toBeGreaterThanOrEqual(0);
    expect(fixture.confidence).toBeLessThanOrEqual(1);
    expect(fixture.inputs.every((input) => !('value' in input))).toBe(true);
  });
});