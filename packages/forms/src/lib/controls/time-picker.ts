import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class TimePicker extends BaseControl<Date> {
  override type = FormControlType.TimePicker;
  override key: string;
  override value: Date | null;
  override label: string | undefined;

  constructor(value: Date | null, options: { key: string; label?: string } = { key: '' }) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.label = options.label;
  }

  override getValue(): Date | null {
    const node = document.querySelector(`#${this.key}`) as HTMLInputElement | null;
    return node?.valueAsDate || null;
  }
}
