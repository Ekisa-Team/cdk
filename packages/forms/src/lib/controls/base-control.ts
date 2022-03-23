import { FormControlType } from '../enums/form-control-type.enum';

export abstract class BaseControl<ValueType> {
  name: string;
  type: FormControlType | undefined;
  label: string | undefined;
  value: ValueType | undefined;
  order: number;

  constructor(
    name: string,
    options: { value?: ValueType; label?: string; order?: number; type?: FormControlType } = {},
  ) {
    this.name = name;
    this.value = options.value;
    this.label = options.label;
    this.order = options.order ?? 1;
    this.type = options.type;
  }
}
