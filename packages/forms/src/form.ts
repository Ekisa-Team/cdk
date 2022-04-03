import { AbstractForm, ValidationOutput } from './abstract-form';
import renderUtils from './builder';
import { FieldSet } from './controls';
import { AbstractControl } from './controls/abstract-control';
import { FormControlType } from './enums/form-control-type.enum';
import { findPlugin, PluginsCollection } from './plugins';
import { CssPlugin } from './plugins/css.plugin';
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

  //#region Accesors
  get controls(): Array<AbstractControl> {
    return this._flattenControls(this.dataSource) as Array<AbstractControl>;
  }
  //#endregion

  constructor(args: { dataSource: FormControls; plugins?: PluginsCollection }) {
    super();

    this.dataSource = args.dataSource;
    this.plugins = args.plugins || [];
  }

  /**
   * Render dynamic form inside parent element
   * @param parent HTML element where the form will be rendered
   */
  render(parent: HTMLBodyElement | HTMLDivElement): void {
    const form = renderUtils.buildForm(this.dataSource);
    parent.append(form);

    // Activate StylesPlugin if it's found
    const plugin = findPlugin(this.plugins, CssPlugin);
    plugin?.run(form);
  }

  /**
   * Reset form elements to defaults
   */
  reset(): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Check validity of all control's configured validators
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
   * Check validity of a single control's configured validators
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
  override toJSON<T>(): T {
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
      if (c.type === FormControlType.FieldSet) {
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
