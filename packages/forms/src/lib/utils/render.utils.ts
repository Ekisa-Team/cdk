import {
  CheckBox,
  DatePicker,
  NumberBox,
  RadioGroup,
  SelectBox,
  TextArea,
  TextBox,
  TimePicker,
} from '../controls';
import { FormControlType } from '../enums/form-control-type.enum';
import { FormControls } from '../types/form-control.type';

const renderTextBox = (config: TextBox): HTMLInputElement => {
  const input = document.createElement('input');
  input.type = 'text';
  return input;
};

const renderTextArea = (config: TextArea): HTMLTextAreaElement => {
  const textarea = document.createElement('textarea');
  return textarea;
};

const renderNumberBox = (config: NumberBox): HTMLInputElement => {
  const input = document.createElement('input');
  input.type = 'numberbox';
  return input;
};

const renderSelectBox = (config: SelectBox): HTMLSelectElement => {
  const select = document.createElement('select');
  return select;
};

const renderCheckBox = (config: CheckBox): HTMLInputElement => {
  const input = document.createElement('input');
  input.type = 'checkbox';
  return input;
};

const renderRadioGroup = (config: RadioGroup): HTMLDivElement => {
  const input = document.createElement('div');
  return input;
};

const renderDatePicker = (config: DatePicker): HTMLInputElement => {
  const input = document.createElement('input');
  input.type = 'date';
  return input;
};

const renderTimePicker = (config: TimePicker): HTMLInputElement => {
  const input = document.createElement('input');
  input.type = 'time';
  return input;
};

const renderFieldset = (): HTMLFieldSetElement => {
  const fieldset = document.createElement('fieldset');
  return fieldset;
};

const renderForm = (controls: FormControls): HTMLFormElement => {
  const form = document.createElement('form');

  for (const control of controls) {
    switch (control.type) {
      case FormControlType.TextBox:
        form.append(renderTextBox(control as TextBox));
        break;
      case FormControlType.TextArea:
        form.append(renderTextArea(control as TextArea));
        break;
      case FormControlType.NumberBox:
        form.append(renderNumberBox(control as NumberBox));
        break;
      case FormControlType.SelectBox:
        form.append(renderSelectBox(control as SelectBox));
        break;
      case FormControlType.CheckBox:
        form.append(renderCheckBox(control as CheckBox));
        break;
      case FormControlType.RadioGroup:
        form.append(renderRadioGroup(control as RadioGroup));
        break;
      case FormControlType.DatePicker:
        form.append(renderDatePicker(control as DatePicker));
        break;
      case FormControlType.TimePicker:
        form.append(renderTimePicker(control as TimePicker));
        break;
      default:
        console.log(control);
        throw new Error('Form control is not yet supported');
    }
  }

  return form;
};

export default {
  renderTextBox,
  renderTextArea,
  renderNumberBox,
  renderSelectBox,
  renderCheckBox,
  renderRadioGroup,
  renderDatePicker,
  renderTimePicker,
  renderFieldset,
  renderForm,
};
