import { join } from 'path';
import fse from 'fs-extra';
import type { IApi } from 'umi';


/**
 *  将 background 添加到打包对象中
 *  并在输出结果中添加 background 脚本
 * @param api
 */
export default (api: IApi) => {
  const { paths } = api.service;

  api.chainWebpack((config) => {
    const { background } = <PluginExtensions.Config>api.config.extensions;

    // 如果没有 background 就直接结束
    if (!background || background?.scripts.length === 0) {
      return config;
    }

    // 将 background 作为一个入口插入打包对象中
    config.entry('background').merge(background.scripts);
    return config;
  });

  const replaceOutputBackgroundPath = () => {
    const filepath = join(paths.absOutputPath!, 'manifest.json');

    const manifest: chromeExtension.Manifest = fse.readJSONSync(filepath);

    if (manifest.background) {
      manifest.background.scripts = ['background.js'];
    }

    fse.writeJSONSync(filepath, manifest);
  };
  api.onDevCompileDone(replaceOutputBackgroundPath);
  api.onBuildComplete(replaceOutputBackgroundPath);
};
