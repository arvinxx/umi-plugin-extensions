// declare module 'umi' {
//   interface BaseIConfig {
//     extension: ExtensionManifest;
//   }
// }

export interface ExtensionManifest {
  /**
   * 插件名称
   */
  name: string;
  /**
   * 插件版本
   */
  version: string;
  /**
   * 插件描述
   */
  description: string;
  /**
   * manifest 版本
   * @default 默认为 2
   */
  manifest_version: number;
  /**
   * 最小 Chrome 版本
   * @default 80
   */
  minimum_chrome_version: string;
  permissions: any[];
  contentSecurityPolicy: IContentSecurityPolicy;
  /**
   * 在后台运行的脚本
   */
  background: IBackground;
  content_scripts: any[];
  browser_action: IBrowserAction;
  /**
   * icon
   */
  icons: { [key: number]: string };
  options_ui: IOptionsUI;
}

export interface IOptionsUI {
  page: string;
  open_in_tab: boolean;
}
export interface IContentSecurityPolicy {
  nonce: string[];
  inlineScript: string[];
  url: string[];
}
export interface IBackground {
  scripts: string[];
  persistent: boolean;
}

export interface IBrowserAction {
  default_popup: string;
  default_icon: Record<string, string>;
}
