import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],

  extensions: {
    name: 'Umi Extension Plugin',
    description: '用于 Chrome 插件开发的 Umi 插件',
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
    popupUI: '@/pages/popup',
    permissions: ['storage'],
    host_permissions: ['http://*/*', 'https://*/*'],
    background: {
      service_worker: '@/background/index',
    },
    contentScripts: [
      {
        matches: ['https://github.com/*'],
        entries: ['./contentScripts/github'],
      },
      {
        matches: ['https://baidu.com/*', 'https://www.baidu.com/*'],
        entries: ['@/contentScripts/baidu'],
      },
    ],
    extends: {
      web_accessible_resources: [
        {
          resources: ['test1.png', 'test2.png'],
          matches: ['https://web-accessible-resources-1.glitch.me/*'],
        },
      ],
    },
  },
});
