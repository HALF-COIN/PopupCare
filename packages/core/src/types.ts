export type PopupCategory =
  | 'advertisement'
  | 'subscription'
  | 'payment'
  | 'privacy'
  | 'authentication'
  | 'unknown';

export type RiskLevel = 'low' | 'medium' | 'high' | 'unknown';

export interface PopupButton {
  label: string;
}

export type PopupInputKind = 'text' | 'password' | 'verification-code' | 'other';

export interface PopupInput {
  label: string;
  // 只描述输入框的用途，绝不记录用户输入的值（尤其是密码与验证码）。
  kind: PopupInputKind;
}

export interface PopupInfo {
  id: string;
  title: string;
  content: string;
  buttons: PopupButton[];
  inputs: PopupInput[];
  category: PopupCategory;
  riskLevel: RiskLevel;
  /** 置信度，取值范围 0–1 */
  confidence: number;
  evidence: string[];
}