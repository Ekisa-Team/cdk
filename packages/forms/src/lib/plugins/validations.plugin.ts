import { ValidationOutput } from '../abstract-form';
import { FormPlugin } from '../plugins';

export type ValidationPluginConfig = {
  parentElement?: keyof HTMLElementTagNameMap;
  childElement?: keyof HTMLElementTagNameMap;
  showSummary?: boolean;
};

export class ValidationsPlugin implements FormPlugin<ValidationOutput> {
  private _parentElement: keyof HTMLElementTagNameMap;
  private _childElement: keyof HTMLElementTagNameMap;
  private _showSummary: boolean;

  constructor(config?: ValidationPluginConfig) {
    this._parentElement = config?.parentElement || 'div';
    this._childElement = config?.childElement || 'p';
    this._showSummary = config?.showSummary || false;
  }

  run(input: ValidationOutput): void {
    const validations = input;

    if (!validations) return;

    for (const val of validations) {
      console.log(val.control.key, val.control.getElement());

      const parent = val.control
        .getElement()
        ?.closest('[data-unit-type="Wrapper"]') as HTMLDivElement;

      if (!parent) return;

      parent?.querySelector('[data-unit-type="ValidationsWrapper"]')?.remove();
      const errorsWrapper = document.createElement(this._parentElement);
      errorsWrapper.dataset.unitType = 'ValidationsWrapper';

      if (val.errors.length === 0) {
        parent.dataset.status = 'valid';
      } else {
        parent.dataset.status = 'invalid';
      }

      for (const error of val.errors) {
        if (error.required) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.dataset.unitType = 'ValidationItem';
          errorMessage.textContent = 'Required field';
          errorsWrapper.append(errorMessage);
        }
        if (error.email) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.dataset.unitType = 'ValidationItem';
          errorMessage.textContent = `Invalid email`;
          errorsWrapper.append(errorMessage);
        }
        if (error.min) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.dataset.unitType = 'ValidationItem';
          errorMessage.textContent = `Min: ${error.min.min}, Current: ${error.min.current}`;
          errorsWrapper.append(errorMessage);
        }
        if (error.max) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.dataset.unitType = 'ValidationItem';
          errorMessage.textContent = `Max: ${error.max.max}, Current: ${error.max.current}`;
          errorsWrapper.append(errorMessage);
        }
        if (error.minLength) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.dataset.unitType = 'ValidationItem';
          errorMessage.textContent = `Min length: ${error.minLength.requiredLength}, Current length: ${error.minLength.currentLength}`;
          errorsWrapper.append(errorMessage);
        }
        if (error.maxLength) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.dataset.unitType = 'ValidationItem';
          errorMessage.textContent = `Max length: ${error.maxLength.requiredLength}, Current length: ${error.maxLength.currentLength}`;
          errorsWrapper.append(errorMessage);
        }
        parent?.append(errorsWrapper);
      }
    }
  }
}
