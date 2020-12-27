import { createHash, randomBytes } from 'crypto';
import { IContentSecurityPolicy } from '../types';

/**
 * 从 html 提取 script 并生成 sha 代码
 */
export const getScriptSha = (script: string) => {
  return createHash('sha256').update(script, 'utf8').digest('base64');
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

export const getNonce = () => randomBytes(8).toString('hex');

export const nonceList = [...new Array(3).keys()].map(getNonce);
