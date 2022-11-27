import type { IApi } from 'umi';

/**
 * 将 umi 的配置修改成可以用于生成插件文件的状态
 * @param api
 */
export default (api: IApi) => {
  // 需要将页面按照 mpa 进行打包输出
  api.modifyConfig((config) => {
    return {
      ...config,
      mpa: {},
      mfsu: false,
      writeToDisk: true,
      codeSplitting: false,
    };
  });
};
