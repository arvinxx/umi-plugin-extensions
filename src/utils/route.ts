import { IRoute } from 'umi';

/**
 * 从插件的配置项中提取 Route
 * @param config
 * @param url
 */
export const getRouteFromConfig = (
  config: string | { page: string },
  url: string,
) => {
  let route: IRoute = {};
  switch (typeof config) {
    case 'string':
      route = {
        path: url,
        exact: true,
        component: config,
      };
      break;
    case 'object':
      route = {
        path: url,
        exact: true,
        component: config.page,
      };
      break;
    default:
  }

  return route;
};
