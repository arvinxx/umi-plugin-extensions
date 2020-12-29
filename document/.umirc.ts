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
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/arvinxx/umi-plugin-extensions',
    },
  ],
  dynamicImport: {
    loading: '@ant-design/pro-skeleton',
  },
  hash: true,
});
