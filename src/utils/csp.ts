import { createHash } from 'crypto';
import { join } from 'path';
import fse from 'fs-extra';
import { uniq } from 'lodash';
import { CSPKeyMap, UIPageKeyMap } from './manifest';
import got from 'got';
import { baseDevURL } from './env';

/**
 * 从 html 提取 script 并生成 sha 代码
 */
export const getScriptSHA = (script: string) => {
  return createHash('sha256').update(script, 'utf8').digest('base64');
};

export const inlineScriptSHAList: string[] = [];

/**
 * 从 HTML 中提取 Inline Script
 * @param html
 */
export const extractInlineScript = (html: string) => {
  const regex = /(?<=<script>)(?<script>.*\n\s*.*\s*)(?=<\/script>)/gm;
  const res = html.match(regex);
  const arr: string[] = [];
  if (res && res.length > 0) {
    res.forEach((script) => {
      arr.push(script);
    });
  }
  return arr;
};

/**
 * 生成 CSP 脚本
 * @param nonce
 * @param url
 * @param inlineScript
 */
export const getCSPScript = ({
  nonce,
  url,
  inlineScript,
}: extensionsPlugin.ContentSecurityPolicy) => {
  const nonceList = nonce?.map((n) => `'nonce-${n}'`).join(' ');
  const inlineScriptList = inlineScript?.map((n) => `'${n}'`).join(' ');
  const urlList = url?.join(' ');

  const nonceStr = nonceList ? ` ${nonceList}` : '';
  const inlineScriptStr = inlineScriptList ? ` ${inlineScriptList}` : '';
  const urlStr = urlList ? ` ${urlList}` : '';

  return `script-src 'self'${nonceStr}${inlineScriptStr}${urlStr}; object-src 'self'`;
};

/**
 * 整合方法 从 script 中获取 hash
 * @param path
 */
export const getCSPHashFromScript = async (path: string | undefined) => {
  // 分别处理 popup 和 options 的 html 文件
  const { option, popup } = UIPageKeyMap;
  const htmlPaths: string[] = [];

  if (option.output !== '') {
    htmlPaths.push(option.output);
  }
  if (popup.output !== '') {
    htmlPaths.push(popup.output);
  }

  const scriptList: string[] = [];

  const promiseArr = htmlPaths.map((url: string) =>
    got(`${baseDevURL}/${url}`)
      .then(() => {
        const html = fse.readFileSync(join(path!, url), { encoding: 'utf-8' });

        // 将 html 中的 inlineScript 全部记录到 inlineScriptSHAList 中
        extractInlineScript(html).forEach((script) => {
          console.log(script);
          scriptList.push(getScriptSHA(script));
        });
      })
      .catch((e) => {
        console.log(e);
      }),
  );

  await Promise.all(promiseArr);

  // 待写入的 hash 字符串
  const scriptStr = uniq<string>(scriptList)
    .map((s) => `sha256-${s}`)
    .join("' '");

  CSPKeyMap.output = scriptStr;
  return scriptStr;
};
