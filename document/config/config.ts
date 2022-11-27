export const nav = [
  { title: '指南', link: '/guide' },
  { title: '教程', link: '/tutorial' },
  { title: 'API', link: '/api' },

  {
    title: 'GitHub',
    link: 'https://github.com/arvinxx/umi-plugin-extensions',
  },
];

export const sideBar = {
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
};
