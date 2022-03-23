import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export type SelectBoxOption = {
  value: string;
  text: string;
  meta?: string[];
};

export class SelectBox extends BaseControl<string> {
  override type = FormControlType.SelectBox;
  override label: string | undefined;
  options: SelectBoxOption[] = [];

  constructor(name: string, options: { label?: string; options?: SelectBoxOption[] } = {}) {
    super(name);
    this.label = options.label;
    this.options = options.options || [];
  }
}
