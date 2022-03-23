import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class TimePicker extends BaseControl<Date> {
  override type = FormControlType.TimePicker;
  override label: string | undefined;

  constructor(name: string, options: { label?: string } = {}) {
    super(name);
    this.label = options.label;
  }
}
