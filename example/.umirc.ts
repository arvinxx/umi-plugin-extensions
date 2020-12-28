import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],

  extension: {
    name: 'Umi Chrome Extension Template',
    description: '基于 Umi 的 Chrome 插件开发脚手架',
    manifestVersion: 2,
    minimumChromeVersion: '80',
    popupUI: {
      page: '@/pages/index',
    },
    optionsUI: {
      page: '@/pages/options',
      openInTab: true,
    },
    icons: {
      16: 'logo/logo@16.png',
      32: 'logo/logo@32.png',
      48: 'logo/logo@48.png',
      128: 'logo/logo@128.png',
    },
    permissions: [],

    background: {
      scripts: ['@/background/index'],
      persistent: true,
    },

    //   content_scripts: [
    //     // {
    //     //   matches: ['https://github.com/*'],
    //     //   css: ['css/all.css'],
    //     //   js: ['js/all.js'],
    //     // },
    //   ],
  },
});
