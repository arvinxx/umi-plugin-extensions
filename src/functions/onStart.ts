import type { IApi } from 'umi';

import { join } from 'path';

import {
  gotManifest,
  updateUIPath,
  updateBackground,
  isDev,
  updateCSP,
  getCSPHashFromScript,
} from '../utils';
import fse from 'fs-extra';

/**
 *  只在初始化的时候使用 manifest
 * @param api
 */
export default (api: IApi) => {
  if (!isDev) return;
  const { absOutputPath } = api.service.paths;
  const filepath = join(absOutputPath!, 'manifest.json');

  /**
   *
   */

  api.onStart(() => {
    gotManifest(async () => {
      const manifest = fse.readJSONSync(filepath) as chromeManifest.Manifest;

      await getCSPHashFromScript(absOutputPath);

      await api.utils.delay(500);

      fse.writeFileSync(
        filepath,
        updateCSP(updateUIPath(updateBackground(manifest))),
      );
    });
  });
};
