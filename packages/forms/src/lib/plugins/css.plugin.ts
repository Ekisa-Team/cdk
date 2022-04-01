import { FormControlType } from '../enums/form-control-type.enum';
import { FormPlugin } from '../plugins';

export type StylesPluginConfig = {
  form: {
    className: string;
  };
  fieldset?: {
    className?: string;
    legend?: {
      className: string;
    };
  };
  wrapper?: {
    className: string;
  };
  label?: {
    className: string;
  };
  textbox?: {
    className: string;
  };
  textarea?: {
    className: string;
  };
  numberbox?: {
    className: string;
  };
  selectbox?: {
    className: string;
  };
  checkbox?: {
    className: string;
  };
  radiogroup?: {
    className: string;
  };
  datepicker?: {
    className: string;
  };
  timepicker?: {
    className: string;
  };
};

export class CssPlugin implements FormPlugin<HTMLFormElement> {
  private _styles: StylesPluginConfig | undefined;

  constructor(config?: StylesPluginConfig) {
    this._styles = config;
  }

  run(input: HTMLFormElement): void {
    if (!this._styles) return;

    const {
      form,
      fieldset,
      wrapper,
      label,
      textbox,
      textarea,
      numberbox,
      selectbox,
      checkbox,
      radiogroup,
      datepicker,
      timepicker,
    } = this._styles;

    // form
    form && this._addClass(input, form.className);

    // fieldsets
    if (fieldset) {
      const fieldsets = input.querySelectorAll(`[data-unit-type=${FormControlType.FieldSet}]`);

      fieldsets?.forEach((f) => {
        fieldset.className && this._addClass(f, fieldset.className);

        if (fieldset.legend) {
          const legend = f.querySelector(`[data-unit-type=${FormControlType.FieldSet + 'Legend'}]`);
          legend && this._addClass(legend, fieldset.legend.className);
        }
      });
    }

    // wrappers
    wrapper &&
      input
        .querySelectorAll(`[data-unit-type=Wrapper]`)
        ?.forEach((c) => this._addClass(c, wrapper.className));

    // labels
    label &&
      input
        .querySelectorAll(`[data-unit-type=Label]`)
        ?.forEach((c) => this._addClass(c, label.className));

    // textbox
    textbox &&
      input
        .querySelectorAll(`[data-unit-type=${FormControlType.TextBox}]`)
        ?.forEach((c) => this._addClass(c, textbox.className));

    // textarea
    textarea &&
      input
        .querySelectorAll(`[data-unit-type=${FormControlType.TextArea}]`)
        ?.forEach((c) => this._addClass(c, textarea.className));

    // numberbox
    numberbox &&
      input
        .querySelectorAll(`[data-unit-type=${FormControlType.NumberBox}]`)
        ?.forEach((c) => this._addClass(c, numberbox.className));

    // selectbox
    selectbox &&
      input
        .querySelectorAll(`[data-unit-type=${FormControlType.SelectBox}]`)
        ?.forEach((c) => this._addClass(c, selectbox.className));

    // checkbox
    checkbox &&
      input
        .querySelectorAll(`[data-unit-type=${FormControlType.CheckBox}]`)
        ?.forEach((c) => this._addClass(c, checkbox.className));

    // radiogroup
    radiogroup &&
      input
        .querySelectorAll(`[data-unit-type=${FormControlType.RadioGroup}]`)
        ?.forEach((c) => this._addClass(c, radiogroup.className));

    // datepicker
    datepicker &&
      input
        .querySelectorAll(`[data-unit-type=${FormControlType.DatePicker}]`)
        ?.forEach((c) => this._addClass(c, datepicker.className));

    // timepicker
    timepicker &&
      input
        .querySelectorAll(`[data-unit-type=${FormControlType.TimePicker}]`)
        ?.forEach((c) => this._addClass(c, timepicker.className));
  }

  private _addClass(element: Element, className: string) {
    const classes = className.trim().split(' ');
    element.classList.add(...classes);
  }
}
