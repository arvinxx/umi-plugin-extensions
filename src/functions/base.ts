import type { IApi } from 'umi';

import { UIPageKeyMap } from '../utils';

/**
 * 将 umi 的配置修改成可以用于生成插件文件的状态
 * @param api
 */
export default (api: IApi) => {
  api.modifyConfig((config) => {
    // 需要将页面按照 mpa 进行打包输出
    config.mpa = {
      getConfigFromEntryFile: true,
    };

    const extension = <extensionsPlugin.Config>config.extensions;

    const { optionsUI, popupUI } = extension;

    // // 为替换 manifest 的 page 做准备
    if (optionsUI) {
      UIPageKeyMap.option.output = 'options.html';
    }
    if (popupUI) {
      UIPageKeyMap.popup.output = 'popup.html';
    }

    return config;
  });
};
