import fse from 'fs-extra';
import * as path from 'path';

import {
  getCSPScript,
  getScriptSHA,
  extractInlineScript,
} from '../../src/utils';

describe('getScriptSHA', () => {
  it('case1', () => {
    expect(
      getScriptSHA('\n' + '      window.routerBase = "/";\n' + '    '),
    ).toEqual('YM8uI2F+VfHULiDF1T+UCYmPwssvvWleyz5k2gtmTQo=');
  });
  it('case2', () => {
    expect(
      getScriptSHA(`
      //! umi version: 3.3.3
    `),
    ).toEqual('g3hjaXGjDuIE5N9wBAzFtJfpVSr27ys0zwyijmBdiL0=');
  });
});

test('extractInlineScript', () => {
  const html = fse.readFileSync(path.join(__dirname, './test.html'), {
    encoding: 'utf8',
  });
  expect(extractInlineScript(html)).toEqual([
    `
      window.routerBase = "/";
    `,
    `
      //! umi version: 3.3.3
    `,
  ]);
});

describe('getCSPScript', () => {
  it('空对象', () => {
    expect(
      getCSPScript({
        nonce: [],
        inlineScript: [],
        url: [],
      }),
    ).toEqual("script-src 'self'; object-src 'self'");
  });
  it('有一个', () => {
    expect(
      getCSPScript({
        nonce: ['123'],
        inlineScript: ['hello'],
        url: ['http://localhost:8000'],
      }),
    ).toEqual(
      "script-src 'self' 'nonce-123' 'hello' http://localhost:8000; object-src 'self'",
    );
  });
  it('多个', () => {
    expect(
      getCSPScript({
        nonce: ['123', '535'],
        inlineScript: ['hello', '23'],
        url: ['http://localhost:8000', 'http://localhost:801'],
      }),
    ).toEqual(
      "script-src 'self' 'nonce-123' 'nonce-535' 'hello' '23' http://localhost:8000 http://localhost:801; object-src 'self'",
    );
  });
});
