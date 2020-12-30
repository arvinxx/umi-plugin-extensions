const isProdSite = process.env.NODE_ENV === 'production';

/**
 * typedoc 配置项
 * 快查地址: https://typedoc.org/guides/options/
 */
module.exports = {
  name: 'umi-plugin-extensions',

  // mode: 'file',
  tsconfig: './tsconfig-typedoc.json',
  entryPoints: ['types/index.d.ts'],
  // includes: ['src/types'],
  out: 'document/docs/api',
  exclude: ['**/node_modules/**'],
  // externalPattern: [''],
  excludePrivate: true,
  excludeProtected: true,
  // excludeExternals: true,
  // excludeNotExported: true,
  /**
   * 如果注释里包含 @category
   * 设为 false 则按照 category 分组显示
   * 否则按照 class interface 等默认分组显示
   */
  // categorizeByGroup: false,
  includeVersion: true,
  /**
   * 不显示源码来源
   * 作为文档查阅的过程中这个信息比较干扰
   */
  disableSources: true,
  // 标记有 @internal 的代码将不会输出
  // stripInternal: true,

  readme: 'document/API.md',
  // plugin: 'none',
  plugin: [
    // 'typedoc-plugin-external-module-map',
    'typedoc-plugin-markdown',
  ],
  // 'external-modulemap': './types/([\\w\\-_]+)/',
  // hideBreadcrumbs: true,
  namedAnchors: true,
  hideProjectName: true,
  publicPath: isProdSite ? '/umi-plugin-extensions/api/' : '/api/',
  // 生成文件名用 - 隔开
  filenameSeparator: '-',
};
