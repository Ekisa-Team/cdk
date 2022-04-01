import { FormControlType } from '../enums/form-control-type.enum';
import { ValidatorFn } from '../validators';
import { AbstractControl } from './abstract-control';

export type RadioGroupItem = {
  value: string;
  label: string;
};

export class RadioGroup extends AbstractControl {
  override type = FormControlType.RadioGroup;
  override key: string;
  override value: string | null;
  override validators: ValidatorFn[];
  text: string | undefined;
  items: RadioGroupItem[] = [];

  constructor(
    value: string | null,
    options: { key: string; text?: string; items: RadioGroupItem[]; validators?: ValidatorFn[] } = {
      key: '',
      items: [],
    },
  ) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.text = options.text;
    this.items = options.items;
    this.validators = options.validators || [];
  }

  override getElement<T extends HTMLElement>(): T | null {
    return document.querySelector(`[data-unit-type="RadioGroup"]`);
  }

  override getParentElement(): HTMLDivElement | null {
    return document.querySelector(`[data-unit-type="RadioGroup"]`)?.parentElement as HTMLDivElement;
  }

  override getValue(): string | null {
    const node = Array.from<HTMLInputElement>(
      document.querySelectorAll(`[name=${this.key}]`),
    )?.find((n) => n.checked) as HTMLInputElement | null;

    return node?.value || null;
  }
}
