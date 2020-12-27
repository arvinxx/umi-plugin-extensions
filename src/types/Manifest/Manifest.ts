declare namespace chromeExtension {
  export interface Manifest {
    /**
     * The name (maximum of 45 characters) is the primary
     * identifier of the extension and is a required field.
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/name/#name
     */
    name: string;
    version: string;
    /**
     * One integer specifying the version of
     * the manifest file format your package requires.
     * As of Chrome 18, developers should specify 2 (without quotes)
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/manifest_version/
     */
    manifest_version: 1 | 2 | 3;
    /**
     * Specifies the subdirectory of `_locales` that
     * contains the default strings for this extension.
     * This field is required in extensions that have a `_locales` directory;
     * it **must be absent** in extensions that have no `_locales` directory.
     * For details, see [Internationalization](https://developer.chrome.com/docs/extensions/reference/i18n/).
     *
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/default_locale/
     */
    default_locale?: string;
    /**
     * A plain text string (no HTML or other formatting; no more than 132 characters)
     * that describes the extension.The description should be suitable for
     * both the browser's extension management UI and the Chrome Web Store.
     * You can specify locale-specific strings for this field;
     * see [Internationalization](https://developer.chrome.com/docs/extensions/reference/i18n/) for details.
     *
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/description/
     */
    description?: string;
    /**
     *  One or more icons that represent the extension, app, or theme.
     *  You should always provide a 128x128 icon;
     *  it's used during installation and by the Chrome Web Store.
     *  Extensions should also provide a 48x48 icon,
     *  which is used in the extensions management page (chrome://extensions).
     *  You can also specify a 16x16 icon to be used as the favicon for an extension's pages.
     *
     *  Icons should generally be in PNG format,
     *  because PNG has the best support for transparency.
     *  They can, however, be in any format supported by WebKit,
     *  including BMP, GIF, ICO, and JPEG.
     *
     *  @see https://developer.chrome.com/docs/extensions/mv2/manifest/icons/
     */
    icons?: IconType;
    /**
     * Use browser actions to put icons in the main Google Chrome toolbar,
     * to the right of the address bar.
     * In addition to its icon,
     * a browser action can have a tooltip, a badge, and a popup.
     *
     * @see https://developer.chrome.com/docs/extensions/reference/browserAction/
     */
    browser_action?: BrowserAction;
    /**
     * Page actions represent actions that can be taken on the current page,
     * but that aren't applicable to all pages.
     * Page actions appear grayed out when inactive.
     *
     * @see https://developer.chrome.com/docs/extensions/reference/pageAction/
     */
    page_action?: BrowserAction;
    action?: string;
    /**
     * 作者
     */
    author?: string;
    automation?: string;
    /**
     * 运行在后台的脚本
     * @see https://developer.chrome.com/docs/extensions/mv2/background_pages/
     */
    background?: Background;
    /**
     * Settings overrides are a way for extensions
     * to override selected Chrome settings.
     * The API is available on Windows in all current versions
     * of Chrome and is available on Mac in Chrome 56 and later.
     * @see https://developer.chrome.com/docs/extensions/mv2/settings_override/
     */
    chrome_settings_overrides?: ChromeSettingsOverrides;
    /**
     * Override pages are a way to substitute an HTML file from your
     * extension for a page that Google Chrome normally provides.
     * In addition to HTML, an override page usually has CSS and JavaScript code.
     * @see https://developer.chrome.com/docs/extensions/mv2/override/
     */
    chrome_url_overrides?: ChromeUrlOverrides;
    /**
     * Use the commands API to add keyboard shortcuts that trigger actions
     * in your extension, for example, an action to open the browser action
     * or send a command to the extension.
     *
     * @see https://developer.chrome.com/docs/extensions/reference/commands/
     */
    commands: Commands;
    content_capabilities: string;
    /**
     * Content scripts are files that run in the context of web pages.
     * By using the standard Document Object Model (DOM),
     * they are able to read details of the web pages the browser visits,
     * make changes to them and pass information to their parent extension.
     * @see https://developer.chrome.com/docs/extensions/mv2/content_scripts/
     */
    content_scripts: [{}];
    /**
     * Content Security Policy
     *
     * @see https://developer.chrome.com/docs/apps/contentSecurityPolicy/
     */
    content_security_policy?: string;
    converted_from_user_script?: string;
    current_locale?: string;
    declarative_net_request?: string;
    /**
     * An instance of the extension's DevTools page is created
     * each time a DevTools window opens.
     *
     * The DevTools page exists for the lifetime of the DevTools window.
     * The DevTools page has access to the DevTools APIs and a limited set of extension APIs.
     * @see https://developer.chrome.com/docs/extensions/mv2/devtools/#devtools-page
     */
    devtools_page?: string;
    differential_fingerprint?: string;
    /**
     * provides a mechanism to add rules that intercept, block,
     * or modify web requests in-flight using declarativeWebRequest
     * or take actions depending on the content of a page,
     * without requiring permission to read the page's content
     * using declarativeContent.
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/event_rules/
     */
    event_rules?: EventRule[];
    /**
     *  declares which extensions, apps,
     *  and web pages can connect to your extension via
     *  runtime.connect and runtime.sendMessage.
     *  @see https://developer.chrome.com/docs/extensions/mv2/manifest/externally_connectable/
     */
    externally_connectable?: ExternallyConnectable;
    /**
     * Use the chrome.fileBrowserHandler API to extend the Chrome OS file browser.
     * For example, you can use this API to enable users to upload files to your website.
     * @see https://developer.chrome.com/docs/extensions/reference/fileBrowserHandler/
     */
    file_browser_handlers?: FileBrowserHandler[];
    /**
     *
     * Important: This API works only on Chrome OS
     * @see https://developer.chrome.com/docs/extensions/reference/fileSystemProvider/
     */
    file_system_provider_capabilities?: FileSystemProvider;
    homepage_url?: string;
    host_permissions?: string;
    /**
     * Shared Modules are permissionless collections of resources that can be
     * shared between other extensions and apps.
     *  @see https://developer.chrome.com/docs/extensions/mv2/shared_modules/
     */
    import: SharedModule[];
    /**
     * specify how this extension will behave if allowed to run in incognito mode.
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/incognito/
     */
    incognito?: 'spanning' | 'split' | 'not_allowed';
    input_components?: string;
    /**
     * This value can be used to control the unique ID of an extension, app,
     * or theme when it is loaded during development.
     *
     * Note: You don't usually need to use this value.
     * Instead, write your code so that the key value doesn't matter
     * by using relative paths and extension.getURL.
     *
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/key/
     */
    key?: string;
    /**
     * 最小 Chrome 版本
     * @default 80
     */
    minimum_chrome_version?: string;
    /**
     * One or more mappings from MIME types to the Native Client module that handles each type.
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/nacl_modules/
     */
    nacl_modules?: NativeClientModule[];
    natively_connectable?: string;
    oauth2?: string;
    /**
     * Whether the app or extension is expected to work offline.
     * When Chrome detects that it is offline,
     * apps with this field set to true will be highlighted on the New Tab page.
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/offline_enabled/
     */
    offline_enabled?: boolean;
    /**
     * The omnibox API allows you to register a keyword with Google Chrome's
     * address bar, which is also known as the omnibox.
     *
     * @see https://developer.chrome.com/docs/extensions/reference/omnibox/
     */
    omnibox?: {
      keyword: string;
    };
    /**
     * Declare optional permissions
     *
     * @see https://developer.chrome.com/docs/extensions/reference/permissions/
     */
    optional_permissions?: Permissions[];
    /**
     * An extension's options page will be displayed in a new tab.
     * The options HTML file is listed registered under the options_page field.
     *
     * @see https://developer.chrome.com/docs/extensions/mv2/options/#full_page
     */
    options_page?: string;
    /**
     * Embedded options allows users to adjust extension options
     * without navigating away from the extensions management page
     * inside an embedded box. To declare an embedded options, register the
     * HTML file under the options_ui field in the extension manifest,
     * with the open_in_tab key set to false.
     * @see https://developer.chrome.com/docs/extensions/mv2/options/#embedded_options
     */
    options_ui?: OptionsUI;
    /**
     * Declare permissions
     *
     * Use the chrome.permissions API to request declared optional permissions
     * at run time rather than install time, so users understand why
     * the permissions are needed and grant only those that are necessary.
     *
     * @see https://developer.chrome.com/docs/extensions/reference/permissions/
     */
    permissions?: Permissions[];
    platforms?: string;
    replacement_web_app?: string;
    /**
     * Technologies required by the app or extension.
     *
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/requirements/
     */
    requirements?: Requirements;
    /**
     * Defines an collection of app or extension pages that are to be served in
     * a sandboxed unique origin, and optionally a Content Security Policy to use with them.
     */
    sandbox?: Sandbox;
    /**
     * The short_name (maximum of 12 characters recommended) is a short
     * version of the extension's name. It is an optional field and if not
     * specified, the name will be used, though it will likely be truncated.
     * The short name is typically used where there is insufficient space to
     * display the full name.
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/name/
     */
    short_name?: string;
    signature?: string;
    spellcheck?: string;
    /**
     * Unlike the local and sync storage areas, the managed storage area
     * requires its structure to be declared as JSON Schema and is strictly
     * validated by Chrome. This schema must be stored in a file indicated
     * by the "managed_schema" property of the "storage" manifest key and
     * declares the enterprise policies supported by the extension.
     *
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/storage/
     */
    storage?: {
      /**
       *  a file within the extension that contains the policy schema.
       */
      managed_schema: string;
    };
    system_indicator?: string;
    /**
     * Use the chrome.ttsEngine API to implement a text-to-speech(TTS) engine using an extension.
     * @see https://developer.chrome.com/docs/extensions/reference/ttsEngine/
     */
    tts_engine?: TTSEngine;
    /**
     * 更新地址
     * @see https://developer.chrome.com/docs/extensions/mv2/hosting/
     */
    update_url?: string;
    /**
     * In addition to the version field,which is used for update purposes,
     * `version_name` can be set to a descriptive version string and
     * will be used for display purposes if present.
     * e.g. "version_name": "3.1.2.4567"
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/version/
     */
    version_name?: string;
    /**
     * An array of strings specifying the paths of packaged resources
     * that are expected to be usable in the context of a web page
     * @see https://developer.chrome.com/docs/extensions/mv2/manifest/web_accessible_resources/
     */
    web_accessible_resources?: string[];
  }

  export interface IconStruct {
    16: string;
    32: string;
    48: string;
    128: string;
  }

  /**
   * Icon 类型
   */
  export type IconType = Partial<IconStruct> | string;

  export interface BrowserAction {
    /**
     * text showed in tooltip
     */
    default_title?: string;
    /**
     * The browser action icons in Chrome
     * @see https://developer.chrome.com/docs/extensions/reference/browserAction/#icon
     */
    default_icon?: IconType;
    /**
     * popup of the extension browser action
     * the HTML file with the popup's contents
     *
     * @see https://developer.chrome.com/docs/extensions/reference/browserAction/#popup
     */
    default_popup?: string;
  }

  export interface Background {
    scripts: string[];
    persistent: boolean;
  }

  export interface ChromeUrlOverrides {
    pageToOverride: string;
  }

  export interface OptionsUI {
    page: string;
    open_in_tab: boolean;
  }

  export type Permissions = SpecialPermissions | string;

  export type SpecialPermissions =
    /**
     * The chrome.debugger API serves as an alternate transport
     * for Chrome's remote debugging protocol .
     */
    | 'debugger'
    /**
     * Grants the extension access to the chrome.declarativeNetRequest API.
     */
    | 'declarativeNetRequest'
    /**
     * Allows extension to expand Chrome DevTools functionality.
     */
    | 'devtools'
    /**
     * Canary and Dev channel only. Grants the extension access to chrome.experimental APIs.
     */
    | 'experimental'
    /**
     * Allows the extension to use the HTML5 geolocation API.
     */
    | 'geolocation'
    /**
     * Grants the extension access to the chrome.mdns API.
     */
    | 'mdns'
    /**
     * Grants the extension access to the chrome.proxy API to manage Chrome's proxy settings.
     */
    | 'proxy'
    /**
     * The chrome.tts API plays synthesized text-to-speech (TTS).
     */
    | 'tts'
    /**
     * The chrome.ttsEngine API implements a text-to-speech(TTS) engine using an extension.
     */
    | 'ttsEngine'
    /**
     * ChromeOS only. Use the chrome.wallpaper API change the ChromeOS wallpaper.
     */
    | 'wallpaper';
}
