import type { IApi } from 'umi';
import { baseDevURL, isDev } from '../utils';

/**
 * 定义插件结构
 * @param api
 */
export default (api: IApi) => {
  const pkg = api.pkg;

  //  manifest 结构
  api.describe({
    key: 'extensions',
    config: {
      default: {
        name: pkg.name || 'umi extension template',
        version: pkg.version || '1.0.0',
        description: pkg.description || '基于 Umi 的 Chrome 插件开发脚手架',
        manifestVersion: 3,
        minimumChromeVersion: '88',
        permissions: [],
        host_permissions: [],
        background: {},
        contentScripts: [],
        icons: {},
        contentSecurityPolicy: {
          nonce: [],
          inlineScript: [],
          url: isDev ? [baseDevURL] : [],
        },
      },
      /**
       * 校验器
       * @param joi
       */
      schema(joi) {
        const iconSchema = joi.alternatives(
          joi.string(),
          joi.object().keys({
            16: joi.string(),
            32: joi.string(),
            48: joi.string(),
            128: joi.string().required(),
          }),
        );
        const stringArr = joi.array().items(joi.string());

        const contentScript = joi.object({
          matches: stringArr.required(),
          entries: stringArr.required(),
          runAt: joi
            .string()
            .valid('document_idle', 'document_start', 'document_end'),
        });

        const knownPermissions = joi
          .string()
          .valid(
            'activeTab',
            'alarms',
            'background',
            'bookmarks',
            'browsingData',
            'certificateProvider',
            'clipboardRead',
            'clipboardWrite',
            'contentSettings',
            'contextMenus',
            'cookies',
            'debugger',
            'declarativeContent',
            'declarativeNetRequest',
            'declarativeNetRequestFeedback',
            'declarativeWebRequest',
            'desktopCapture',
            'displaySource',
            'dns',
            'documentScan',
            'downloads',
            'enterprise.deviceAttributes',
            'enterprise.hardwarePlatform',
            'enterprise.networkingAttributes',
            'enterprise.platformKeys',
            'experimental',
            'fileBrowserHandler',
            'fileSystemProvider',
            'fontSettings',
            'gcm',
            'geolocation',
            'history',
            'identity',
            'idle',
            'idltest',
            'login',
            'loginScreenStorage',
            'loginState',
            'management',
            'nativeMessaging',
            'notifications',
            'pageCapture',
            'platformKeys',
            'power',
            'printerProvider',
            'printing',
            'printingMetrics',
            'privacy',
            'processes',
            'proxy',
            'scripting',
            'search',
            'sessions',
            'signedInDevices',
            'storage',
            'system.cpu',
            'system.display',
            'system.memory',
            'system.storage',
            'tabCapture',
            'tabGroups',
            'tabs',
            'topSites',
            'tts',
            'ttsEngine',
            'unlimitedStorage',
            'vpnProvider',
            'wallpaper',
            'webNavigation',
            'webRequest',
            'webRequestBlocking',
          );
        const permissions = joi
          .array()
          .items(joi.alternatives(knownPermissions, joi.string()));

        return joi.object({
          name: joi.string(),
          version: joi.string(),
          description: joi.string(),
          manifestVersion: joi.number(),
          minimumChromeVersion: joi.string(),
          permissions,
          host_permissions: joi.array().items(joi.string()),
          contentSecurityPolicy: joi.object({
            nonce: stringArr,
            inlineScript: stringArr,
            url: stringArr,
          }),
          contentScripts: joi.array().items(contentScript),
          background: joi.object({
            service_worker: joi.string(),
          }),
          optionsUI: joi.alternatives(
            joi.string(),
            joi.object({
              page: joi.string().required(),
              openInTab: joi.boolean(),
            }),
          ),
          popupUI: joi.alternatives(
            joi.string(),
            joi.object({
              page: joi.string().required(),
              title: joi.string(),
              icon: iconSchema,
              type: joi.string().valid('browserAction', 'pageAction'),
            }),
          ),
          icons: iconSchema,
          extends: joi.object(),
        });
      },
    },
  });
};
