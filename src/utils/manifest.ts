import { getCSPScript } from './csp';

/**
 * 检查版本格式
 * @param version
 */
export const validateVersion = (version: string) => {
  // 测试是否属于 X.Y.Z.a
  // https://regex101.com/r/xijWEc/3
  const regex = /^\d+(\.\d+){0,3}$/;

  //  说明不是正常的版本号
  if (!regex.exec(version)) {
    // 检查是否带 -rc.2 这种结构
    // https://regex101.com/r/2iu2oy/4
    const withAlphabet = /^\d(?:\.\d){2}(-[a-z]*)\.\d/;

    const res = withAlphabet.exec(version);

    if (!res) {
      throw Error('版本格式不正确,请检查后重试...');
    }
    const alphabet = res[1];
    return version.replace(alphabet, '');
  }
  return version;
};

/**
 * 从 umi 插件配置项中生成 manifest 文件
 * @param config
 */
export const generateManifestFromConfig = (
  config: extensionsPlugin.Config,
): chrome.runtime.Manifest => {
  const {
    contentSecurityPolicy,
    background,
    optionsUI,
    popupUI,
    manifestVersion: manifest_version,
    minimumChromeVersion: minimum_chrome_version,
    contentScripts,
    version,
    extends: origin,
    ...manifest
  } = config;

  const { inlineScript, nonce, url } = contentSecurityPolicy;

  const backgroundStr = background?.service_worker ? background : undefined;

  // 处理 option 参数项
  const option = {};
  if (typeof optionsUI === 'string') {
    option['options_ui'] = { page: 'options.html' };
  }
  if (typeof optionsUI === 'object') {
    option['options_ui'] = {
      page: 'options.html',
      open_in_tab: optionsUI.openInTab,
    };
  }
  // 处理 popup 的参数项
  const popup = {};
  if (typeof popupUI === 'string') {
    popup['action'] = {
      default_popup: 'popup.html',
    };
  }
  if (typeof popupUI === 'object') {
    popup['action'] = {
      default_popup: 'popup.html',
      default_icon: popupUI.icon,
      default_title: popupUI.title,
    };
  }

  // 处理 content scripts
  const content_scripts: chrome.runtime.ManifestV3['content_scripts'] =
    contentScripts.map((item) => {
      return {
        matches: item.matches!,
        run_at: item.runAt!,
        js: [],
        css: [],
      };
    });
  return {
    ...manifest,
    ...option,
    ...popup,
    ...origin,
    version: validateVersion(version),
    background: backgroundStr,
    manifest_version,
    content_security_policy: {
      extension_pages: getCSPScript({
        inlineScript,
        nonce,
        url,
      }),
    },
    minimum_chrome_version,
    content_scripts: content_scripts.length > 0 ? content_scripts : undefined,
  };
};

/**
 * 更新 background 脚本地址
 * @param manifest
 */
export const updateBackground = (manifest: chrome.runtime.ManifestV3) => {
  const data = manifest;
  if (data.background) {
    data.background.service_worker = 'background.js';
  }
  return data;
};

/**
 * 更新热加载方法
 * @param manifest
 */
export const updateHotLoad = (manifest: chrome.runtime.ManifestV3) => {
  const data = manifest;
  // TODO：如何集成新的热加载？
  if (data.background) {
  } else {
    data.background = { service_worker: 'hot-reload.js' };
  }
  return data;
};

/**
 * 更新 contentScripts 脚本地址
 * @param manifest
 */
export const updateContentScripts = (manifest: chrome.runtime.ManifestV3) => {
  const data = manifest;
  if (data.content_scripts) {
    data.content_scripts = data.content_scripts.map((item, index) => {
      item.js = [`contentScript_${index}.js`];
      item.css = [`contentScript_${index}.css`];
      return item;
    });
  }
  return data;
};
