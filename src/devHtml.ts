import type { IApi } from 'umi';
import got from 'got';
import { join } from 'path';
import fse from 'fs-extra';
import { nonceList } from './utils';

/**
 * 开发阶段生成相应的开发用 html 文件
 * @param api
 */
export default (api: IApi) => {
  if (process.env.NODE_ENV !== 'development') return;

  const PORT = parseInt(process.env.PORT!, 10) || 8000;
  const HOST = process.env.HOST || '127.0.0.1';
  const PROTOCOL = process.env.HTTPS ? 'https' : 'http';
  const baseURL = `${PROTOCOL}://${HOST}:${PORT}/`;
  const { paths } = api.service;
  const { createDebug } = api.utils;
  const debug = createDebug('devHTML');
  const htmlPath = join(paths.absOutputPath!, 'index.html');

  const saveDevHtml = () => {
    debug('Save html start');
    got(baseURL)
      .then((res) => {
        debug(`Save html success, write to ${htmlPath}`);

        let html = (res.body as string).replace(/\/umi\./g, `${baseURL}umi.`);

        // 经过尝试发现 nonce 没用?
        html = html.replace(/<script>/g, (substring, index) => {
          return `<script nonce="${nonceList[index]}">`;
        });

        fse.writeFileSync(htmlPath, html, 'utf-8');
      })
      .catch((e) => {
        debug(`Save html failed: ${e}`);
      });
  };

  api.onStart(saveDevHtml);
};
