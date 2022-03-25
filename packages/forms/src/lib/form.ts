import { AbstractForm } from './abstract-form';
import { FieldSet } from './controls';
import { FormControlType } from './enums/form-control-type.enum';
import renderUtils from './renderer';
import { FormControls } from './types/form-control.type';
import { FormPersistenceEvent, FormPersistenceType } from './types/form-persistence.type';

export class Form extends AbstractForm {
  /** List of dynamically configured form controls */
  dataSource!: FormControls;

  formColumns!: number;

  /** Control status  */
  _isReadonly!: boolean;

  get isReadonly() {
    return this._isReadonly;
  }

  set isReadonly(status: boolean) {
    this._isReadonly = status;
  }

  /** Control status  */
  _isDisabled!: boolean;

  get isDisabled() {
    return this._isDisabled;
  }

  set isDisabled(status: boolean) {
    this._isDisabled = status;
  }

  _form!: HTMLFormElement;

  constructor(args: {
    dataSource: FormControls;
    columns?: number;
    readonly?: boolean;
    disabled?: boolean;
  }) {
    super();

    this.dataSource = args.dataSource;
    this.formColumns = args.columns ?? 1;
    this.isReadonly = args.readonly ?? false;
    this.isDisabled = args.disabled ?? false;
  }

  override render(parent: HTMLBodyElement | HTMLDivElement): void {
    const form = renderUtils.renderForm(this.dataSource);
    parent.append(form);
    this._form = form;
  }

  override reset(): void {
    throw new Error('Method not implemented.');
  }

  override validate(): boolean {
    throw new Error('Method not implemented.');
  }

  override persist(args: { in: FormPersistenceType; when: FormPersistenceEvent }): boolean {
    throw new Error('Method not implemented.');
  }

  override toJSON<T>(): T {
    const keyValuePairs: Array<[string, unknown]> = this.getKeyValuePairs(this.dataSource);
    const formData: Record<string, unknown> = {};

    keyValuePairs.forEach(([key, value]) => {
      formData[key] = value;
    });

    return formData as Record<string, unknown> as T;
  }

  private getKeyValuePairs(controls: FormControls): Array<[string, unknown]> {
    let result: Array<[string, unknown]> = [];

    for (const c of controls) {
      if (c.type === FormControlType.FieldSet) {
        const children = (c as unknown as FieldSet).children;
        result = [...result, ...this.getKeyValuePairs(children)];
      } else {
        result.push([c.key, c.getValue()]);
      }
    }

    return result;
  }
}
