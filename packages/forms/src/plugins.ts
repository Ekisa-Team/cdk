import { AutoMapperPlugin } from './plugins/auto-mapper.plugin';
import { EventsPlugin } from './plugins/events.plugin';
import { ValidationsPlugin } from './plugins/validations.plugin';

/**
 * @description
 * Defines a built-in plugins behavior
 *
 * A plugin is an encapsulated functionality that allows to extend form's functionallity
 */
export interface FormPlugin<T = void, U = void> {
  /**
   * @description
   * Run process when the form needs it
   * @param input incoming data that provides the neccessary information to proccess inside the plugin
   */
  run(input: T): void | U;
}

/**
 * Single built-in plugin
 */
export type BuiltInPlugin = ValidationsPlugin | EventsPlugin | AutoMapperPlugin<void>;

/**
 * Collection of built-in plugins that allow to extend form's functionallity
 */
export type PluginsCollection = Array<BuiltInPlugin>;

type Constructor<T> = new () => T;

/**
 * Find plugin if it's configured & attached to dynamic form
 * @param plugins collection of configured form plugins
 * @returns class instance of plugin item
 */
export function findPlugin<T extends BuiltInPlugin>(
  plugins: PluginsCollection,
  filterType: Constructor<T>,
) {
  return plugins.find((p) => p instanceof filterType) as T;
}
