import { AbstractControl } from './controls/abstract-control';
import { ValidationErrors } from './validators';

export type ValidationOutput = Array<{
  control: AbstractControl;
  errors: ValidationErrors[];
}> | null;

export abstract class AbstractForm {
  abstract getControl(key: string): AbstractControl | undefined;

  abstract render(parent: HTMLBodyElement | HTMLDivElement): void;

  abstract reset(): void;

  abstract validate(): ValidationOutput;

  abstract validateControl(controlKey: string): ValidationOutput;

  abstract toJSON<T>(): T;
}
