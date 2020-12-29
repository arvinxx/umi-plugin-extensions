declare namespace extensionsPlugin {
  export type BaseManifest = Pick<
    chromeManifest.Manifest,
    'name' | 'version' | 'background' | 'permissions' | 'icons'
  >;

  export interface Config extends BaseManifest {
    contentSecurityPolicy: ContentSecurityPolicy;
    manifestVersion: chromeManifest.ManifestVersion;
    minimumChromeVersion: string;
    optionsUI: string | OptionsUI;
    popupUI: string | PopupUI;
  }

  /**
   * 使用的安全策略
   */
  export interface ContentSecurityPolicy {
    nonce: string[];
    inlineScript: string[];
    url: string[];
  }

  export interface PopupUI {
    page: string;
    title?: string;
    icon?: chromeManifest.IconType;
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
