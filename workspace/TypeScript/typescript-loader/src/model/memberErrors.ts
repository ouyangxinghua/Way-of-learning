import { FieldValidationResult } from 'lc-form-validation';
// 提供错误类型
export interface MemberErrors {
  login: FieldValidationResult;
}