import { join } from 'path';
import { Service } from 'umi';
import { readFileSync } from 'fs';

const fixtures = join(__dirname, './fixtures');

test('normal tmp', async () => {
  const cwd = join(fixtures, 'normal');
  const service = new Service({
    cwd,
    plugins: [require.resolve('./index')],
  });
  // 用于产生临时文件
  await service.run({
    name: 'g',
    args: {
      _: ['g', 'html'],
    },
  });

  const html = readFileSync(join(cwd, 'dist', 'index.html'), 'utf-8');
  expect(html).toContain('root');
});
