import { ValidationOutput } from '../abstract-form';
import { FormPlugin } from '../plugins';

export type ValidationPluginConfig = {
  parentElement?: keyof HTMLElementTagNameMap;
  childElement?: keyof HTMLElementTagNameMap;
  messages?: {
    required?: string;
    requiredTrue?: string;
    email?: string;
    min?: string;
    max?: string;
    minLength?: string;
    maxLength?: string;
  };
};

export class ValidationsPlugin implements FormPlugin<ValidationOutput> {
  private _parentElement: keyof HTMLElementTagNameMap;
  private _childElement: keyof HTMLElementTagNameMap;
  private _messages: ValidationPluginConfig['messages'] | undefined;

  constructor(config?: ValidationPluginConfig) {
    this._parentElement = config?.parentElement || 'div';
    this._childElement = config?.childElement || 'p';
    this._messages = config?.messages;
  }

  run(input: ValidationOutput): void {
    const validations = input;

    if (!validations) return;

    for (const val of validations) {
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
        console.log(val.control, error);
        if (error.required) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.dataset.unitType = 'ValidationItem';
          errorMessage.textContent = this._messages?.required || 'Required field';
          errorsWrapper.append(errorMessage);
        }
        if (error.requiredTrue) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.dataset.unitType = 'ValidationItem';
          errorMessage.textContent = this._messages?.requiredTrue || 'Required field';
          errorsWrapper.append(errorMessage);
        }
        if (error.email) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.dataset.unitType = 'ValidationItem';
          errorMessage.textContent = this._messages?.email || 'Invalid email';
          errorsWrapper.append(errorMessage);
        }
        if (error.min) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.dataset.unitType = 'ValidationItem';
          errorMessage.textContent =
            this._messages?.min?.replace('{0}', error.min.min).replace('{1}', error.min.current) ||
            `Min: ${error.min.min}, Current: ${error.min.current}`;
          errorsWrapper.append(errorMessage);
        }
        if (error.max) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.dataset.unitType = 'ValidationItem';
          errorMessage.textContent =
            this._messages?.max?.replace('{0}', error.max.max).replace('{1}', error.max.current) ||
            `Max: ${error.max.max}, Current: ${error.max.current}`;
          errorsWrapper.append(errorMessage);
        }
        if (error.minLength) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.dataset.unitType = 'ValidationItem';
          errorMessage.textContent =
            this._messages?.minLength
              ?.replace('{0}', error.minLength.requiredLength)
              .replace('{1}', error.minLength.currentLength) ||
            `Min length: ${error.minLength.requiredLength}, Current length: ${error.minLength.currentLength}`;
          errorsWrapper.append(errorMessage);
        }
        if (error.maxLength) {
          const errorMessage = document.createElement(this._childElement) as HTMLParagraphElement;
          errorMessage.dataset.unitType = 'ValidationItem';
          errorMessage.textContent =
            this._messages?.maxLength
              ?.replace('{0}', error.maxLength.requiredLength)
              .replace('{1}', error.maxLength.currentLength) ||
            `Max length: ${error.maxLength.requiredLength}, Current length: ${error.maxLength.currentLength}`;
          errorsWrapper.append(errorMessage);
        }
        parent?.append(errorsWrapper);
      }
    }
  }
}
