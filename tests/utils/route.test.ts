import { getRouteFromConfig } from '../../src/utils';

describe('getRouteFromConfig', () => {
  it('with page', () => {
    expect(
      getRouteFromConfig(
        {
          page: '@/pages/index',
        },
        '/popup',
      ),
    ).toEqual({
      component: '@/pages/index',
      exact: true,
      path: '/popup',
    });
  });
  it('irregular', () => {
    // @ts-ignore
    expect(getRouteFromConfig(123, '/popup')).toBeUndefined();
  });
  it('with string', () => {
    expect(getRouteFromConfig('@/pages/hello', '/hello')).toEqual({
      component: '@/pages/hello',
      exact: true,
      path: '/hello',
    });
  });
});
