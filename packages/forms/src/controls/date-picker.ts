import { FormControlType } from '../types/form-control-type.enum';
import { ValidatorFn } from '../validators';
import { AbstractControl } from './abstract-control';

export class DatePicker extends AbstractControl {
  override type: FormControlType = 'DatePicker';
  override key: string;
  override value: Date | null;
  override label: string | undefined;
  override validators: ValidatorFn[];

  constructor(
    value: Date | null,
    options: { key: string; label?: string; validators?: ValidatorFn[] } = { key: '' },
  ) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.label = options.label;
    this.validators = options.validators || [];
  }

  override getValue(): Date | null {
    const node = this.getElement() as HTMLInputElement | null;
    return node?.valueAsDate || null;
  }

  override setValue(value: Date): void {
    const node = this.getElement() as HTMLInputElement | null;
    if (!node) return;
    node.valueAsDate = value;
  }
}
