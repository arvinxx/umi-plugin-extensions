import {
  generateManifestFromConfig,
  validateVersion,
  updateBackground,
  updateHotLoad,
  updateContentScripts,
} from '../../src/utils/manifest';

const base = {
  version: '1.0.0',
  background: undefined,
  contentSecurityPolicy: { inlineScript: [], nonce: [], url: [] },
  icons: undefined,
  minimumChromeVersion: '79',
  name: '123',
  optionsUI: '123',
  permissions: [],
  popupUI: '435',
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
  version: '1.0.0',
  action: {
    default_popup: '__TO_REPLACE_POPUP__',
  },
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'",
  },
  manifest_version: 1,
  minimum_chrome_version: '79',
  name: '123',
  options_ui: {
    page: '__TO_REPLACE_OPTION__',
  },
  permissions: [],
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
        background: { server_worker: 'bg' },
      }),
    ).toEqual({
      ...baseResult,
      background: { server_worker: 'bg' },
      options_ui: {
        page: '__TO_REPLACE_OPTION__',
        open_in_tab: true,
      },
      browser_action: undefined,
      option_page: undefined,
      action: {
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
      action: {
        default_popup: '__TO_REPLACE_POPUP__',
        default_title: 'hello',
      },
    });
  });
});

describe('validateVersion', () => {
  describe('正确结构', () => {
    it('X', () => {
      expect(validateVersion('1')).toBe('1');
    });
    it('X.Y', () => {
      expect(validateVersion('1.2')).toBe('1.2');
    });
    it('X.Y.Z', () => {
      expect(validateVersion('1.2.3')).toBe('1.2.3');
    });
    it('X.Y.Z.a', () => {
      expect(validateVersion('1.2.3.0')).toBe('1.2.3.0');
    });
    it('X.Y.Z-aaa.0', () => {
      expect(validateVersion('1.2.3-beta.0')).toBe('1.2.3.0');
    });
  });
  describe('错误结构', () => {
    it('XaY', () => {
      expect(() => validateVersion('1a2')).toThrowError(
        '版本格式不正确,请检查后重试...',
      );
    });
    it('X.Y.Z-aaa0', () => {
      expect(() => validateVersion('1.2.3-beta0')).toThrowError(
        '版本格式不正确,请检查后重试...',
      );
    });
  });
});

test('updateBackground', () => {
  expect(updateBackground({ background: {} })).toEqual({
    background: { server_worker: 'background.js' },
  });
  expect(updateBackground({})).toEqual({});
});

test('updateHotLoad', () => {
  expect(updateHotLoad({ background: { server_worker: '' } })).toEqual({
    background: { server_worker: '' },
  });
  expect(updateHotLoad({})).toEqual({
    background: { server_worker: 'hot-reload.js' },
  });
});

test('updateContentScripts', () => {
  expect(updateContentScripts({})).toEqual({});
  expect(updateContentScripts({ content_scripts: [{}] })).toEqual({
    content_scripts: [
      { js: ['contentScript_0.js'], css: ['contentScript_0.css'] },
    ],
  });
});
