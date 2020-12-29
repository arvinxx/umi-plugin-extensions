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
  hash: true,
  menus: {
    '/api': [
      {
        path: '/api',
        title: '概览',
        children: [{ path: '/api/globals', title: '版本&索引' }],
      },
      {
        path: '/api/modules/extensionsplugin',
        title: '插件配置',
      },
      {
        path: '/api/modules/chromemanifest',
        title: 'Manifest 文件',
      },
    ],
    '/api/modules/extensionsplugin': [
      {
        path: '/api/modules/extensionsplugin',
        title: '概览',
      },
    ],
    '/api/modules/chromemanifest': [
      {
        path: '/api/modules/chromemanifest',
        title: '概览',
      },
    ],
  },
});
