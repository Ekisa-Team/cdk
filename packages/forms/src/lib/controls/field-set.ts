import { FormControlType } from '../enums/form-control-type.enum';
import { Columns } from '../types/columns.type';
import { FormControls } from '../types/form-control.type';
import { AbstractControl } from './abstract-control';

export class FieldSet extends AbstractControl {
  override type = FormControlType.FieldSet;
  legend: string | undefined;
  cols: Columns | undefined;
  children: FormControls = [];

  constructor(options: { legend?: string; cols?: Columns; children?: FormControls } = {}) {
    super(options);
    this.legend = options.legend;
    this.cols = options.cols || 1;
    this.children = options.children || [];
  }
}
