import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class NumberBox extends BaseControl<number> {
  override type = FormControlType.NumberBox;
}
