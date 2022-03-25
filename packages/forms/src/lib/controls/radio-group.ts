import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export type RadioGroupItem = {
  value: string;
  label: string;
};

export class RadioGroup extends BaseControl<string> {
  override type = FormControlType.RadioGroup;
  override key: string;
  override value: string | null;
  text: string | undefined;
  items: RadioGroupItem[] = [];

  constructor(
    value: string | null,
    options: { key: string; text?: string; items: RadioGroupItem[] } = { key: '', items: [] },
  ) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.text = options.text;
    this.items = options.items;
  }

  override getValue(): string | null {
    const node = Array.from<HTMLInputElement>(
      document.querySelectorAll(`[name=${this.key}]`),
    )?.find((n) => n.checked) as HTMLInputElement | null;

    return node?.value || null;
  }
}
