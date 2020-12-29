import { getCSPScript } from './csp';

export const UIPageKeyMap = {
  popup: {
    key: '__TO_REPLACE_POPUP__',
    output: '',
  },
  option: {
    key: '__TO_REPLACE_OPTION__',
    output: '',
  },
};

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
  return {
    ...manifest,
    ...option,
    ...popup,
    background: backgroundStr,
    manifest_version,
    content_security_policy,
    minimum_chrome_version,
  };
};

// export const
