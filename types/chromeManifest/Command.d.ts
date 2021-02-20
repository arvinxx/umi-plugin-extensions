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
   * 允许用户定义快捷键
   *
   * 可以让用户设置优先级超高的快捷键。
   * @see https://developer.chrome.com/docs/extensions/reference/commands/
   */
  export interface Command {
    /**
     * 开发者预设的快捷键默认值
     *
     * 注意: 开发者设置快捷键的默认值不能覆盖浏览器默认的快捷键
     */
    suggested_key: {
      /**
       * 默认快捷键
       */
      default?: string;
      /**
       * macOS 下的快捷键
       */
      mac?: string;
      /**
       * windows 下的快捷键
       */
      windows?: string;
      chromeos?: string;
      linux?: string;
    };
    /**
     * 该快捷键的描述说明
     */
    description?: string;
    /**
     * 设为全局快捷键
     */
    global?: boolean;
  }
}
