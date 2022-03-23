import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class CheckBox extends BaseControl<boolean> {
  override type = FormControlType.CheckBox;
}
