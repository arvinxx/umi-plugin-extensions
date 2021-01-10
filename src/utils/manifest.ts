import { utils } from 'umi';

import { getCSPScript } from './csp';
import got from 'got';
import { baseDevURL } from './env';

interface ContentScriptsMap {
  key: string;
  entry: string[];
  js: string[];
  css: string[];
}
interface IUIPageKeyMap {
  popup: {
    key: '__TO_REPLACE_POPUP__';
    output: string;
  };
  option: {
    key: '__TO_REPLACE_OPTION__';
    output: string;
  };
  contentScripts: ContentScriptsMap[];
}
export const UIPageKeyMap: IUIPageKeyMap = {
  popup: {
    key: '__TO_REPLACE_POPUP__',
    output: '',
  },
  option: {
    key: '__TO_REPLACE_OPTION__',
    output: '',
  },
  contentScripts: [],
};

export const CSPKeyMap = {
  // 为替换文本准备的钩子字符串
  key: '__TO_REPLACE_INLINE_SCRIPT__',
  output: '',
};

/**
 * 从 umi 插件配置项中生成 manifest 文件
 * @param config
 */
export const generateManifestFromConfig = (
  config: extensionsPlugin.Config,
): chromeManifest.Manifest => {
  const {
    contentSecurityPolicy,
    background,
    optionsUI,
    popupUI,
    manifestVersion: manifest_version,
    minimumChromeVersion: minimum_chrome_version,
    contentScripts,
    ...manifest
  } = config;

  const { inlineScript, nonce, url } = contentSecurityPolicy;

  const content_security_policy = getCSPScript({
    inlineScript,
    nonce,
    url,
  });

  const backgroundStr =
    background && background.scripts.length > 0 ? background : undefined;

  // 处理 option 参数项
  const option = {};
  if (typeof optionsUI === 'string') {
    option['options_ui'] = { page: UIPageKeyMap.option.key };
  }
  if (typeof optionsUI === 'object') {
    option['options_ui'] = {
      page: UIPageKeyMap.option.key,
      open_in_tab: optionsUI.openInTab,
    };
  }
  console.log(utils.routeToChunkName({ route: '@/background/index' }));
  // 处理 popup 的参数项
  const popup = {};
  if (typeof popupUI === 'string') {
    popup['browser_action'] = {
      default_popup: UIPageKeyMap.popup.key,
    };
  }
  if (typeof popupUI === 'object') {
    switch (popupUI.type) {
      default:
      case 'browserAction':
        popup['browser_action'] = {
          default_popup: UIPageKeyMap.popup.key,
          default_icon: popupUI.icon,
          default_title: popupUI.title,
        };
        break;
      case 'pageAction':
        popup['page_action'] = {
          default_popup: UIPageKeyMap.popup.key,
          default_icon: popupUI.icon,
          default_title: popupUI.title,
        };
    }
  }

  // 处理 content scripts
  const content_scripts: chromeManifest.ContentScript[] = contentScripts.map(
    (item, index) => {
      UIPageKeyMap.contentScripts[index] = {
        key: `__TO_REPLACE_CONTENT_SCRIPTS_${index}__`,
        entry: item.entries!,
        js: [`__TO_REPLACE_CONTENT_SCRIPTS_JS_${index}__`],
        css: [`__TO_REPLACE_CONTENT_SCRIPTS_CSS_${index}__`],
      };

      return {
        matches: item.matches!,
        run_at: item.runAt!,
        js: UIPageKeyMap.contentScripts[index].js!,
        css: UIPageKeyMap.contentScripts[index].css!,
      };
    },
  );
  return {
    ...manifest,
    ...option,
    ...popup,
    background: backgroundStr,
    manifest_version,
    content_security_policy,
    minimum_chrome_version,
    content_scripts: content_scripts.length > 0 ? content_scripts : undefined,
  };
};

/**
 * 专门用于 onStart 方法的
 * @param fn
 */
export const gotManifest = (fn: any) => {
  got(`${baseDevURL}/manifest.json`).then(fn).catch();
};

/**
 * 更新 manifest 中和 UI 路径相关的内容
 * @param manifest
 */
export const updateUIPath = (manifest: string): string => {
  const { option, popup } = UIPageKeyMap;

  return manifest
    .replace(option.key, option.output)
    .replace(popup.key, popup.output);
};
/**
 * 更新 background 脚本地址
 * @param manifest
 */
export const updateBackground = (manifest: chromeManifest.Manifest): string => {
  const data = manifest;
  if (data.background) {
    data.background.scripts = ['background.js'];
  }
  return JSON.stringify(data);
};

/**
 * 写入 inline script 的 hash
 */
export const updateCSP = (manifest: string) => {
  return manifest.replace(CSPKeyMap.key, CSPKeyMap.output);
};
