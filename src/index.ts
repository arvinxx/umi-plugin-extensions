import type { IApi } from 'umi';
import {
  DevHTML,
  ConfigSchema,
  ManifestGenerator,
  Base,
  UIPath,
  Background,
  onStart,
  ContentScripts,
  HotReload,
} from './functions';

export default (api: IApi) => {
  // 将 umi 的基础配置修改成适配插件开发的模式
  Base(api);

  // 配置 config 的 schema
  ConfigSchema(api);

  // 生成开发所需的 html 文件
  DevHTML(api);

  // dev 时第一次生成 manifest 的处理方法
  onStart(api);

  // 生成 manifest 配置文件
  ManifestGenerator(api);

  // 将 manifest 中 UI 的中间路径替换成最终生成的路径
  UIPath(api);

  // 处理 background 脚本
  Background(api);

  // 处理 content scripts 脚本
  ContentScripts(api);

  // 处理脚本的自动更新
  HotReload(api);
};
