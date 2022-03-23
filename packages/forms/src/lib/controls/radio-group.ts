import { FormControlType } from '../enums/form-control-type.enum';
import { BaseControl } from './base-control';

export type RadioGroupItem = {
  value: string;
  label: string;
};

export class RadioGroup extends BaseControl<string> {
  override type = FormControlType.RadioGroup;
  text: string | undefined;
  items: RadioGroupItem[] = [];

  constructor(name: string, options: { text?: string; items: RadioGroupItem[] } = { items: [] }) {
    super(name);
    this.text = options.text;
    this.items = options.items;
  }
}
