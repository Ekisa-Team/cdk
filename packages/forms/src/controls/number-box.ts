import { FormControlType } from '../types/form-control-type.enum';
import { ValidatorFn } from '../validators';
import { AbstractControl } from './abstract-control';

export class NumberBox extends AbstractControl {
  override type: FormControlType = 'NumberBox';
  override key: string;
  override value: number | null;
  override label: string | undefined;
  override validators: ValidatorFn[];
  min: number | undefined;
  max: number | undefined;

  constructor(
    value: number | null,
    options: {
      key: string;
      label?: string;
      validators?: ValidatorFn[];
      min?: number;
      max?: number;
    } = {
      key: '',
    },
  ) {
    super(value, options);
    this.value = value;
    this.key = options.key;
    this.label = options.label;
    this.validators = options.validators || [];
    this.min = options.min;
    this.max = options.max;
  }

  override getValue(): number | null {
    const node = this.getElement() as HTMLInputElement | null;
    return node?.valueAsNumber || null;
  }

  override setValue(value: number): void {
    const node = this.getElement() as HTMLInputElement | null;
    if (!node) return;
    node.valueAsNumber = value;
  }
}
