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
} from './controls';
import { FormControlType } from './enums/form-control-type.enum';
import { FormControls } from './types/form-control.type';

const renderTextBox = (config: TextBox): HTMLInputElement => {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = config.key;
  input.name = config.key;
  input.placeholder = config.placeholder ?? '';
  input.value = config.value ?? '';

  return input;
};

const renderTextArea = (config: TextArea): HTMLTextAreaElement => {
  const textarea = document.createElement('textarea');
  textarea.id = config.key;
  textarea.name = config.key;
  textarea.placeholder = config.placeholder ?? '';
  textarea.value = config.value ?? '';

  if (config.cols) {
    textarea.cols = config.cols;
  }

  if (config.rows) {
    textarea.rows = config.rows;
  }

  return textarea;
};

const renderNumberBox = (config: NumberBox): HTMLInputElement => {
  const input = document.createElement('input');
  input.id = config.key;
  input.name = config.key;
  input.type = 'number';

  if (config.value !== undefined && config.value !== null) {
    input.valueAsNumber = config.value;
  }

  if (config.min !== undefined) {
    input.min = config.min.toString();
  }

  if (config.max !== undefined) {
    input.max = config.max.toString();
  }

  return input;
};

const renderSelectBox = (config: SelectBox): HTMLSelectElement => {
  const select = document.createElement('select');
  select.id = config.key;
  select.name = config.key;

  for (const opt of config.options) {
    const option = document.createElement('option');
    option.value = opt.value;
    option.text = opt.text;
    select.append(option);
  }

  if (config.value) {
    select.value = config.value;
  }

  return select;
};

const renderCheckBox = (config: CheckBox): HTMLInputElement => {
  const input = document.createElement('input');
  input.id = config.key;
  input.name = config.key;
  input.type = 'checkbox';
  input.checked = config.value ?? false;
  return input;
};

const renderRadioGroup = (config: RadioGroup): HTMLDivElement => {
  const wrapper = document.createElement('div');

  if (config.text) {
    const p = document.createElement('p');
    p.textContent = config.text;
    wrapper.append(p);
  }

  for (let i = 0; i < config.items.length; i++) {
    const item = config.items[i];
    const id = config.key + i;

    const input = document.createElement('input');
    input.type = 'radio';
    input.id = id;
    input.name = config.key;
    input.value = item.value;
    wrapper.append(input);

    const label = renderLabel(item.label, id);
    wrapper.append(label);
  }

  if (config.value) {
    // Search node inside wrapper element
    const node = Array.from<HTMLInputElement>(
      wrapper.querySelectorAll(`[name=${config.key}]`),
    )?.find((node) => node.value === config.value) as HTMLInputElement | null;

    // Set node value if it's found
    if (node) {
      node.checked = true;
    }
  }

  return wrapper;
};

const renderDatePicker = (config: DatePicker): HTMLInputElement => {
  const input = document.createElement('input');
  input.id = config.key;
  input.name = config.key;
  input.type = 'date';
  input.valueAsDate = config.value;
  return input;
};

const renderTimePicker = (config: TimePicker): HTMLInputElement => {
  const input = document.createElement('input');
  input.id = config.key;
  input.name = config.key;
  input.type = 'time';
  input.valueAsDate = config.value;
  return input;
};

const renderWrapper = (): HTMLDivElement => {
  const div = document.createElement('div');
  return div;
};

const renderLabel = (text: string, htmlFor = '') => {
  const label = document.createElement('label');
  label.textContent = text;
  label.htmlFor = htmlFor;
  return label;
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
    const wrapper = renderWrapper();

    if (control.label) {
      const label = renderLabel(control.label, control.key);
      wrapper.append(label);
    }

    switch (control.type) {
      case FormControlType.FieldSet:
        target.append(renderFieldSet(control as FieldSet));
        break;
      case FormControlType.TextBox:
        {
          wrapper.append(renderTextBox(control as TextBox));
          target.append(wrapper);
        }
        break;
      case FormControlType.TextArea:
        {
          wrapper.append(renderTextArea(control as TextArea));
          target.append(wrapper);
        }
        break;
      case FormControlType.NumberBox:
        {
          wrapper.append(renderNumberBox(control as NumberBox));
          target.append(wrapper);
        }
        break;
      case FormControlType.SelectBox:
        {
          wrapper.append(renderSelectBox(control as SelectBox));
          target.append(wrapper);
        }
        break;
      case FormControlType.CheckBox:
        {
          wrapper.append(renderCheckBox(control as CheckBox));
          target.append(wrapper);
        }
        break;
      case FormControlType.RadioGroup:
        {
          wrapper.append(renderRadioGroup(control as RadioGroup));
          target.append(wrapper);
        }
        break;
      case FormControlType.DatePicker:
        {
          wrapper.append(renderDatePicker(control as DatePicker));
          target.append(wrapper);
        }
        break;
      case FormControlType.TimePicker:
        {
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
