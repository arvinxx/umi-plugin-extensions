import { defineConfig } from 'umi';

export default defineConfig({
  title: 'umi-plugin-extensions',
  mode: 'site',
  // 部署在非根目录时, base 和 publicPath 都需要配置
  base: '/',
  publicPath: '/',
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
        path: '/api/modules/chromeManifest',
        title: 'Manifest 文件',
        children: [
          '/api/interfaces/chromeManifest-Actions',
          '/api/interfaces/chromeManifest-Background',
          '/api/interfaces/chromeManifest-BaseCommands',
          '/api/interfaces/chromeManifest-BrowserAction',
          '/api/interfaces/chromeManifest-ChromeSettingsOverrides',
          '/api/interfaces/chromeManifest-ChromeUrlOverrides',
          '/api/interfaces/chromeManifest-Command',
          '/api/interfaces/chromeManifest-Conditions',
          '/api/interfaces/chromeManifest-ContentScript',
          '/api/interfaces/chromeManifest-CustomCommands',
          '/api/interfaces/chromeManifest-EventRule',
          '/api/interfaces/chromeManifest-ExternallyConnectable',
          '/api/interfaces/chromeManifest-FileBrowserHandler',
          '/api/interfaces/chromeManifest-FileSystemProvider',
          '/api/interfaces/chromeManifest-IconStruct',
          '/api/interfaces/chromeManifest-Manifest',
          '/api/interfaces/chromeManifest-NativeClientModule',
          '/api/interfaces/chromeManifest-OptionsUI',
          '/api/interfaces/chromeManifest-Requirements',
          '/api/interfaces/chromeManifest-Sandbox',
          '/api/interfaces/chromeManifest-SearchProvider',
          '/api/interfaces/chromeManifest-SharedModule',
          '/api/interfaces/chromeManifest-TTSEngine',
          '/api/interfaces/chromeManifest-Voice',
        ],
      },
    ],
  },

  // },
});
