import { FormControlType } from '../enums/form-control-type.enum';
import { ValidatorFn } from '../validators';
import { AbstractControl } from './abstract-control';

export class CheckBox extends AbstractControl {
  override type = FormControlType.CheckBox;
  override key: string;
  override value: boolean | null;
  override label: string | undefined;
  override validators: ValidatorFn[];

  constructor(
    value: boolean | null,
    options: { key: string; label?: string; validators?: ValidatorFn[] } = { key: '' },
  ) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.label = options.label;
    this.validators = options.validators || [];
  }

  override getValue(): boolean {
    const node = document.querySelector(`#${this.key}`) as HTMLInputElement | null;
    return node?.checked || false;
  }
}
