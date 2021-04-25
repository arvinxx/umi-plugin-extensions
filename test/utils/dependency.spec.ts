import { getDependencyPath } from '../../src/utils';

describe('getDependencyPath', () => {
  it('base', () => {
    expect(getDependencyPath('jquery')).toEqual(
      process.cwd() + '/node_modules/jquery',
    );
  });
  it('with cwd', () => {
    expect(getDependencyPath('jquery', '/hhh')).toEqual(
      '/hhh/node_modules/jquery',
    );
  });
  it('not modules', () => {
    expect(getDependencyPath('@/jquery')).toEqual('@/jquery');
    expect(getDependencyPath('./jquery')).toEqual('./jquery');
  });
});
