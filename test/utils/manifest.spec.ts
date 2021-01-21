import { generateManifestFromConfig } from '../../src/utils';

const base = {
  background: undefined,
  contentSecurityPolicy: { inlineScript: [], nonce: [], url: [] },
  icons: undefined,
  minimumChromeVersion: '79',
  name: '123',
  optionsUI: '123',
  permissions: [],
  popupUI: '435',
  version: '',
  manifestVersion: 1,
  contentScripts: [
    {
      matches: ['https://github.com/*'],
      entries: ['@/contentScripts/github'],
    },
    {
      matches: ['https://baidu.com/*', 'https://www.baidu.com/*'],
      entries: ['@/contentScripts/baidu'],
    },
  ],
};

const baseResult = {
  browser_action: {
    default_popup: '__TO_REPLACE_POPUP__',
  },
  content_security_policy: "script-src 'self'; object-src 'self'",
  manifest_version: 1,
  minimum_chrome_version: '79',
  name: '123',
  options_ui: {
    page: '__TO_REPLACE_OPTION__',
  },
  permissions: [],
  version: '',
  content_scripts: [
    {
      matches: ['https://github.com/*'],
      js: [],
      css: [],
    },
    {
      matches: ['https://baidu.com/*', 'https://www.baidu.com/*'],
      js: [],
      css: [],
    },
  ],
};
describe('generateManifestFromConfig', () => {
  it('base', () => {
    expect(generateManifestFromConfig(base)).toEqual(baseResult);
  });

  it('optionsUI & popUp UI & Background', () => {
    expect(
      generateManifestFromConfig({
        ...base,
        optionsUI: { page: '123', openInTab: true },
        popupUI: {
          page: 'popup',
          title: 'hello',
          type: 'pageAction',
        },
        background: { scripts: ['bg'], persistent: true },
      }),
    ).toEqual({
      ...baseResult,
      background: {
        persistent: true,
        scripts: ['bg'],
      },
      options_ui: {
        page: '__TO_REPLACE_OPTION__',
        open_in_tab: true,
      },
      browser_action: undefined,
      option_page: undefined,
      page_action: {
        default_popup: '__TO_REPLACE_POPUP__',
        default_title: 'hello',
      },
    });
  });
  it('popUp UI', () => {
    expect(
      generateManifestFromConfig({
        ...base,
        popupUI: {
          page: 'popup',
          title: 'hello',
        },
      }),
    ).toEqual({
      ...baseResult,
      browser_action: {
        default_popup: '__TO_REPLACE_POPUP__',
        default_title: 'hello',
      },
    });
  });
});
