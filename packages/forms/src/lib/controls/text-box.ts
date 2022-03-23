import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class TextBox extends BaseControl<string> {
  override type = FormControlType.TextBox;
  override label: string | undefined;
  placeholder: string | undefined;

  constructor(name: string, options: { label?: string; placeholder?: string } = {}) {
    super(name);
    this.label = options.label;
    this.placeholder = options.placeholder;
  }
}
