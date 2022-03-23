import {
  CheckBox,
  DatePicker,
  FieldSet,
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

const renderWrapper = (): HTMLDivElement => {
  const div = document.createElement('div');
  return div;
};

const renderFieldSet = (config: FieldSet): HTMLFieldSetElement => {
  const fieldset = document.createElement('fieldset');

  if (config.legend) {
    const legend = document.createElement('legend');
    legend.textContent = config.legend;
    fieldset.append(legend);
  }

  if (config.children.length) {
    render<HTMLFieldSetElement>(fieldset, config.children);
  }

  return fieldset;
};

const renderForm = (controls: FormControls): HTMLFormElement => {
  const form = document.createElement('form');
  return render<HTMLFormElement>(form, controls);
};

function render<T extends HTMLElement>(target: T, controls: FormControls): T {
  for (const control of controls) {
    console.log(control);
    switch (control.type) {
      case FormControlType.FieldSet:
        target.append(renderFieldSet(control as FieldSet));
        break;
      case FormControlType.TextBox:
        {
          const wrapper = renderWrapper();
          wrapper.append(renderTextBox(control as TextBox));
          target.append(wrapper);
        }
        break;
      case FormControlType.TextArea:
        {
          const wrapper = renderWrapper();
          wrapper.append(renderTextArea(control as TextArea));
          target.append(wrapper);
        }
        break;
      case FormControlType.NumberBox:
        {
          const wrapper = renderWrapper();
          wrapper.append(renderNumberBox(control as NumberBox));
          target.append(wrapper);
        }
        break;
      case FormControlType.SelectBox:
        {
          const wrapper = renderWrapper();
          wrapper.append(renderSelectBox(control as SelectBox));
          target.append(wrapper);
        }
        break;
      case FormControlType.CheckBox:
        {
          const wrapper = renderWrapper();
          wrapper.append(renderCheckBox(control as CheckBox));
          target.append(wrapper);
        }
        break;
      case FormControlType.RadioGroup:
        {
          const wrapper = renderWrapper();
          wrapper.append(renderRadioGroup(control as RadioGroup));
          target.append(wrapper);
        }
        break;
      case FormControlType.DatePicker:
        {
          const wrapper = renderWrapper();
          wrapper.append(renderDatePicker(control as DatePicker));
          target.append(wrapper);
        }
        break;
      case FormControlType.TimePicker:
        {
          const wrapper = renderWrapper();
          wrapper.append(renderTimePicker(control as TimePicker));
          target.append(wrapper);
        }
        break;
      default:
        console.log(control);
        throw new Error('Form control is not yet supported');
    }
  }

  return target;
}

export default {
  renderTextBox,
  renderTextArea,
  renderNumberBox,
  renderSelectBox,
  renderCheckBox,
  renderRadioGroup,
  renderDatePicker,
  renderTimePicker,
  renderFieldSet,
  renderForm,
};
