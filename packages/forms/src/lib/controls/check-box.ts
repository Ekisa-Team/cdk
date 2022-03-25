import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class CheckBox extends BaseControl<boolean> {
  override type = FormControlType.CheckBox;
  override key: string;
  override value: boolean | null;
  override label: string | undefined;

  constructor(value: boolean | null, options: { key: string; label?: string } = { key: '' }) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.label = options.label;
  }

  override getValue(): boolean {
    const node = document.querySelector(`#${this.key}`) as HTMLInputElement | null;
    return node?.checked || false;
  }
}
