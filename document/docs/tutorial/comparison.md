---
title: 对比分析
order: 5
toc: menu
---

# 对比分析

## 权限对比

| JS 种类 | 可访问的 API | DOM 访问情况 | JS 访问情况 | 直接跨域 |
| --- | --- | --- | --- | --- |
| injected script | 和普通 JS 无任何差别，不能访问任何扩展 API | 可以访问 | 可以访问 | 不可以 |
| content script | 只能访问 extension、runtime 等部分 API | 可以访问 | 不可以 | 不可以 |
| popup js | 可访问绝大部分 API，除了 devtools 系列 | 不可直接访问 | 不可以 | 可以 |
| background js | 可访问绝大部分 API，除了 devtools 系列 | 不可直接访问 | 不可以 | 可以 |
| devtools js | 只能访问 devtools、extension、runtime 等部分 API | 可以 | 可以 | 不可以 |

## 调试方式对比

| JS 类型 | 调试方式 | 图片说明 |
| --- | --- | --- |
| injected script | 直接普通的 F12 即可 | 懒得截图 |
| content-script | 打开 Console,如图切换 | ![](http://res.haoji.me/blog/images/transparent.gif) |

| | popup-js | popup 页面右键审查元素 | ![](http://res.haoji.me/blog/images/transparent.gif) | | background | 插件管理页点击背景页即可 | ![](http://res.haoji.me/blog/images/transparent.gif) | | devtools-js | 暂未找到有效方法 | \- |

通信主页：[https://developer.chrome.com/extensions/messaging](https://developer.chrome.com/extensions/messaging)

前面我们介绍了 Chrome 插件中存在的 5 种 JS，那么它们之间如何互相通信呢？下面先来系统概况一下，然后再分类细说。需要知道的是，popup 和 background 其实几乎可以视为一种东西，因为它们可访问的 API 都一样、通信机制一样、都可以跨域。
