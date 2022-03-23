import { FormControlType } from '../enums/form-control-type.enum';
import { FormControls } from '../types/form-control.type';
import { BaseControl } from './base-control';

export class FieldSet extends BaseControl<void> {
  override type = FormControlType.FieldSet;
  legend: string | undefined;
  children: FormControls = [];

  constructor(options: { legend?: string; children?: FormControls } = {}) {
    super('');
    this.legend = options.legend;
    this.children = options.children || [];
  }
}
