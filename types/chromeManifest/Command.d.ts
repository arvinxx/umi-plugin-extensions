/**
 * 插件默认存在的快捷键
 */
declare namespace chromeManifest {
  export interface BaseCommands {
    /**
     * 执行 page action
     */
    _execute_page_action?: Command;
    /**
     * 执行 browser action
     */
    _execute_browser_action?: Command;
  }

  /**
   * 开发者设定的快捷键实体结构
   */
  export interface CustomCommands {
    /**
     * 任意名称即可
     *
     * @案例
     * ```json
     * {
     *   "toggle-feature-foo": {
     *     "suggested_key": {
     *       "default": "Ctrl+Shift+5"
     *      },
     *   "description": "Toggle feature foo",
     *   "global": true
     *   }
     *}
     ```

     */
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
     * @注意事项
     * - 开发者设置快捷键的默认值不能覆盖浏览器默认的快捷键
     * - 所有组合键都必须包含 `Ctrl` 或 `Alt`。不允许使用包含 `Ctrl` + `Alt` 的组合，以避免与 AltGr 键冲突。除 `Alt` 或 `Ctrl` 外，还可以使用 `Shift` 键(但不是必需的)。修饰键（例如 `Ctrl` ）不能与媒体键一起使用。
     * - 由于可访问性原因，Tab 键已从 Chrome 33及更高版本的快捷键列表中删除。
     * - 请注意，在 Mac 上，`Ctrl` 会自动转换为 `Command`。如果你想用 `Ctrl` 代替，请在`mac` 属性下 下指定 `MacCtrl`。在 `default` 下指定 `MacCtrl` 将导致扩展无法安装。

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
      /**
       * chromeos 下的快捷键
       */
      chromeos?: string;
      /**
       * linux 下的快捷键
       */
      linux?: string;
    };
    /**
     * 快捷键的描述说明
     */
    description?: string;
    /**
     * 快捷键是否全局可用
     *
     * @说明
     * 默认情况下，Command 的作用域是 Chrome 浏览器，这意味着当浏览器失焦时，该快捷键将不会被激活。在 Chrome 桌面端上，Command 从Chrome v35版开始 具有全局作用域，在 Chrome 失焦时也可以使用。
     * @注意
     * Chrome OS 例外，目前不允许使用全局命令。
     *
     * @see https://developer.chrome.com/docs/extensions/reference/commands/#scope
     */
    global?: boolean;
  }
}
