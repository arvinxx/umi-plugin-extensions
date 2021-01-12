import type { IApi } from 'umi';
import { join } from 'path';
import { uniq } from 'lodash';

import fse from 'fs-extra';
import {
  CSPKeyMap,
  extractInlineScript,
  getScriptSHA,
  UIPageKeyMap,
} from '../utils';

/**
 * 处理 Chrome 的内容安全政策(CSP)相关的问题
 * @param api
 *
 * @description
 * 由于 umi 打出来的 html 包含了若干个内联的 script
 * 因此必须将这三个内联的 script 的 hash 添加到
 * content_security_policy 参数中
 */
export default (api: IApi) => {
  const { paths } = api.service;

  // 在配置项中注入该钩子字符串
  api.modifyConfig((config) => {
    const { contentSecurityPolicy } = <extensionsPlugin.Config>(
      config.extensions
    );
    contentSecurityPolicy.inlineScript.push(CSPKeyMap.key);
    return config;
  });

  /**
   * 写入 inline script 的 hash
   */
  const done = () => {
    // 分别处理 popup 和 options 的 html 文件
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
      const html = fse.readFileSync(htmlPath, { encoding: 'utf-8' });

      // 将 html 中的 inlineScript 全部记录到 inlineScriptSHAList 中
      extractInlineScript(html).forEach((script) => {
        scriptList.push(getScriptSHA(script));
      });
    });

    // 待写入的 hash 字符串
    const scriptStr = uniq<string>(scriptList)
      .map((s) => `sha256-${s}`)
      .join("' '");

    // 将 script 写入 manifest 中
    const manifestFile = join(paths.absOutputPath!, 'manifest.json');
    let manifest = fse.readFileSync(manifestFile, { encoding: 'utf8' });
    manifest = manifest.replace(CSPKeyMap.key, scriptStr);
    fse.writeFileSync(manifestFile, manifest);
  };

  // Dev 下需要
  // build 下也需要
  api.onDevCompileDone(done);
  api.onBuildComplete(done);
};
