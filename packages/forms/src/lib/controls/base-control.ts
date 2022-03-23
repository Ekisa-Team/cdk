import { FormControlType } from '../enums/form-control-type.enum';

export class BaseControl<ValueType> {
  value: ValueType | undefined;
  order: number;
  type: FormControlType | undefined;

  constructor(options: { value?: ValueType; order?: number; type?: FormControlType } = {}) {
    this.value = options.value;
    this.order = options.order ?? 1;
    this.type = options.type;
  }
}
