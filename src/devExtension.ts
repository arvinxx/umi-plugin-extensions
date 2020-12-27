import type { IApi } from 'umi';

/**
 * 开发阶段生成相应的开发用 html 文件
 * @param api
 */
export default (api: IApi) => {
  api.modifyConfig((config) => {
    /**
     * 将页面按照 mpa 进行打包输出
     */
    config.mpa = {};

    config.devServer = {
      ...config.devServer,
      // 将插件所需的文件全部写入到 dist 目录
      writeToDisk: (filePath) => {
        const isUmiFile = filePath.match(/umi\./);
        const isHotUpdateFile = filePath.match(/hot-update\.json/);

        return !(isUmiFile || isHotUpdateFile);
      },
    };

    return config;
  });
};
