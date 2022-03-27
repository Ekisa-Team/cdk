import { FormControlType } from '../enums/form-control-type.enum';
import { FormControls } from '../types/form-control.type';
import { AbstractControl } from './abstract-control';

export class FieldSet extends AbstractControl {
  override type = FormControlType.FieldSet;
  legend: string | undefined;
  children: FormControls = [];

  constructor(options: { legend?: string; children?: FormControls } = {}) {
    super(options);
    this.legend = options.legend;
    this.children = options.children || [];
  }
}
