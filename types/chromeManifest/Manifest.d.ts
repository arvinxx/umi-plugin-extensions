declare namespace chromeManifest {
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
    manifest_version: ManifestVersion;
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
     * 使用 commands API 在插件添加触发操作的键盘快捷键
     *
     * 例如打开浏览器页面的或向扩展名发送其他命令等。
     * @see https://developer.chrome.com/docs/extensions/reference/commands/
     */
    commands?: Commands;
    content_capabilities?: string;
    /**
     * Content scripts are files that run in the context of web pages.
     * By using the standard Document Object Model (DOM),
     * they are able to read details of the web pages the browser visits,
     * make changes to them and pass information to their parent extension.
     * @see https://developer.chrome.com/docs/extensions/mv2/content_scripts/
     */
    content_scripts?: ContentScript[];
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
    import?: SharedModule[];
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
     * Embedded options allows users to adjust extension options
     * without navigating away from the extensions management page
     * inside an embedded box. To declare an embedded options, register the
     * HTML file under the options_ui field in the extension manifest,
     * with the open_in_tab key set to false.
     * @see https://developer.chrome.com/docs/extensions/mv2/options/#embedded_options
     */
    options_ui?: OptionsUI;
    /**
     * 权限声明
     *
     * 要使用大多数 `chrome.*` API，插件必须在清单的 `permissions` 字段中声明其意图。
     * 每个权限可以是已知字符串列表（例如`geolocation`）中的一个，也可以是允许访问一个或多个主机的匹配模式。
     *
     * 如果插件被恶意软件破坏，则权限有助于限制破坏。在安装之前，还会向用户显示一些权限，如权限警告中所述。
     *
     * 如果 API 要求在清单中声明许可，则其文档会告诉您如何进行声明。例如，存储页面显示了如何声明 `storage` 权限。
     * @see https://developer.chrome.com/docs/extensions/mv2/declare_permissions/#manifest
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
     * 托管存储区域
     *
     * 与本地和同步存储区域不同，托管存储区域要求将其结构声明为 JSON Schema，并由 Chrome 严格验证。
     * 此架构必须存储在由`storage`清单键的 `managed_schema` 属性指示的文件中，
     * 并声明扩展支持的企业策略。
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
     * Use the `chrome.ttsEngine` API to implement a text-to-speech(TTS) engine using an extension.
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

  export type ManifestVersion = 1 | 2 | 3;

  export interface IconStruct {
    16?: string;
    32?: string;
    48?: string;
    128: string;
  }

  /**
   * Icon 类型
   */
  export type IconType = IconStruct | string;

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

  export type Permissions = SpecialPermissions | KnownPermissions | string;

  export type KnownPermissions =
    /**
     * Requests that the extension be granted permissions according to the activeTab specification.
     */
    | 'activeTab'
    // Gives your extension access to the chrome.alarms API.
    | 'alarms'
    /**
     * Makes Chrome start up early and shut down late, so that apps and extensions can have a longer life.
     * When any installed hosted app, packaged app, or extension has "background" permission, Chrome runs (invisibly) as soon as the user logs into their computer—before the user launches Chrome. The "background" permission also makes Chrome continue running (even after its last window is closed) until the user explicitly quits Chrome.
     * Note: Disabled apps and extensions are treated as if they aren't installed
     * You typically use the "background" permission with a background page, event page or (for hosted apps) a background window.
     */
    | 'background'

    // Gives your extension access to the chrome.bookmarks API.
    | 'bookmarks'
    // Gives your extension access to the chrome.browsingData API.
    | 'browsingData'
    // Gives your extension access to the chrome.certificateProvider API.
    | 'certificateProvider'
    // Required if the extension or app uses document.execCommand('paste').
    | 'clipboardRead'
    // Indicates the extension or app uses document.execCommand('copy') or document.execCommand('cut'). This permission is required for hosted apps; it's recommended for extensions and packaged apps.
    | 'clipboardWrite'
    // Gives your extension access to the chrome.contentSettings API.
    | 'contentSettings'
    // Gives your extension access to the chrome.contextMenus API.
    | 'contextMenus'
    // Gives your extension access to the chrome.cookies API.
    | 'cookies'
    // Gives your extension access to the chrome.debugger API.
    | 'debugger'
    // Gives your extension access to the chrome.declarativeContent API.
    | 'declarativeContent'
    // Gives your extension access to the chrome.declarativeNetRequest API.
    | 'declarativeNetRequest'
    // Grants the extension access to events and methods within the chrome.declarativeNetRequest API which return information on declarative rules matched.
    | 'declarativeNetRequestFeedback'
    // Gives your extension access to the chrome.declarativeWebRequest API.
    | 'declarativeWebRequest'
    // Gives your extension access to the chrome.desktopCapture API.
    | 'desktopCapture'
    // Gives your extension access to the chrome.displaySource API.
    | 'displaySource'
    // Gives your extension access to the chrome.dns API.
    | 'dns'
    // Gives your extension access to the chrome.documentScan API.
    | 'documentScan'
    // Gives your extension access to the chrome.downloads API.
    | 'downloads'
    // Gives your extension access to the chrome.enterprise.deviceAttributes API.
    | 'enterprise.deviceAttributes'
    // Gives your extension access to the chrome.enterprise.hardwarePlatform API.
    | 'enterprise.hardwarePlatform'
    // Gives your extension access to the chrome.enterprise.networkingAttributes API.
    | 'enterprise.networkingAttributes'
    // Gives your extension access to the chrome.enterprise.platformKeys API.
    | 'enterprise.platformKeys'
    // Required if the extension or app uses any chrome.experimental.* APIs.
    | 'experimental'
    // Gives your extension access to the chrome.fileBrowserHandler API.
    | 'fileBrowserHandler'
    // Gives your extension access to the chrome.fileSystemProvider API.
    | 'fileSystemProvider'
    // Gives your extension access to the chrome.fontSettings API.
    | 'fontSettings'
    // Gives your extension access to the chrome.gcm API.
    | 'gcm'
    // Allows the extension or app to use the geolocation API without prompting the user for permission.
    | 'geolocation'
    // Gives your extension access to the chrome.history API.
    | 'history'
    // Gives your extension access to the chrome.identity API.
    | 'identity'
    // Gives your extension access to the chrome.idle API.
    | 'idle'
    // Gives your extension access to the chrome.idltest API.
    | 'idltest'
    // Gives your extension access to the chrome.login API.
    | 'login'
    // Gives your extension access to the chrome.loginScreenStorage API.
    | 'loginScreenStorage'
    // Gives your extension access to the chrome.loginState API.
    | 'loginState'
    // Gives your extension access to the chrome.management API.
    | 'management'
    // Gives your extension access to the native messaging API.
    | 'nativeMessaging'
    // Gives your extension access to the chrome.notifications API.
    | 'notifications'
    // Gives your extension access to the chrome.pageCapture API.
    | 'pageCapture'
    // Gives your extension access to the chrome.platformKeys API.
    | 'platformKeys'
    // Gives your extension access to the chrome.power API.
    | 'power'
    // Gives your extension access to the chrome.printerProvider API.
    | 'printerProvider'
    // Gives your extension access to the chrome.printing API.
    | 'printing'
    // Gives your extension access to the chrome.printingMetrics API.
    | 'printingMetrics'
    // Gives your extension access to the chrome.privacy API.
    | 'privacy'
    // Gives your extension access to the chrome.processes API.
    | 'processes'
    // Gives your extension access to the chrome.proxy API.
    | 'proxy'
    // Gives your extension access to the chrome.scripting API.
    | 'scripting'
    // Gives your extension access to the chrome.search API.
    | 'search'
    // Gives your extension access to the chrome.sessions API.
    | 'sessions'
    // Gives your extension access to the chrome.signedInDevices API.
    | 'signedInDevices'
    // Gives your extension access to the chrome.storage API.
    | 'storage'
    // Gives your extension access to the chrome.system.cpu API.
    | 'system.cpu'
    // Gives your extension access to the chrome.system.display API.
    | 'system.display'
    // Gives your extension access to the chrome.system.memory API.
    | 'system.memory'
    // Gives your extension access to the chrome.system.storage API.
    | 'system.storage'
    // Gives your extension access to the chrome.tabCapture API.
    | 'tabCapture'
    // Gives your extension access to the chrome.tabGroups API.
    | 'tabGroups'
    // Gives your extension access to privileged fields of the Tab objects used by several APIs including chrome.tabs and chrome.windows. In many circumstances your extension will not need to declare the "tabs" permission to make use of these APIs.
    | 'tabs'
    // Gives your extension access to the chrome.topSites API.
    | 'topSites'
    // Gives your extension access to the chrome.tts API.
    | 'tts'
    // Gives your extension access to the chrome.ttsEngine API.
    | 'ttsEngine'
    // Provides an unlimited quota for storing client-side data, such as databases and local storage files. Without this permission, the extension or app is limited to 5 MB of local storage.
    //   Note: This permission applies only to Web SQL Database and application cache (see issue 58985). Also, it doesn't currently work with wildcard subdomains such as http://*.example.com.
    | 'unlimitedStorage'
    // Gives your extension access to the chrome.vpnProvider API.
    | 'vpnProvider'
    // Gives your extension access to the chrome.wallpaper API.
    | 'wallpaper'
    // Gives your extension access to the chrome.webNavigation API.
    | 'webNavigation'
    // Gives your extension access to the chrome.webRequest API.
    | 'webRequest'
    // Required if the extension uses the chrome.webRequest API in a blocking fashion.
    | 'webRequestBlocking';

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
