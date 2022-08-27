export default {
  history: {
    type: 'memory',
  },
  mountElementId: '',
  plugins: [require.resolve('../../../lib')],
  extensions: {
    name: 'Umi Extension Plugin',
    description: '用于 Chrome 插件开发的 Umi 插件',
    manifestVersion: 2,
    minimumChromeVersion: '80',
    icons: {
      16: 'logo/logo@16.png',
      32: 'logo/logo@32.png',
      48: 'logo/logo@48.png',
      128: 'logo/logo@128.png',
    },
    permissions: ['http://*/*', 'https://*/*'],
    background: {
      service_worker: '@/background/index',
    },
    contentScripts: [
      {
        matches: ['*'],
        entries: ['@/contentScripts/index'],
      },
    ],
    extends: {
      web_accessible_resources: ['*'],
    },
  },
};
