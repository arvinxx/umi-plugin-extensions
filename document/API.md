---
title: API 说明
order: 1
nav:
  title: API
  order: 2
---

# API 说明文件

本组接口文件均通过 [Typedoc](https://typedoc.org/) 自动生成。优点有两方面：

1. 文档内容与接口内容一一对应，实时更新，减少重复工作量；
2. 将注释写在类型定义文件后，生成的模块可以具有更加清晰的说明内容，进一步帮助开发；

通过 Typedoc 生成文件包含两类：

1. interfaces 接口文件；
2. modules 模块文件；

## Interfaces 接口文件

文件结构如下：

```
# 名称

## Hierarchy -> 继承关系

## Properties -> 属性

```

## Modules 模块文件

文件结构如下：

```
# 名称

## Index -> 索引

### Interfaces -> 接口

### Type aliases -> 类型别名

## Type Aliases 类型别名
```

其中，Interfaces 会列出该模块包含的所有接口，并链接至相应的接口文件
