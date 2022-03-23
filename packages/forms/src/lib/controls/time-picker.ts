import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class TimePicker extends BaseControl<Date> {
  override type = FormControlType.TimePicker;
}
