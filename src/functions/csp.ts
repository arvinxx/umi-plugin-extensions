import type { IApi } from 'umi';
import { join } from 'path';
import { uniq } from 'lodash';

import fse from 'fs-extra';
import { CSPKeyMap, getCSPHashFromScript, updateCSP } from '../utils';

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
  const filepath = join(paths.absOutputPath!, 'manifest.json');

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
  const writeInlineScriptHash = async () => {
    await getCSPHashFromScript(paths.absOutputPath);

    // 将 script 写入 manifest 中
    const manifest = fse.readFileSync(filepath, { encoding: 'utf8' });

    fse.writeFileSync(filepath, updateCSP(manifest));
  };

  // Dev 下需要
  api.onDevCompileDone(writeInlineScriptHash);

  // build 下也需要
  api.onBuildComplete(writeInlineScriptHash);
};
