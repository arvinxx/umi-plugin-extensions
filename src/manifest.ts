import type { IApi } from 'umi';

import GenerateJsonPlugin from 'generate-json-webpack-plugin';
import type { ExtensionManifest } from './types';
import { getCSPScript } from './utils';

/**
 *  生成 manifest 的
 * @param api
 */
export default (api: IApi) => {
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
