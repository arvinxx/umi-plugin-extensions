# umi-plugin-extensions

[![NPM version][npm-image]][npm-url] ![NPM downloads][download-image]

[![Test CI status][test-ci]][test-ci-url] ![Deploy CI][deploy-ci] [![Coverage][coverage]][codecov-url]

<!-- npm url -->

[npm-image]: http://img.shields.io/npm/v/umi-plugin-extensions.svg?color=deepgreen&label=latest
[npm-url]: http://npmjs.org/package/umi-plugin-extensions
[download-image]: https://img.shields.io/npm/dm/umi-plugin-extensions.svg

<!-- coverage -->

[coverage]: https://codecov.io/gh/arvinxx/umi-plugin-extensions/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/arvinxx/umi-plugin-extensions/branch/master

<!-- Github CI -->

[test-ci]: https://github.com/ant-design/html2sketch/workflows/Test%20CI/badge.svg
[deploy-ci]: https://github.com/ant-design/html2sketch/workflows/Deploy%20CI/badge.svg
[test-ci-url]: https://github.com/ant-design/html2sketch/actions?query=workflow%3ATest%20CI
[deploy-ci-ci]: https://github.com/ant-design/html2sketch/actions?query=workflow%3ADeploy%20CI

用于开发 Chrome 插件的 umi 插件。

TODO List

- [ ] 说明文档
  - [ ] 基础指南
  - [ ] 插件开发教程
  - [ ] API 接口说明
  - [ ] 插件项目架构文档
- [ ] 单元测试

## 安装

```bash
npm i -D umi-plugin-extensions
```

或

```bash
yarn add -D umi-plugin-extensions
```

## 使用

🔔 请确保你对 Chrome 插件开发已经有基本的了解，入门教程：[Chrome 插件(扩展)开发全攻略](https://arvinxx.github.io/umi-plugin-extensions/#/tutorial)。

在 umi 配置文件 `cofig/config.ts` 或 `.umirc.ts` 中配置 `extensions` 。完整配置项说明请查阅[插件配置项文档](https://arvinxx.github.io/umi-plugin-extensions/#/api/interfaces/extensionsplugin-config)。

如需脚手架可使用 [Umi Chrome Extensions Template](https://github.com/arvinxx/umi-chrome-extensions-template)。

## 插件开发

如希望对本插件进行开发，可查阅 插件项目架构文档(TODO)

## License

[MIT](./LICENSE) ® Arvin Xu
