import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class NumberBox extends BaseControl<number> {
  override type = FormControlType.NumberBox;
  override key: string;
  override value: number | null;
  override label: string | undefined;
  min: number | undefined;
  max: number | undefined;

  constructor(
    value: number | null,
    options: { key: string; label?: string; min?: number; max?: number; placeholder?: string } = {
      key: '',
    },
  ) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.label = options.label;
    this.min = options.min;
    this.max = options.max;
  }

  override getValue(): number | null {
    const node = document.querySelector(`#${this.key}`) as HTMLInputElement | null;
    return node?.valueAsNumber || null;
  }
}
