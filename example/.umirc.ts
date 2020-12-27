import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],

  extension: {
    name: 'Umi Chrome Extension Template',
    description: '基于 Umi 的 Chrome 插件开发脚手架',
    manifest_version: 2,
    minimum_chrome_version: '80',
    permissions: [],
    // contentSecurityPolicy: {},
    // background: {
    //   scripts: ['@/background/index'],
    //   persistent: true,
    // },
    content_scripts: [
      // {
      //   matches: ['https://github.com/*'],
      //   css: ['css/all.css'],
      //   js: ['js/all.js'],
      // },
    ],
    browser_action: {
      default_popup: 'index.html',
      default_icon: {
        16: 'logo/logo@16.png',
        32: 'logo/logo@32.png',
        48: 'logo/logo@48.png',
        128: 'logo/logo@128.png',
      },
    },
    // options_ui: {
    //   page: 'options.html',
    //   open_in_tab: true,
    // },
    icons: {
      16: 'logo/logo@16.png',
      32: 'logo/logo@32.png',
      48: 'logo/logo@48.png',
      128: 'logo/logo@128.png',
    },
  },
});
