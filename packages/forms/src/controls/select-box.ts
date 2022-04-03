import { FormControlType } from '../types/form-control-type.enum';
import { ValidatorFn } from '../validators';
import { AbstractControl } from './abstract-control';

export type SelectBoxOption = {
  value: string;
  text: string;
  meta?: string;
};

export class SelectBox extends AbstractControl {
  override type: FormControlType = 'SelectBox';
  override key: string;
  override value: string | null;
  override label: string | undefined;
  override validators: ValidatorFn[];
  options: SelectBoxOption[] = [];

  constructor(
    value: string | null,
    options: {
      key: string;
      label?: string;
      options?: SelectBoxOption[];
      validators?: ValidatorFn[];
    } = { key: '' },
  ) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.label = options.label;
    this.options = options.options || [];
    this.validators = options.validators || [];
  }
}
