import { AbstractControl } from './controls/abstract-control';

/**
 * @description
 * Defines the map of errors returned from failed validation checks.
 *
 * @publicApi
 */
export type ValidationErrors = {
  [key: string]: any;
};

/**
 * @description
 * A function that receives a control and synchronously returns a map of
 * validation errors if present, otherwise null.
 *
 * @publicApi
 */
export interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

/**
 * @description
 * A function that receives a control and returns a Promise
 * that emits validation errors if present, otherwise null.
 *
 * @publicApi
 */
export interface AsyncValidatorFn {
  (control: AbstractControl): Promise<ValidationErrors | null>;
}

const isEmptyInputValue = (value: any): boolean => [null, undefined, ''].includes(value);

const hasValidLength = (value: any): boolean =>
  value !== null && value !== undefined && typeof value.length === 'number';

/**
 * Validator that requires the control have a non-empty value.
 */
export function requiredValidator(control: AbstractControl): ValidationErrors | null {
  return isEmptyInputValue(control.getValue()) ? { required: true } : null;
}

/**
 * Validator that requires the control's value be true.
 */
export function requiredTrueValidator(control: AbstractControl): ValidationErrors | null {
  return control.getValue() === true ? null : { required: true };
}

/**
 * Validator that requires the control's value pass an email validation test.
 */
export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const controlValue = control.getValue();

  if (isEmptyInputValue(controlValue)) {
    return null; // don't validate empty values to allow optional controls
  }

  const EMAIL_REGEXP =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return EMAIL_REGEXP.test(controlValue) ? null : { email: true };
}

/**
 * Validator that requires the control's value to be greater than or equal to the provided number.
 */
export function minValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlValue = control.getValue();

    if (isEmptyInputValue(controlValue)) {
      return null; // don't validate empty values to allow optional controls
    }

    const value = parseFloat(controlValue);

    return !isNaN(value) && value < min ? { min: { min, current: value } } : null;
  };
}

/**
 * Validator that requires the control's value to be less than or equal to the provided number.
 */
export function maxValidator(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlValue = control.getValue();

    if (isEmptyInputValue(controlValue)) {
      return null; // don't validate empty values to allow optional controls
    }

    const value = parseFloat(controlValue);

    return !isNaN(value) && value > max ? { max: { max, current: value } } : null;
  };
}

/**
 * Validator that requires the length of the control's value to be greater than or equal
 */
export function minLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlValue = control.getValue();

    if (isEmptyInputValue(controlValue) || !hasValidLength(controlValue)) {
      // don't validate empty values to allow optional controls
      // don't validate values without `length` property
      return null;
    }

    return controlValue.length < minLength
      ? { minLength: { requiredLength: minLength, currentLength: controlValue.length } }
      : null;
  };
}

/**
 * Validator that requires the length of the control's value to be less than or equal
 */
export function maxLengthValidator(maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlValue = control.getValue();

    if (isEmptyInputValue(controlValue) || !hasValidLength(controlValue)) {
      // don't validate empty values to allow optional controls
      // don't validate values without `length` property
      return null;
    }

    return controlValue.length > maxLength
      ? { maxLength: { requiredLength: maxLength, currentLength: controlValue.length } }
      : null;
  };
}

/**
 * Validator that requires the control's value to match a regex pattern.
 */
// export function patternValidator(pattern: RegExp): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const controlValue = control.getValue();

//     if (isEmptyInputValue(controlValue) || !pattern) {
//       return null; // don't validate empty values to allow optional controls
//     }

//     const value = controlValue as string;
//     return pattern.test(value)
//       ? null
//       : { pattern: { requiredPattern: pattern.toString(), currentValue: value } };
//   };
// }

/**
 * @description
 * Provides a set of built-in validators that can be used by form controls.
 *
 * A validator is a function that processes a `FormControl` or collection of
 * controls and returns an error map or null. A null map means that validation has passed.
 *
 *
 * @publicApi
 */
export class Validators {
  static required = (control: AbstractControl): ValidationErrors | null =>
    requiredValidator(control);

  static requiredTrue = (control: AbstractControl): ValidationErrors | null =>
    requiredTrueValidator(control);

  static email = (control: AbstractControl): ValidationErrors | null => emailValidator(control);

  static min = (min: number): ValidatorFn => minValidator(min);

  static max = (max: number): ValidatorFn => maxValidator(max);

  static minLength = (minLength: number): ValidatorFn => minLengthValidator(minLength);

  static maxLength = (maxLength: number): ValidatorFn => maxLengthValidator(maxLength);

  // static pattern = (pattern: RegExp): ValidatorFn => patternValidator(pattern);
}
