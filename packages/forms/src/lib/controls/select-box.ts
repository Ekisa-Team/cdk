import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class SelectBox extends BaseControl<string> {
  override type = FormControlType.SelectBox;
}
