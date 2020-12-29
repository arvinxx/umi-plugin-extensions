export default {
  target: 'node',
  entry: 'src/index.ts',
  cjs: { type: 'babel', lazy: true },
  disableTypeCheck: true,
};
