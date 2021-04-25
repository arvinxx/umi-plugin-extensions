export default {
  history: {
    type: 'memory',
  },
  plugins: [require.resolve('../../../lib')],
  extensions: {
    contentScripts: [
      {
        matches: ['*'],
        entries: ['@/contentScripts/index'],
      },
    ],
  },
};
