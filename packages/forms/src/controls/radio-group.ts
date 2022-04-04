import { FormControlType } from '../types/form-control-type.enum';
import { ValidatorFn } from '../validators';
import { AbstractControl } from './abstract-control';

export type RadioGroupItem = {
  value: string;
  label: string;
};

export class RadioGroup extends AbstractControl {
  override type: FormControlType = 'RadioGroup';
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

  override getValue(): string | null {
    const node = Array.from<HTMLInputElement>(
      document.querySelectorAll(`[name=${this.key}]`),
    )?.find((n) => n.checked) as HTMLInputElement | null;

    return node?.value || null;
  }

  override setValue(value: string): void {
    const node = Array.from<HTMLInputElement>(
      document.querySelectorAll(`[name=${this.key}]`),
    )?.find((n) => n.value === value) as HTMLInputElement | null;

    if (!node) return;

    node.checked = true;
  }

  reset() {
    Array.from<HTMLInputElement>(document.querySelectorAll(`[name=${this.key}]`))?.forEach(
      (n) => (n.checked = false),
    );
  }
}
