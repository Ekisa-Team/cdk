import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class RadioGroup extends BaseControl<string> {
  override type = FormControlType.RadioGroup;
}
