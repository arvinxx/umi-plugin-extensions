import type { IApi } from 'umi';
import { join } from 'path';
import fse from 'fs-extra';
import { extractInlineScript, getScriptSHA } from './utils';
import { ExtensionManifest } from './types';

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

  // TODO: 分别处理 popup 和 options
  const htmlPath = join(paths.absOutputPath!, 'index.html');

  // 为替换文本准备的钩子字符串
  const __TO_REPLACE_INLINE_SCRIPT__ = '__TO_REPLACE_INLINE_SCRIPT__';

  // 在配置项中注入该钩子字符串
  api.modifyConfig((config) => {
    const { contentSecurityPolicy } = config.extension as ExtensionManifest;
    contentSecurityPolicy.inlineScript.push(__TO_REPLACE_INLINE_SCRIPT__);
    return config;
  });

  /**
   * 写入 inline script 的 hash
   */
  const writeInlineScriptHash = () => {
    const html = fse.readFileSync(htmlPath, { encoding: 'utf-8' });

    const scriptList: string[] = [];

    // 将 html 中的 inlineScript 全部记录到 inlineScriptSHAList 中
    extractInlineScript(html).forEach((script) => {
      scriptList.push(getScriptSHA(script));
    });
    // 待写入的 hash 字符串
    const scriptStr = scriptList.map((s) => `sha256-${s}`).join("' '");

    // 将 script 写入 manifest 中
    const manifestFile = join(paths.absOutputPath!, 'manifest.json');
    const manifest = fse.readJsonSync(manifestFile);
    manifest.content_security_policy = manifest.content_security_policy.replace(
      __TO_REPLACE_INLINE_SCRIPT__,
      scriptStr,
    );
    fse.writeJSONSync(manifestFile, manifest);
  };

  // Dev 下需要
  api.onDevCompileDone(writeInlineScriptHash);

  // build 下也需要
  api.onBuildComplete(writeInlineScriptHash);
};
