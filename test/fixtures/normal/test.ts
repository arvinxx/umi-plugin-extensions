
// @ts-ignore
export default async ({ page, host }) => {
  await page.goto(`${host}/`, {
    waitUntil: 'networkidle2',
  });
  const text = await page.evaluate(
    () => document.querySelector('h1')?.innerHTML,
  );
  expect(text).toEqual('hello umi');
};
