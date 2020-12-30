import { defineConfig } from 'umi';
import { resolve } from 'path';

const isProdSite =
  // 不是预览模式 同时是生产环境
  process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'umi-plugin-extensions',
  mode: 'site',
  // 部署在非根目录时, base 和 publicPath 都需要配置
  base: isProdSite ? '/umi-plugin-extensions/' : '/',
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
    { title: '配置', path: '/api/modules/extensionsplugin' },
    { title: 'Manifest', path: '/api/modules/chromemanifest' },
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
  // menus: {
  // '/api': [
  //   {
  //     path: '/api',
  //     title: '概览',
  //     children: [{ path: '/api/modules', title: '版本&索引' }],
  //   },
  //   {
  //     path: '/api/modules/extensionsplugin',
  //     title: '插件配置',
  //   },
  //   {
  //     path: '/api/modules/chromemanifest',
  //     title: 'Manifest 文件',
  //   },
  // ],
  ///api/interfaces/chromemanifest-actions
  // /api/interfaces/chromemanifest-background
  // /api/interfaces/chromemanifest-basecommands
  // /api/interfaces/chromemanifest-browseraction
  // /api/interfaces/chromemanifest-chromesettingsoverrides
  // /api/interfaces/chromemanifest-chromeurloverrides
  // /api/interfaces/chromemanifest-command
  // /api/interfaces/chromemanifest-conditions
  // /api/interfaces/chromemanifest-contentscript
  // /api/interfaces/chromemanifest-customcommands
  // /api/interfaces/chromemanifest-eventrule
  // /api/interfaces/chromemanifest-externallyconnectable
  // /api/interfaces/chromemanifest-filebrowserhandler
  // /api/interfaces/chromemanifest-filesystemprovider
  // /api/interfaces/chromemanifest-iconstruct
  // /api/interfaces/chromemanifest-manifest
  // /api/interfaces/chromemanifest-nativeclientmodule
  // /api/interfaces/chromemanifest-optionsui
  // /api/interfaces/chromemanifest-requirements
  // /api/interfaces/chromemanifest-sandbox
  // /api/interfaces/chromemanifest-searchprovider
  // /api/interfaces/chromemanifest-sharedmodule
  // /api/interfaces/chromemanifest-ttsengine
  // /api/interfaces/chromemanifest-voice
  // /api/interfaces/extensionsplugin-config
  // /api/interfaces/extensionsplugin-contentsecuritypolicy
  // /api/interfaces/extensionsplugin-optionsui
  // /api/interfaces/extensionsplugin-popupui
  // '/api/modules/extensionsplugin': [
  //   {
  //     path: '/api/modules/extensionsplugin',
  //     title: '概览',
  //   },
  // ],
  // '/api/modules/chromemanifest': [
  //   {
  //     path: '/api/modules/chromemanifest',
  //     title: '概览',
  //   },
  //   {
  //     title: 'Actions',
  //     path: '/api/interfaces/chromemanifest-actions',
  //   },
  // ],
  // },
});
