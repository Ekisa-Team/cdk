import { ValidationsPlugin } from './plugins/validations.plugin';

/**
 * @description
 * Defines a built-in plugins behavior
 *
 * A plugin is an encapsulated functionality that allows to extend form's functionallity
 */
export interface FormPlugin<T, R> {
  /**
   * @description
   * Run process when the form needs it
   * @param input incoming data that provides the neccessary information to proccess inside the plugin
   * @param config external plugin's configuration
   */
  run(input: T, config: R): void;
}

/**
 * Single built-in plugin
 */
export type PluginItem = ValidationsPlugin;

/**
 * Collection of built-in plugins that allow to extend form's functionallity
 */
export type PluginsCollection = Array<PluginItem>;

type Constructor<T> = new () => T;

/**
 * Find plugin if it's configured & attached to dynamic form
 * @param plugins collection of configured form plugins
 * @returns class instance of plugin item
 */
export function findPlugin(plugins: PluginsCollection, filterType: Constructor<PluginItem>) {
  return plugins.find((p) => p instanceof filterType);
}
