import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class TextBox extends BaseControl<string> {
  override type = FormControlType.TextBox;
  override key: string;
  override value: string | null;
  override label: string | undefined;
  placeholder: string | undefined;

  constructor(
    value: string | null,
    options: { key: string; label?: string; placeholder?: string } = { key: '' },
  ) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.label = options.label;
    this.placeholder = options.placeholder;
  }
}
