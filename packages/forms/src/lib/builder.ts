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

/**
 * Build form TextBox & configure it
 * @param config TextBox config
 * @returns HTMLInputElement
 */
const buildTextBox = (config: TextBox): HTMLInputElement => {
  const input = document.createElement('input');
  input.dataset.unitType = FormControlType.TextBox;
  input.type = 'text';
  input.id = config.key;
  input.name = config.key;
  input.placeholder = config.placeholder ?? '';
  input.value = config.value ?? '';

  return input;
};

/**
 * Build form TextArea & configure it
 * @param config TextArea config
 * @returns HTMLTextAreaElement
 */
const buildTextArea = (config: TextArea): HTMLTextAreaElement => {
  const textarea = document.createElement('textarea');
  textarea.dataset.unitType = FormControlType.TextArea;
  textarea.id = config.key;
  textarea.name = config.key;
  textarea.placeholder = config.placeholder ?? '';
  textarea.value = config.value ?? '';

  // Set up cols attribute if there's any
  if (config.cols) {
    textarea.cols = config.cols;
  }

  // Set up rows attribute if there's any
  if (config.rows) {
    textarea.rows = config.rows;
  }

  return textarea;
};

/**
 * Build form NumberBox & configure it
 * @param config NumberBox config
 * @returns HTMLInputElement
 */
const buildNumberBox = (config: NumberBox): HTMLInputElement => {
  const input = document.createElement('input');
  input.dataset.unitType = FormControlType.NumberBox;
  input.id = config.key;
  input.name = config.key;
  input.type = 'number';

  // Set up default value if there's any
  if (config.value !== undefined && config.value !== null) {
    input.valueAsNumber = config.value;
  }

  // Set up min attribute if there's any
  if (config.min !== undefined) {
    input.min = config.min.toString();
  }

  // Set up max attribute if there's any
  if (config.max !== undefined) {
    input.max = config.max.toString();
  }

  return input;
};

/**
 * Build form SeletcBox & configure it
 * @param config SeletcBox config
 * @returns HTMLSelectElement
 */
const buildSelectBox = (config: SelectBox): HTMLSelectElement => {
  const select = document.createElement('select');
  select.dataset.unitType = FormControlType.SelectBox;
  select.id = config.key;
  select.name = config.key;

  // Loop through select box options & assign attributes
  for (const opt of config.options) {
    const option = document.createElement('option');
    option.dataset.unitType = FormControlType.SelectBox + 'Option';
    option.value = opt.value;
    option.text = opt.text;
    select.append(option);
  }

  // Set up default value if there's any
  if (config.value) {
    select.value = config.value;
  }

  return select;
};

/**
 * Build form CheckBox & configure it
 * @param config CheckBox config
 * @returns HTMLInputElement
 */
const buildCheckBox = (config: CheckBox): HTMLDivElement => {
  const input = document.createElement('input');
  input.dataset.unitType = FormControlType.CheckBox + 'Item';
  input.id = config.key;
  input.name = config.key;
  input.type = 'checkbox';
  input.checked = config.value ?? false;

  const itemWrapper = document.createElement('div');
  itemWrapper.dataset.unitType = FormControlType.CheckBox + 'ItemWrapper';
  itemWrapper.append(input);
  itemWrapper.append(buildLabel(config.label, config.key));

  return itemWrapper;
};

/**
 * Build form RadioGroup & configure it
 * @param config RadioGroup config
 * @returns HTMLDivElement
 */
const buildRadioGroup = (config: RadioGroup): HTMLDivElement => {
  const wrapper = document.createElement('div');
  wrapper.dataset.unitType = FormControlType.RadioGroup;

  // Configure main radio group text
  if (config.text) {
    const p = document.createElement('p');
    p.dataset.unitType = FormControlType.RadioGroup + 'Text';
    p.textContent = config.text;
    wrapper.append(p);
  }

  // Loop through radio items & assign attributes
  for (let i = 0; i < config.items.length; i++) {
    const item = config.items[i];
    const id = config.key + i;

    // Radio item
    const input = document.createElement('input');
    input.dataset.unitType = FormControlType.RadioGroup + 'Item';
    input.type = 'radio';
    input.id = id;
    input.name = config.key;
    input.value = item.value;

    // Radio item wrapper
    const itemWrapper = document.createElement('div');
    itemWrapper.dataset.unitType = FormControlType.RadioGroup + 'ItemWrapper';
    itemWrapper.append(input);
    itemWrapper.append(buildLabel(item.label, id));

    wrapper.append(itemWrapper);
  }

  // Set up default value if there's any
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

/**
 * Build form DatePicker & configure it
 * @param config DatePicker config
 * @returns HTMLInputElement
 */
const buildDatePicker = (config: DatePicker): HTMLInputElement => {
  const input = document.createElement('input');
  input.dataset.unitType = FormControlType.DatePicker;
  input.id = config.key;
  input.name = config.key;
  input.type = 'date';
  input.valueAsDate = config.value;
  return input;
};

/**
 * Build form TimePicker & configure it
 * @param config TimePicker config
 * @returns HTMLInputElement
 */
const buildTimePicker = (config: TimePicker): HTMLInputElement => {
  const input = document.createElement('input');
  input.dataset.unitType = FormControlType.TimePicker;
  input.id = config.key;
  input.name = config.key;
  input.type = 'time';
  input.valueAsDate = config.value;
  return input;
};

/**
 * Build form control wrapper
 * @returns HTMLDivElement
 */
const buildWrapper = (controlFor: FormControlType): HTMLDivElement => {
  const div = document.createElement('div');
  div.dataset.unitType = 'Wrapper';
  div.dataset.for = controlFor;
  return div;
};

/**
 * Build form control label & configure it
 * @param text label's text contet
 * @param htmlFor form control id that allows bounding with label
 * @returns HTMLLabelElement
 */
const buildLabel = (text: string, htmlFor = ''): HTMLLabelElement => {
  const label = document.createElement('label');
  label.dataset.unitType = 'Label';
  label.textContent = text;
  label.htmlFor = htmlFor;
  return label;
};

/**
 * Build form FieldSet & configure it
 * @param config FieldSet config
 * @returns HTMLFieldSetElement
 */
const buildFieldSet = (config: FieldSet): HTMLFieldSetElement => {
  const fieldset = document.createElement('fieldset');
  fieldset.dataset.unitType = FormControlType.FieldSet;

  // Configure legend attribute
  if (config.legend) {
    const legend = document.createElement('legend');
    legend.dataset.unitType = FormControlType.FieldSet + 'Legend';
    legend.textContent = config.legend;
    fieldset.append(legend);
  }

  if (config.cols) {
    fieldset.dataset.cols = config.cols.toString();
  }

  // Recursively re-render children elements if there are any
  if (config.children.length) {
    render<HTMLFieldSetElement>(fieldset, config.children);
  }

  return fieldset;
};

/**
 * Build form element & render its children elements
 * @param controls collection of form elements
 * @returns HTMLFormElement
 */
const buildForm = (controls: FormControls): HTMLFormElement => {
  const form = document.createElement('form');
  form.dataset.unitType = 'Form';
  return render<HTMLFormElement>(form, controls);
};

/**
 * Dynamically render form elements inside specified target
 * @param target element where controls will be rendered
 * @param controls collection of form elements
 * @returns specified form element type that corresponds to target element
 */
function render<T extends HTMLElement>(target: T, controls: FormControls): T {
  for (const control of controls) {
    const wrapper = buildWrapper(control.type);

    if (control.label && control.type !== FormControlType.CheckBox) {
      const label = buildLabel(control.label, control.key);
      wrapper.append(label);
    }

    switch (control.type) {
      case FormControlType.FieldSet:
        target.append(buildFieldSet(control as FieldSet));
        break;
      case FormControlType.TextBox:
        {
          wrapper.append(buildTextBox(control as TextBox));
          target.append(wrapper);
        }
        break;
      case FormControlType.TextArea:
        {
          wrapper.append(buildTextArea(control as TextArea));
          target.append(wrapper);
        }
        break;
      case FormControlType.NumberBox:
        {
          wrapper.append(buildNumberBox(control as NumberBox));
          target.append(wrapper);
        }
        break;
      case FormControlType.SelectBox:
        {
          wrapper.append(buildSelectBox(control as SelectBox));
          target.append(wrapper);
        }
        break;
      case FormControlType.CheckBox:
        {
          wrapper.append(buildCheckBox(control as CheckBox));
          target.append(wrapper);
        }
        break;
      case FormControlType.RadioGroup:
        {
          wrapper.append(buildRadioGroup(control as RadioGroup));
          target.append(wrapper);
        }
        break;
      case FormControlType.DatePicker:
        {
          wrapper.append(buildDatePicker(control as DatePicker));
          target.append(wrapper);
        }
        break;
      case FormControlType.TimePicker:
        {
          wrapper.append(buildTimePicker(control as TimePicker));
          target.append(wrapper);
        }
        break;
      default:
        throw new Error('Form control is not yet supported');
    }
  }

  return target;
}

export default {
  buildTextBox,
  buildTextArea,
  buildNumberBox,
  buildSelectBox,
  buildCheckBox,
  buildRadioGroup,
  buildDatePicker,
  buildTimePicker,
  buildFieldSet,
  buildForm,
};
