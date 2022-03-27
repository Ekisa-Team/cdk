import { AbstractForm, ValidationOutput } from './abstract-form';
import renderUtils from './builder';
import { FieldSet } from './controls';
import { AbstractControl } from './controls/abstract-control';
import { FormControlType } from './enums/form-control-type.enum';
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

  //#region Accesors
  get controls(): Array<AbstractControl> {
    return this._flattenControls(this.dataSource);
  }
  //#endregion

  constructor(args: { dataSource: FormControls; plugins: PluginsCollection }) {
    super();

    this.dataSource = args.dataSource;
    this.plugins = args.plugins || [];
  }

  /**
   * Render dynamic form inside parent element
   * @param parent HTML element where the form will be rendered
   */
  override render(parent: HTMLBodyElement | HTMLDivElement): void {
    const form = renderUtils.buildForm(this.dataSource);
    parent.append(form);
  }

  /**
   * Reset form elements to defaults
   */
  override reset(): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Check validity of configured control validators
   * @returns ValidationOutput or null if no errors are found
   */
  override validate(): ValidationOutput {
    const errors: ValidationOutput = [];
    const controls = this.controls;

    // Traverse form controls & check for errors
    for (const c of controls) {
      if (c.validators.length === 0) continue;

      c.getParentElement()?.querySelector('.ef-errors-wrapper')?.remove();
      const { errors: controlErrors } = c;

      if (controlErrors) {
        errors.push({ control: c, errors: controlErrors });
      }
    }

    // Activate ValidationsPlugin if it's found
    const plugin = findPlugin(this.plugins, ValidationsPlugin);

    if (plugin) {
      plugin.run(errors);
    }

    return errors.length === 0 ? null : errors;
  }

  /**
   * Convert controls values to JSON format
   * @returns specified generic type
   */
  override toJSON<T>(): T {
    const controls = this._flattenControls(this.dataSource);
    const formData: Record<string, unknown> = {};

    controls.forEach((c) => {
      formData[c.key] = c.getValue();
    });

    return formData as Record<string, unknown> as T;
  }

  /**
   * Return all form controls & all nested fieldset controls
   * @param controls
   * @returns flatten nested controls inside fieldsets
   */
  private _flattenControls(controls: FormControls): Array<AbstractControl> {
    let result: Array<AbstractControl> = [];

    for (const c of controls) {
      if (c.type === FormControlType.FieldSet) {
        const children = (c as unknown as FieldSet).children;
        result = [...result, ...this._flattenControls(children)];
      } else {
        result.push(c);
      }
    }

    return result;
  }
}
