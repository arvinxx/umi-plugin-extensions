import { getCSPScript } from '../src/utils';

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
