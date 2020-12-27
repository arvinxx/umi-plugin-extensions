import type { IApi } from 'umi';
import DevHTML from './devHTML';
import Manifest from './manifest';
import Base from './base';
import PluginConfig from './pluginConfig';
import CSP from './csp';

export * from './types';

export default (api: IApi) => {
  PluginConfig(api);

  Base(api);

  DevHTML(api);

  Manifest(api);

  CSP(api);
};
