import { join } from 'path';
import fse from 'fs-extra';

import type { IApi } from 'umi';
import { updateContentScripts } from '../utils';

/**
 *  将 contentScripts 添加到打包对象中
 *  并在输出结果中添加 contentScripts 脚本
 * @param api
 */
export default (api: IApi) => {
  const { paths } = api.service;

  // 修正 webpack 关于 contentScripts 的配置
  api.chainWebpack((config) => {
    const { contentScripts } = <extensionsPlugin.Config>api.config.extensions;

    // 如果没有 contentScripts 就直接结束
    if (!contentScripts || contentScripts.length === 0) {
      return config;
    }

    // 将 contentScripts 作为一个入口插入打包对象中
    contentScripts.forEach((item, index) => {
      const { entries } = item;

      const entry = `contentScript_${index}`;

      config.entry(entry).merge(entries);
    });

    return config;
  });

  const filepath = join(paths.absOutputPath!, 'manifest.json');

  const done = () => {
    const manifest: chromeManifest.Manifest = fse.readJSONSync(filepath);
    fse.writeJSONSync(filepath, updateContentScripts(manifest));
  };

  api.onDevCompileDone(done);
  api.onBuildComplete(done);
};
