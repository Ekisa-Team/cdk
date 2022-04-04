import { AbstractForm, ValidationOutput } from './abstract-form';
import renderUtils from './builder';
import { FieldSet, RadioGroup } from './controls';
import { AbstractControl } from './controls/abstract-control';
import { findPlugin, PluginsCollection } from './plugins';
import { ValidationsPlugin } from './plugins/validations.plugin';
import { FormControls } from './types/form-control.type';

export class Form extends AbstractForm {
  /*
   * List of dynamically configured form controls
   */
  dataSource!: FormControls;

  /**
   * Collection of form plugins that extend its functionality
   */
  plugins: PluginsCollection;

  private _controls: Array<AbstractControl> = [];

  //#region Accesors
  get controls(): Array<AbstractControl> {
    return this._controls;
  }
  //#endregion

  constructor(args: { dataSource: FormControls; plugins?: PluginsCollection }) {
    super();
    this.dataSource = args.dataSource;
    this.plugins = args.plugins || [];
  }

  /**
   * Get form control
   * @param key control key identifier
   */
  getControl(key: string): AbstractControl | undefined {
    return this._controls.find((control) => control.key === key);
  }

  /**
   * Render dynamic form inside parent element
   * @param parent HTML element where the form will be rendered
   */
  render(parent: HTMLBodyElement | HTMLDivElement): void {
    const form = renderUtils.buildForm(this.dataSource);
    parent.append(form);
    this._controls = this._flattenControls(this.dataSource) as Array<AbstractControl>;
  }

  /**
   * Reset form elements to defaults
   */
  reset(): void {
    this.controls.forEach((control) => {
      // Reset controls value based on type
      switch (control.type) {
        case 'CheckBox':
          control.setValue(false);
          break;
        case 'DatePicker':
        case 'TimePicker':
        case 'NumberBox':
          control.setValue(null);
          break;
        case 'RadioGroup':
          (control as RadioGroup).reset();
          break;
        default:
          control.setValue('');
      }

      // Remove control status
      const parent = control.getParentElement()!;
      delete parent.dataset.status;

      // Remove validations container
      control.getValidationsElement()?.remove();
    });
  }

  /**
   * Check the validity of all the configured control validators
   * @returns ValidationOutput or null if no errors are found
   */
  validate(): ValidationOutput {
    const errors: ValidationOutput = [];
    const controls = this.controls;

    // Traverse form controls & check for errors
    for (const control of controls) {
      if (control.validators.length === 0) continue;

      // Reset validations status
      const parent = control.getParentElement();
      delete parent?.dataset.status;
      control.getValidationsElement()?.remove();

      const { errors: controlErrors } = control;
      if (controlErrors) {
        errors.push({ control: control, errors: controlErrors });
      }
    }

    // Activate ValidationsPlugin if it's found
    const plugin = findPlugin(this.plugins, ValidationsPlugin);
    plugin?.run(errors);

    return errors.length === 0 ? null : errors;
  }

  /**
   * Check the validity of a single configured control validators
   * @returns ValidationOutput or null if no errors are found
   */
  validateControl(key: string): ValidationOutput {
    const errors: ValidationOutput = [];

    const control = this.controls.find((c) => c.key === key);
    if (!control) throw new Error(`${key} wasn't found`);

    const parent = control.getParentElement();
    delete parent?.dataset.status;
    control.getValidationsElement()?.remove();

    const { errors: controlErrors } = control;
    if (controlErrors) {
      errors.push({ control, errors: controlErrors });
    }

    // Activate ValidationsPlugin if it's found
    const plugin = findPlugin(this.plugins, ValidationsPlugin);
    plugin?.run(errors);

    return errors.length === 0 ? null : errors;
  }

  /**
   * Convert controls values to JSON format
   * @returns specified generic type
   */
  toJSON<T>(): T {
    const formData: Record<string, unknown> = {};

    this.controls.forEach((c) => {
      formData[c.key] = c.getValue();
    });

    return formData as Record<string, unknown> as T;
  }

  /**
   * Return all form controls & all nested fieldset controls
   * @param controls
   * @returns flatten nested controls inside fieldsets
   */
  private _flattenControls(
    controls: FormControls,
    includeParents = false,
  ): Array<AbstractControl | FieldSet> {
    let result: Array<AbstractControl | FieldSet> = [];

    for (const c of controls) {
      if (c.type === 'FieldSet') {
        const children = (c as unknown as FieldSet).children;

        if (includeParents) {
          result = [...result, c, ...this._flattenControls(children)];
        } else {
          result = [...result, ...this._flattenControls(children)];
        }
      } else {
        result.push(c);
      }
    }

    return result;
  }
}
