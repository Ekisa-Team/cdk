import { ValidationOutput } from '../abstract-form';
import { FormPlugin } from '../plugins';

export type ValidationPluginConfig = {
  parentElement?: keyof HTMLElementTagNameMap;
  childElement?: keyof HTMLElementTagNameMap;
  showSummary?: boolean;
};

export class ValidationsPlugin implements FormPlugin<ValidationOutput, ValidationPluginConfig> {
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
      const parent = val.control.getParentElement();
      parent?.querySelector('.ef-errors-wrapper')?.remove();
      const errorsWrapper = document.createElement(this._parentElement);
      errorsWrapper.className = 'ef-errors-wrapper';

      for (const error of val.errors) {
        if (error.required) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.textContent = 'Required field';
          errorsWrapper.append(errorMessage);
        }
        if (error.email) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.textContent = `Invalid email`;
          errorsWrapper.append(errorMessage);
        }
        if (error.minLength) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.textContent = `Min length: ${error.minLength.requiredLength}, Current length: ${error.minLength.currentLength}`;
          errorsWrapper.append(errorMessage);
        }
        if (error.maxLength) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.textContent = `Max length: ${error.maxLength.requiredLength}, Current length: ${error.maxLength.currentLength}`;
          errorsWrapper.append(errorMessage);
        }
        parent?.append(errorsWrapper);
      }
    }
  }
}
