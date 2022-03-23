import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export class NumberBox extends BaseControl<number> {
  override type = FormControlType.NumberBox;
  override label: string | undefined;
  min: number | undefined;
  max: number | undefined;

  constructor(
    name: string,
    options: { label?: string; min?: number; max?: number; placeholder?: string } = {},
  ) {
    super(name);
    this.label = options.label;
    this.min = options.min;
    this.max = options.max;
  }
}
