import { FormControlType } from '../types/form-control-type.enum';
import { ValidatorFn } from '../validators';
import { AbstractControl } from './abstract-control';

export class TextBox extends AbstractControl {
  override type: FormControlType = 'TextBox';
  override key: string;
  override value: string | null;
  override label: string | undefined;
  override validators: ValidatorFn[];
  placeholder: string | undefined;

  constructor(
    value: string | null,
    options: {
      key: string;
      label?: string;
      placeholder?: string;
      validators?: ValidatorFn[];
    } = {
      key: '',
    },
  ) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.label = options.label;
    this.placeholder = options.placeholder;
    this.validators = options.validators || [];
  }
}
