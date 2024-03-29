import { FormControlType } from '../types/form-control-type.enum';
import { ValidationErrors, ValidatorFn } from '../validators';

export abstract class AbstractControl {
  value: unknown | null;
  key: string;
  label: string | undefined;
  type: FormControlType | undefined;
  validators: ValidatorFn[];

  get errors(): ValidationErrors[] | null {
    const errors: ValidationErrors[] | null = [];

    for (const validator of this.validators) {
      const result = validator(this);

      if (result) {
        errors.push(result);
      }
    }

    return errors.length === 0 ? null : errors;
  }

  constructor(
    value: unknown | null,
    options: {
      key: string;
      label?: string;
      order?: number;
      type?: FormControlType;
      validators?: ValidatorFn[];
    } = { key: '' },
  ) {
    this.value = value;
    this.key = options.key;
    this.label = options.label;
    this.type = options.type;
    this.validators = options.validators || [];
  }

  getElement<T extends HTMLElement>(): T | null {
    return document.querySelector(`#${this.key}`);
  }

  getParentElement(): HTMLDivElement | null {
    return document
      .querySelector(`#${this.key}`)
      ?.closest('[data-unit-type="Wrapper"]') as HTMLDivElement;
  }

  getValidationsElement(): HTMLElement | null {
    return this.getParentElement()?.querySelector(
      '[data-unit-type="ValidationsWrapper"]',
    ) as HTMLElement;
  }

  getValue(): any | null {
    const element = this.getElement();

    if (!element) return null;

    return (element as any)?.value.trim() || null;
  }

  setValue(value: any): void {
    const element = this.getElement() as any;

    if (!element) return;

    element.value = value;
  }
}
