import { FormControlType } from '../types/form-control-type.enum';
import { ValidatorFn } from '../validators';
import { AbstractControl } from './abstract-control';

export class TextArea extends AbstractControl {
  override type: FormControlType = 'TextArea';
  override key: string;
  override value: string | null;
  override label: string | undefined;
  override validators: ValidatorFn[];
  placeholder: string | undefined;
  cols: number | undefined;
  rows: number | undefined;

  constructor(
    value: string | null,
    options: {
      key: string;
      label?: string;
      placeholder?: string;
      cols?: number;
      rows?: number;
      validators?: ValidatorFn[];
    } = {
      key: '',
    },
  ) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.label = options.label;
    this.validators = options.validators || [];
    this.placeholder = options.placeholder;
    this.cols = options.cols;
    this.rows = options.rows;
  }
}
