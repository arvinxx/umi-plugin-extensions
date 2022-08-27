import type { IApi, IRoute } from 'umi';

import { getRouteFromConfig, UIPageKeyMap } from '../utils';

/**
 * 将 umi 的配置修改成可以用于生成插件文件的状态
 * @param api
 */
export default (api: IApi) => {
  api.modifyConfig((config) => {
    // 需要将页面按照 mpa 进行打包输出
    config.mpa = {};

    // 导出的 HTML 路由需要带 html 后缀
    config.exportStatic = {
      htmlSuffix: true,
    };

    const extension = <extensionsPlugin.Config>config.extensions;

    const { optionsUI, popupUI } = extension;

    // 插入 routes
    const optionRoute = getRouteFromConfig(optionsUI, '/options');
    const popUpRoute = getRouteFromConfig(popupUI, '/');

    const extensionRoutes = [optionRoute, popUpRoute].filter(
      (i) => i,
    ) as IRoute[];

    if (config.routes) {
      config.routes = config.routes.concat(extensionRoutes);
    } else {
      config.routes = extensionRoutes;
    }
    // 为替换 manifest 的 page 做准备
    if (optionRoute) {
      UIPageKeyMap.option.output = 'options.html';
    }
    if (popUpRoute) {
      UIPageKeyMap.popup.output = 'index.html';
    }

    config.devServer = {
      ...config.devServer,

      // 将插件所需的文件全部写入到 dist 目录
      writeToDisk: (filePath: string) => {
        const isHotUpdateFile = filePath.match(/hot-update\.js.*/);
        return !isHotUpdateFile;
      },
    };

    return config;
  });
};
