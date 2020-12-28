import type { IApi } from 'umi';
import got from 'got';
import { join } from 'path';
import fse from 'fs-extra';
import { baseDevURL, isDev, UIPageKeyMap } from '../utils';

/**
 * 开发阶段生成相应的开发用 HTML 文件
 * @param api
 */
export default (api: IApi) => {
  if (!isDev) return;

  const { paths } = api.service;

  const saveDevHtml = () => {
    got(baseDevURL).then((res) => {
      // 分别生成 popup 和 options 的 html 文件
      const { option, popup } = UIPageKeyMap;
      const htmlPaths: string[] = [];

      if (option.output !== '') {
        htmlPaths.push(join(paths.absOutputPath!, option.output));
      }
      if (popup.output !== '') {
        htmlPaths.push(join(paths.absOutputPath!, popup.output));
      }

      htmlPaths.forEach((htmlPath) => {
        const html = (res.body as string)
          // /umi.js -> url/umi.js
          .replace(/\/umi\./g, `${baseDevURL}/umi.`)
          // /@@/devscript.js -> url/@@/devscript.js
          .replace(/\/@@/g, `${baseDevURL}/@@`);

        // 写入 html
        fse.writeFileSync(htmlPath, html, 'utf-8');
      });
    });
  };

  api.onDevCompileDone(saveDevHtml);
};
