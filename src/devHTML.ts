import type { IApi } from 'umi';
import got from 'got';
import { join } from 'path';
import fse from 'fs-extra';
import { isDev } from './utils';

/**
 * 开发阶段生成相应的开发用 HTML 文件
 * @param api
 */
export default (api: IApi) => {
  if (!isDev) return;

  const { createDebug } = api.utils;
  const debug = createDebug('devHTML');

  const PORT = parseInt(process.env.PORT!, 10) || 8000;
  const HOST = process.env.HOST || '127.0.0.1';
  const PROTOCOL = process.env.HTTPS ? 'https' : 'http';
  const baseURL = `${PROTOCOL}://${HOST}:${PORT}`;

  const { paths } = api.service;

  // TODO: 分别处理 popup 和 options
  const htmlPath = join(paths.absOutputPath!, 'index.html');

  const saveDevHtml = () => {
    debug('Save html start');
    got(baseURL)
      .then((res) => {
        debug(`Save html success, write to ${htmlPath}`);
        // 写入 html
        let html = (res.body as string).replace(/\/umi\./g, `${baseURL}/umi.`);

        html = html.replace(/\/@@/g, `${baseURL}/@@`);

        fse.writeFileSync(htmlPath, html, 'utf-8');
      })
      .catch((e) => {
        debug(`Save html failed: ${e}`);
      });
  };

  api.onDevCompileDone(saveDevHtml);
};
