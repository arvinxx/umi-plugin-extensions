import type { IApi } from 'umi';
import DevHtmlGenerator from './devHtml';
import ManifestGenerator from './manifest';
import DevExtensionGenerator from './devExtension';

export * from './types';

export default (api: IApi) => {
  DevExtensionGenerator(api);

  DevHtmlGenerator(api);

  ManifestGenerator(api);
};
