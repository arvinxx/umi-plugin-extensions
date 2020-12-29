/**
 * @private
 */
declare module 'umi' {
  interface BaseIConfig {
    extensions: PluginExtensions.Config;
  }
}

declare namespace PluginExtensions {
  export type BaseManifest = Pick<
    chromeExtension.Manifest,
    'name' | 'version' | 'background' | 'permissions' | 'icons'
  >;

  export interface Config extends BaseManifest {
    contentSecurityPolicy: IContentSecurityPolicy;
    manifestVersion: chromeExtension.ManifestVersion;
    minimumChromeVersion: string;
    optionsUI: string | OptionsUI;
    popupUI: string | PopupUI;
  }

  /**
   * 使用的安全策略
   */
  export interface IContentSecurityPolicy {
    nonce: string[];
    inlineScript: string[];
    url: string[];
  }

  export interface PopupUI {
    page: string;
    title?: string;
    icon?: chromeExtension.IconType;
    /**
     * popUp UI 的范围是 browser 还是 page
     * @default browser
     * @see
     */
    type?: 'browserAction' | 'pageAction';
  }

  export interface OptionsUI {
    page: string;
    openInTab?: boolean;
  }
}
