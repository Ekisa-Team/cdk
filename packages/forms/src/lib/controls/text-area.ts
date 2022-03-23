import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class TextArea extends BaseControl<string> {
  override type = FormControlType.TextArea;
  override label: string | undefined;
  placeholder: string | undefined;
  cols: number | undefined;
  rows: number | undefined;

  constructor(
    name: string,
    options: { label?: string; placeholder?: string; cols?: number; rows?: number } = {},
  ) {
    super(name);
    this.label = options.label;
    this.placeholder = options.placeholder;
    this.cols = options.cols;
    this.rows = options.rows;
  }
}
