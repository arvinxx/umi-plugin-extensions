import type { IApi } from 'umi';
import { join } from 'path';
import fse from 'fs-extra';
import { isDev } from './utils';

/**
 * 定义插件结构
 * @param api
 */
export default (api: IApi) => {
  const pkg = fse.readJSONSync(
    join(api.paths.absSrcPath!, '..', 'package.json'),
  );

  const PORT = parseInt(process.env.PORT!, 10) || 8000;
  const HOST = process.env.HOST || '127.0.0.1';
  const PROTOCOL = process.env.HTTPS ? 'https' : 'http';
  const baseURL = `${PROTOCOL}://${HOST}:${PORT}`;

  //  manifest 结构
  api.describe({
    key: 'extension',
    config: {
      default: {
        name: pkg.name || 'umi extension template',
        version: pkg.version || '1.0.0',
        description: pkg.description || '基于 Umi 的 Chrome 插件开发脚手架',
        manifest_version: 2,
        minimum_chrome_version: '80',
        permissions: [],
        background: {
          scripts: [],
          persistent: true,
        },
        content_scripts: [],
        browser_action: {
          default_icon: {},
        },

        icons: {},
        options_ui: {},
        contentSecurityPolicy: {
          nonce: [],
          inlineScript: [],
          url: isDev ? [baseURL] : [],
        },
      },
      /**
       * 校验器
       * @param joi
       */
      schema(joi) {
        return joi.object({
          name: joi.string(),
          version: joi.string(),
          description: joi.string(),
          manifest_version: joi.number(),
          minimum_chrome_version: joi.string(),
          permissions: joi.array(),
          contentSecurityPolicy: joi.object({
            nonce: joi.array().items(joi.string()),
            inlineScript: joi.array().items(joi.string()),
            url: joi.array().items(joi.string()),
          }),
          content_scripts: joi.array(),
          background: joi.object({
            scripts: joi.array().items(joi.string()),
            persistent: joi.boolean(),
          }),
          browser_action: joi.object(),
          icons: joi.object(),
          options_ui: joi.object({
            page: joi.string(),
            open_in_tab: joi.boolean(),
          }),
        });
      },
    },
  });
};
