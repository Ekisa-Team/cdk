import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class CheckBox extends BaseControl<boolean> {
  override type = FormControlType.CheckBox;
  override label: string | undefined;

  constructor(name: string, options: { label?: string } = {}) {
    super(name);
    this.label = options.label;
  }
}
