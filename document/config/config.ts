import { defineConfig } from 'umi';
import { resolve } from 'path';

const isProdSite =
  // 不是预览模式 同时是生产环境
  process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'umi-plugin-extensions',
  mode: 'site',
  // 部署在非根目录时, base 和 publicPath 都需要配置
  base: '/',
  publicPath: isProdSite ? '/umi-plugin-extensions/' : '/',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  navs: [
    { title: '指南', path: '/guide' },
    { title: '教程', path: '/tutorial' },
    { title: 'API', path: '/api' },

    {
      title: 'GitHub',
      path: 'https://github.com/arvinxx/umi-plugin-extensions',
    },
  ],
  dynamicImport: {
    loading: '@ant-design/pro-skeleton',
  },
  history: {
    type: 'hash',
  },
  hash: true,
  menus: {
    '/api': [
      // {
      //   path: '/api/index',
      //   title: '概览',
      //   exact: true,
      //   children: [{ path: '/api/modules', title: '模块索引' }],
      // },
      { path: '/api/modules', title: '模块索引' },
      {
        path: '/api/interfaces/extensionsplugin-config',
        title: '插件配置',
        children: [
          {
            title: 'OptionsUI',
            path: '/api/interfaces/extensionsplugin-optionsui',
          },
          {
            title: 'PopupUI',
            path: '/api/interfaces/extensionsplugin-popupui',
          },
          {
            title: 'ContentScript',
            path: '/api/interfaces/extensionsplugin-contentscript',
          },
          {
            title: 'ContentSecurityPolicy',
            path: '/api/interfaces/extensionsplugin-contentsecuritypolicy',
          },
        ],
      },
      {
        path: '/api/modules/chromemanifest',
        title: 'Manifest 文件',
        children: [
          '/api/interfaces/chromemanifest-actions',
          '/api/interfaces/chromemanifest-background',
          '/api/interfaces/chromemanifest-basecommands',
          '/api/interfaces/chromemanifest-browseraction',
          '/api/interfaces/chromemanifest-chromesettingsoverrides',
          '/api/interfaces/chromemanifest-chromeurloverrides',
          '/api/interfaces/chromemanifest-command',
          '/api/interfaces/chromemanifest-conditions',
          '/api/interfaces/chromemanifest-contentscript',
          '/api/interfaces/chromemanifest-customcommands',
          '/api/interfaces/chromemanifest-eventrule',
          '/api/interfaces/chromemanifest-externallyconnectable',
          '/api/interfaces/chromemanifest-filebrowserhandler',
          '/api/interfaces/chromemanifest-filesystemprovider',
          '/api/interfaces/chromemanifest-iconstruct',
          '/api/interfaces/chromemanifest-manifest',
          '/api/interfaces/chromemanifest-nativeclientmodule',
          '/api/interfaces/chromemanifest-optionsui',
          '/api/interfaces/chromemanifest-requirements',
          '/api/interfaces/chromemanifest-sandbox',
          '/api/interfaces/chromemanifest-searchprovider',
          '/api/interfaces/chromemanifest-sharedmodule',
          '/api/interfaces/chromemanifest-ttsengine',
          '/api/interfaces/chromemanifest-voice',
        ],
      },
    ],
  },

  // },
});
