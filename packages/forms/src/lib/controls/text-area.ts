import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class TextArea extends BaseControl<string> {
  override type = FormControlType.TextArea;
  override key: string;
  override value: string | null;
  override label: string | undefined;
  placeholder: string | undefined;
  cols: number | undefined;
  rows: number | undefined;

  constructor(
    value: string | null,
    options: { key: string; label?: string; placeholder?: string; cols?: number; rows?: number } = {
      key: '',
    },
  ) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.label = options.label;
    this.placeholder = options.placeholder;
    this.cols = options.cols;
    this.rows = options.rows;
  }
}
