import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class DatePicker extends BaseControl<Date> {
  override type = FormControlType.DatePicker;
}
