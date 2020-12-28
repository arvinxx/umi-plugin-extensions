import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],

  extensions: {
    name: 'Umi Extension Plugin',
    description: '基于 Chrome 插件开发的 Umi 插件',
    manifestVersion: 2,
    minimumChromeVersion: '80',
    popupUI: '@/pages/index',
    icons: {
      16: 'logo/logo@16.png',
      32: 'logo/logo@32.png',
      48: 'logo/logo@48.png',
      128: 'logo/logo@128.png',
    },
    optionsUI: '@/pages/options',
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
