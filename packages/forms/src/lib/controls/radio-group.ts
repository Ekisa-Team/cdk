import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export type RadioGroupItem = {
  value: string;
  label: string;
};

export class RadioGroup extends BaseControl<string> {
  override type = FormControlType.RadioGroup;
  title: string | undefined;
  items: RadioGroupItem[] = [];

  constructor(name: string, options: { title?: string; items: RadioGroupItem[] } = { items: [] }) {
    super(name);
    this.title = options.title;
    this.items = options.items;
  }
}
