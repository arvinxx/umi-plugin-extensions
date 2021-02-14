# umi-plugin-extensions

[![NPM version][npm-image]][npm-url] ![NPM downloads][download-image] [![semantic-release][semantic-release]][semantic-release-repo] ![][license-url]

[![Test CI status][test-ci]][test-ci-url] [![Release CI][release-ci]][deploy-ci-url] [![Coverage][coverage]][codecov-url]

[license-url]: https://img.shields.io/github/license/arvinxx/umi-plugin-develop-template

<!-- npm url -->

[npm-image]: http://img.shields.io/npm/v/umi-plugin-extensions.svg?color=deepgreen&label=latest
[npm-url]: http://npmjs.org/package/umi-plugin-extensions
[download-image]: https://img.shields.io/npm/dm/umi-plugin-extensions.svg

<!-- coverage -->

[coverage]: https://codecov.io/gh/arvinxx/umi-plugin-extensions/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/arvinxx/umi-plugin-extensions/branch/master

<!-- Github CI -->

[test-ci]: https://github.com/arvinxx/umi-plugin-extensions/workflows/Test%20CI/badge.svg
[release-ci]: https://github.com/arvinxx/umi-plugin-extensions/workflows/Release%20CI/badge.svg
[test-ci-url]: https://github.com/arvinxx/umi-plugin-extensions/actions?query=workflow%3A%22Test+CI%22
[deploy-ci-url]: https://github.com/arvinxx/umi-plugin-extensions/actions?query=workflow%3A%22Release+CI%22

<!-- semantic-release -->

[semantic-release]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-repo]: https://github.com/semantic-release/semantic-release

用于开发 Chrome 插件的 umi 插件。

## 安装

```bash
npm i -D umi-plugin-extensions
```

或

```bash
yarn add -D umi-plugin-extensions
```

## 使用

🔔 请确保你对 Chrome 插件开发已经有基本的了解，入门教程：[Chrome 插件(扩展)开发全攻略](https://umi-plugin-extensions.vercel.app/tutorial)。

在 umi 配置文件 `cofig/config.ts` 或 `.umirc.ts` 中配置 `extensions` 。完整配置项说明请查阅[插件配置项文档](https://umi-plugin-extensions.vercel.app/api/interfaces/extensionsplugin-config)。

如需脚手架可使用 [Umi Chrome Extensions Template](https://github.com/arvinxx/umi-chrome-extensions-template)。

## 插件开发

如希望对本插件进行开发，可查阅 插件项目架构文档(TODO)

## TODO List

- [ ] 说明文档
  - [ ] 基础指南
  - [ ] 插件开发教程
  - [ ] API 接口说明
  - [ ] 插件项目架构文档
- [ ] 单元测试

## License

[MIT](./LICENSE) ® Arvin Xu
