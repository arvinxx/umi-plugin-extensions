import { createHash, randomBytes } from 'crypto';
import { IContentSecurityPolicy } from '../../types/PluginConfig';

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
}: IContentSecurityPolicy) => {
  const nonceList = nonce?.map((n) => `'nonce-${n}'`).join(' ');
  const inlineScriptList = inlineScript?.map((n) => `'${n}'`).join(' ');
  const urlList = url?.join(' ');

  const nonceStr = nonceList ? ' ' + nonceList : '';
  const inlineScriptStr = inlineScriptList ? ' ' + inlineScriptList : '';
  const urlStr = urlList ? ' ' + urlList : '';

  return `script-src 'self'${nonceStr}${inlineScriptStr}${urlStr}; object-src 'self'`;
};
