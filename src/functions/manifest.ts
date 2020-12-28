import type { IApi } from 'umi';
import GenerateJsonPlugin from 'generate-json-webpack-plugin';

import { generateManifestFromConfig } from '../utils';
import type { IExtensionPluginConfig } from '../types/PluginConfig';

/**
 *  生成 manifest.json 文件
 * @param api
 */
export default (api: IApi) => {
  api.chainWebpack((config) => {
    const manifest = generateManifestFromConfig(
      <IExtensionPluginConfig>api.config.extensions,
    );

    config
      .plugin('toJSON')
      .use(GenerateJsonPlugin, ['manifest.json', manifest]);

    return config;
  });
};
