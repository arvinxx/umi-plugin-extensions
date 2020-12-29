---
title: 配置项
---

# 配置项

## 基础配置

### name

插件名称

### version

版本号

### description

描述文档

### manifestVersion

`manifest.json` 版本号,默认为 2

### minimumChromeVersion

最低 Chrome 版本号

### permissions

类型: `string[]`

## 交互配置

#### background

{ scripts: stringArr, persistent: boolean }

### popupUI

`string| { page: string, title?: string, icon: iconSchema, type: 'browserAction'| 'pageAction', }, icons: iconSchema }`

### optionsUI

string | { page: string().required(), openInTab: boolean(), }

## 安全配置

### contentSecurityPolicy

CSP 配置项

#### nonce

#### inlineScript

#### url
