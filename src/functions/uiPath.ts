import type { IApi } from 'umi';

import { join } from 'path';

import { UIPageKeyMap } from '../utils';
import fse from 'fs-extra';

/**
 *  将 manifest 中的中间路径替换成最终生成的路径
 * @param api
 */
export default (api: IApi) => {
  const { paths } = api.service;
  const replaceOutputUIPath = () => {
    const filepath = join(paths.absOutputPath!, 'manifest.json');

    let manifest = fse.readFileSync(filepath, { encoding: 'utf8' });

    const { option, popup } = UIPageKeyMap;

    manifest = manifest
      .replace(option.key, option.output)
      .replace(popup.key, popup.output);

    fse.writeFileSync(filepath, manifest);
  };

  api.onDevCompileDone(replaceOutputUIPath);

  api.onBuildComplete(replaceOutputUIPath);
};
