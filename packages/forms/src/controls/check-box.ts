import { FormControlType } from '../types/form-control-type.enum';
import { ValidatorFn } from '../validators';
import { AbstractControl } from './abstract-control';

export class CheckBox extends AbstractControl {
  override type: FormControlType = 'CheckBox';
  override key: string;
  override value: boolean | null;
  override label: string;
  override validators: ValidatorFn[];

  constructor(
    value: boolean | null,
    options: { key: string; label: string; validators?: ValidatorFn[] } = { key: '', label: '' },
  ) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.label = options.label;
    this.validators = options.validators || [];
  }

  override getValue(): boolean {
    const node = this.getElement() as HTMLInputElement | null;
    return node?.checked || false;
  }

  override setValue(value: boolean): void {
    const node = this.getElement() as HTMLInputElement | null;
    if (!node) return;
    node.checked = value;
  }
}
