import type { IApi } from 'umi';
import { isDev, updateHotLoad } from '../utils';
import { join, resolve } from 'path';
import fse from 'fs-extra';

/**
 *  处理脚本自动更新
 * @param api
 */
export default (api: IApi) => {
  if (!isDev) return;
  // 在 webpack中插入 关于 hot-reload 的脚本
  api.chainWebpack((config) => {
    // 将 hot-reload 脚本 拷贝到目录
    const copyPlugin = config.plugins.get('copy');

    copyPlugin.tap((args) => {
      const { patterns } = args[0];
      patterns.push({
        from: resolve('./node_modules/crx-hotreload/hot-reload.js'),
        to: api.paths.absOutputPath,
      });
      return args;
    });

    return config;
  });

  const done = () => {
    const filepath = join(api.paths.absOutputPath!, 'manifest.json');
    const manifest: chromeManifest.Manifest = fse.readJSONSync(filepath);
    fse.writeJSONSync(filepath, updateHotLoad(manifest));
  };

  api.onDevCompileDone(done);
  api.onBuildComplete(done);
};
