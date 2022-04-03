import { FormPlugin } from '../plugins';

export type EventsPluginConfig = {
  targetKey: string;
  attachmentType: 'single' | 'multiple';
  on: keyof HTMLElementEventMap;
  runFn: (this: Element, ev: Event) => void;
};

export class EventsPlugin implements FormPlugin<EventsPluginConfig> {
  run({ targetKey, attachmentType, on, runFn }: EventsPluginConfig): void {
    switch (attachmentType) {
      case 'single':
        document.querySelector(`#${targetKey}`)?.addEventListener(on, runFn);
        break;
      case 'multiple':
        document
          .querySelectorAll(`[name="${targetKey}"]`)
          ?.forEach((item) => item.addEventListener(on, runFn));
        break;
      default:
        throw new Error('Attachment type has not been implemented yet');
    }
  }
}
