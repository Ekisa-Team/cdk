import { Columns } from '../types/columns.type';
import { FormControlType } from '../types/form-control-type.enum';
import { FormControls } from '../types/form-control.type';

export class FieldSet {
  type: FormControlType = 'FieldSet';
  legend: string | undefined;
  cols: Columns | undefined;
  children: FormControls = [];

  constructor(options: { legend?: string; cols?: Columns; children?: FormControls } = {}) {
    this.legend = options.legend;
    this.cols = options.cols || 1;
    this.children = options.children || [];
  }
}
