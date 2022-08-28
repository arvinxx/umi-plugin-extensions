import type { IApi } from 'umi';

import { join } from 'path';

import fse from 'fs-extra';
import got from 'got';
import {
  baseDevURL,
  delay,
  isDev,
  updateBackground,
  updateContentScripts,
  updateCSP,
  updateHotLoad,
  updateUIPath,
} from '../utils';

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
  api.onDevCompileDone({
    name: 'gotManifest',
    fn: () => {
      got(`${baseDevURL}/manifest.json`)
        .then(async () => {
          const manifest = fse.readJSONSync(
            filepath,
          ) as chromeManifest.Manifest;

          await delay(500);

          const newManifest = updateContentScripts(
            updateHotLoad(updateBackground(manifest)),
          );

          fse.writeFileSync(
            filepath,
            updateCSP(updateUIPath(JSON.stringify(newManifest))),
          );
        })
        .catch((e) => {
          console.log(e);
        });
    },
    stage: 1000,
  });
};
