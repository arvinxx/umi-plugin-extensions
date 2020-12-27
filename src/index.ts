import type { IApi } from 'umi';
import DevHtmlGenerator from './devHTML';
import ManifestGenerator from './manifest';
import DevExtensionGenerator from './base';
import Csp from './csp';

export * from './types';

export default (api: IApi) => {
  DevExtensionGenerator(api);

  DevHtmlGenerator(api);

  Csp(api);

  ManifestGenerator(api);
};
