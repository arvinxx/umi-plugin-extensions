import { IRoute } from 'umi';

/**
 * 从插件的配置项中提取 Route
 * @param config
 * @param url
 */
export const getRouteFromConfig = (
  config: string | { page: string },
  url: string,
): IRoute | undefined => {
  switch (typeof config) {
    case 'string':
      return {
        path: url,
        exact: true,
        component: config,
      };
    case 'object':
      return {
        path: url,
        exact: true,
        component: config.page,
      };
    default:
      return;
  }
};
