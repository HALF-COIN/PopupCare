import type { PopupCategory, RiskLevel } from './types';

export const POPUP_CATEGORIES = [
  'advertisement',
  'subscription',
  'payment',
  'privacy',
  'authentication',
  'unknown',
] as const satisfies readonly PopupCategory[];

export const RISK_LEVELS = [
  'low',
  'medium',
  'high',
  'unknown',
] as const satisfies readonly RiskLevel[];

export function isPopupCategory(value: unknown): value is PopupCategory {
  return (
    typeof value === 'string' &&
    (POPUP_CATEGORIES as readonly string[]).includes(value)
  );
}

export function isRiskLevel(value: unknown): value is RiskLevel {
  return (
    typeof value === 'string' && (RISK_LEVELS as readonly string[]).includes(value)
  );
}