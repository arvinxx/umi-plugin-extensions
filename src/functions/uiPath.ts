import type { IApi } from 'umi';

import { join } from 'path';

import { updateUIPath } from '../utils';
import fse from 'fs-extra';

/**
 *  将 manifest 中的中间路径替换成最终生成的路径
 * @param api
 */
export default (api: IApi) => {
  const { paths } = api.service;

  const filepath = join(paths.absOutputPath!, 'manifest.json');

  /**
   * 任何其他时候
   */
  const done = () => {
    const manifest = fse.readFileSync(filepath, { encoding: 'utf8' });
    fse.writeFileSync(filepath, updateUIPath(manifest));
  };

  api.onDevCompileDone(done);
  api.onBuildComplete(done);
};
