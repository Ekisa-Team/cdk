import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class TextBox extends BaseControl<string> {
  override type = FormControlType.TextBox;
}
