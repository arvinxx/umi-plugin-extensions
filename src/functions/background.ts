import { join } from 'path';
import fse from 'fs-extra';

import type { IApi } from 'umi';
import { updateBackground } from '../utils';

/**
 *  将 background 添加到打包对象中
 *  并在输出结果中添加 background 脚本
 * @param api
 */
export default (api: IApi) => {
  const { paths } = api.service;

  // 修正 webpack 关于 background 的配置
  api.chainWebpack((config) => {
    const { background } = <extensionsPlugin.Config>api.config.extensions;

    // 如果没有 background 就直接结束
    if (!background?.server_worker) {
      return config;
    }

    // 将 background 作为一个入口插入打包对象中
    config.entry('background').merge([background.server_worker]);
    return config;
  });

  const done = () => {
    const filepath = join(paths.absOutputPath!, 'manifest.json');
    const manifest: chromeManifest.Manifest = fse.readJSONSync(filepath);
    fse.writeJSONSync(filepath, updateBackground(manifest));
  };

  api.onDevCompileDone(done);
  api.onBuildComplete(done);
};
