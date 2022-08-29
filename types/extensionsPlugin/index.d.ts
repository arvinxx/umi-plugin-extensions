export declare namespace extensionsPlugin {
  /**
   * 从 Chrome Manifest 模块中提取的必要类型
   */
  export type BaseManifest = Pick<
    chromeManifest.Manifest,
    'name' | 'version' | 'background' | 'permissions' | 'icons'
  >;

  /**
   * Umi Extension 插件 的配置文档
   */
  export interface Config extends BaseManifest {
    /**
     * CSP 配置项
     */
    contentSecurityPolicy: ContentSecurityPolicy;
    /**
     * manifest 版本
     * @description
     * manifest 目前出了 3 个版本: 1 和 2 已经淘汰; 3 是目前使用的版本
     * @default 3
     */
    manifestVersion: chromeManifest.ManifestVersionV3;
    /**
     * 最低 Chrome 版本号
     */
    minimumChromeVersion: string;
    /**
     * options 选项页的控制项
     *
     * [教程 - Option 选项页](/tutorial/display/options)
     *
     */
    optionsUI: string | OptionsUI;

    popupUI: string | PopupUI;

    /**
     * 注入脚本
     */
    contentScripts: ContentScript[];

    /**
     * 在这里书写原有的 manifest
     */
    extends?: Partial<chromeManifest.Manifest>;
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

  export interface ContentScript {
    /**
     * 匹配的网址
     */
    matches: string[];
    /**
     * 注入的入口文件
     */
    entries: string[];
    /**
     * 执行时间
     */
    runAt?: 'document_idle' | 'document_start' | 'document_end';
  }
}
