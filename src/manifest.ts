import type { IApi } from 'umi';
import { join } from 'path';
import fse from 'fs-extra';
import GenerateJsonPlugin from 'generate-json-webpack-plugin';
import type { ExtensionManifest } from './types';
import { getCSPScript, nonceList } from './utils';

export default (api: IApi) => {
  const isDev = process.env.NODE_ENV === 'development';

  const pkg = fse.readJSONSync(
    join(api.paths.absSrcPath!, '..', 'package.json'),
  );

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
          url: [],
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

  api.modifyConfig((config) => {
    /**
     * Chrome 的内容安全政策(CSP)
     * @description
     * 由于 umi 打出来的html 包含了三个内联的 script
     * 因此必须将这三个内联的 script 添加到 csp 中
     */
    const { contentSecurityPolicy } = config.extension as ExtensionManifest;

    contentSecurityPolicy.nonce.concat(nonceList);

    if (isDev) {
      contentSecurityPolicy.url.push('http://127.0.0.1:8000');
    }

    //   inlineScript: [
    //     // window.routerBase = "/";
    //     // 'sha256-YM8uI2F+VfHULiDF1T+UCYmPwssvvWleyz5k2gtmTQo=',
    //     // // umi 的版本
    //     // 'sha256-g3hjaXGjDuIE5N9wBAzFtJfpVSr27ys0zwyijmBdiL0=',
    //     // // g_path
    //     // 'sha256-LiewP3m9AcU1h8ct8EALDhEPurYA+arJZa8+OrawT/A=',
    //     // // popup.html 的 路由页面
    //     // 'sha256-JMXt6Isa9gxE6MsyLWV97GmIuJEi8tQw4YKvMRi3NSs=',
    //     //
    //     // // option.html 的 路由页面
    //     // 'sha256-V1KaGDajKBXAi6K8XGvKbJ3sQ8XBDEZigeI40P4js34=',
    //   ],
    // };

    return config;
  });
  api.chainWebpack((config) => {
    const { contentSecurityPolicy, background, options_ui, ...manifest } = api
      .config.extension as ExtensionManifest;

    const { inlineScript, nonce, url } = contentSecurityPolicy;

    const content_security_policy = getCSPScript({
      inlineScript,
      nonce,
      url,
    });
    const backgrounStr = background.scripts.length > 0 ? background : undefined;

    const optionsUIStr = !options_ui.page ? undefined : options_ui;
    config.plugin('toJSON').use(GenerateJsonPlugin, [
      'manifest.json',
      {
        ...manifest,
        background: backgrounStr,
        options_ui: optionsUIStr,
        content_security_policy,
      },
    ]);

    return config;
  });
};
