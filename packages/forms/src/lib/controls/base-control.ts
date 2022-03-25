import { FormControlType } from '../enums/form-control-type.enum';

export abstract class BaseControl<ValueType> {
  value: ValueType | null;
  key: string;
  label: string | undefined;
  order: number;
  type: FormControlType | undefined;

  constructor(
    value: ValueType | null,
    options: {
      key: string;
      label?: string;
      order?: number;
      type?: FormControlType;
    } = { key: '' },
  ) {
    this.value = value;
    this.key = options.key;
    this.label = options.label;
    this.order = options.order ?? 1;
    this.type = options.type;
  }

  getValue(): ValueType | null {
    const node = document.querySelector(`#${this.key}`);
    return (node as any)?.value.trim() || null;
  }
}
