import { FormPersistenceEvent, FormPersistenceType } from './types/form-persistence.type';

export abstract class AbstractForm {
  /**
   * Render dynamic form inside parent element
   * @param parent HTML element where the form will be rendered
   */
  abstract render(parent: HTMLBodyElement | HTMLDivElement): void;

  /**
   * Reset form control values
   */
  abstract reset(): void;

  /**
   * Check validity of configured control validators
   */
  abstract validate(): boolean;

  /**
   * Persist controls data when user submit form or change values
   */
  abstract persist(args: { in: FormPersistenceType; when: FormPersistenceEvent }): boolean;

  /**
   * Convert controls values to JSON format
   */
  abstract toJson(): boolean;
}
