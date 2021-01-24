import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],

  extensions: {
    name: 'Umi Extension Plugin',
    description: '用于 Chrome 插件开发的 Umi 插件',
    manifestVersion: 2,
    minimumChromeVersion: '80',
    icons: {
      16: 'logo/logo@16.png',
      32: 'logo/logo@32.png',
      48: 'logo/logo@48.png',
      128: 'logo/logo@128.png',
    },
    // optionsUI: '@/pages/options',
    optionsUI: {
      page: '@/pages/options',
      openInTab: true,
    },
    popupUI: '@/pages/index',
    permissions: ['http://*/*', 'https://*/*'],
    background: {
      scripts: ['@/background/index'],
      persistent: true,
    },
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
  },
});
