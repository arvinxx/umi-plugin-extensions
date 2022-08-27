import type { IApi } from 'umi';
import got from 'got';
import { join } from 'path';
import fse from 'fs-extra';
import { baseDevURL, extractInlineScript, isDev, UIPageKeyMap } from '../utils';

/**
 * 开发阶段生成相应的开发用 HTML 和 JS 文件
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

      const scriptList: string[] = [];

      htmlPaths.forEach((htmlPath) => {
        let html = (res.body as string)
          // /umi.js -> umi.js
          .replace(/\/umi\./g, 'umi.')
          // /@@/devscript.js -> hot-reload.js
          .replace(/\/@@/g, `${baseDevURL}/@@`);

        extractInlineScript(html).forEach((script) => {
          if (!scriptList.includes(script)) {
            scriptList.push(script);
          }
          html = html.replace(script, '');
        });

        html = html
          // 把第一个 script 替换为内联脚本
          .replace(
            '<script></script>',
            '<script src="inlineScript.js"></script>',
          )
          // 然后移除其他所有的内联脚本
          .replaceAll('<script></script>', '');

        // 写入 html
        fse.writeFileSync(htmlPath, html, 'utf-8');
      });

      // 将内联js 转为外部文件
      const inlineJSFile = join(paths.absOutputPath!, 'inlineScript.js');
      fse.writeFileSync(inlineJSFile, scriptList.join('\n').trim(), {
        encoding: 'utf8',
      });
    });
  };

  api.onDevCompileDone(saveDevHtml);
};
