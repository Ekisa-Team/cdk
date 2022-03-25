import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export type SelectBoxOption = {
  value: string;
  text: string;
  meta?: string[];
};

export class SelectBox extends BaseControl<string> {
  override type = FormControlType.SelectBox;
  override key: string;
  override value: string | null;
  override label: string | undefined;
  options: SelectBoxOption[] = [];

  constructor(
    value: string | null,
    options: { key: string; label?: string; options?: SelectBoxOption[] } = { key: '' },
  ) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.label = options.label;
    this.options = options.options || [];
  }
}
