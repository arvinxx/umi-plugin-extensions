declare namespace chromeManifest {
  export interface BaseCommands {
    _execute_page_action?: Command;
    _execute_browser_action?: Command;
  }

  export interface CustomCommands {
    [key: string]: Command;
  }

  export type Commands = BaseCommands & CustomCommands;
  /**
   * allows you to define specific commands,
   * and bind them to a default key combination.
   * @see https://developer.chrome.com/docs/extensions/reference/commands/
   */
  export interface Command {
    suggested_key: {
      default?: string;
      mac?: string;
      windows?: string;
      chromeos?: string;
      linux?: string;
    };
    description?: string;
    /**
     * 设为全局快捷键
     */
    global?: boolean;
  }
}
