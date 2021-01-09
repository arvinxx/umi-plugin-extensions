---
title: 对比分析
order: 5
toc: menu
---

# 对比分析

Chrome 插件的 JS 主要可以分为这 5 类：`injected script`、`content-script`、`popup js`、`background js`和`devtools js`，

## 权限对比

| JS 种类 | 可访问的 API | DOM 访问情况 | JS 访问情况 | 直接跨域 |
| --- | --- | --- | --- | --- |
| injected script | 和普通 JS 无任何差别，不能访问任何扩展 API | ✅ | ✅ | ⛔️ |
| content script | 只能访问 extension、runtime 等部分 API | ✅ | ⛔ | ⛔ |
| popup js | 可访问绝大部分 API，除了 devtools 系列 | 不可直接访问 | ⛔ | ✅ |
| background js | 可访问绝大部分 API，除了 devtools 系列 | 不可直接访问 | ⛔ | ✅ |
| devtools js | 只能访问 devtools、extension、runtime 等部分 API | ✅ | ✅ | ⛔ |

## 调试方式对比

| JS 类型 | 调试方式 | 图片说明 |
| --- | --- | --- |
| injected script | 直接普通的 F12 即可 | - |
| content-script | 打开 Console,如图切换 | ![](https://gw.alipayobjects.com/zos/antfincdn/9U9WuAniFk/5c09b586-b95a-4f27-8bf6-23abbe44478c.png) |
| popup-js | popup 页面右键审查元素 | ![](https://gw.alipayobjects.com/zos/antfincdn/yi7n%24b0bfV/072c7bee-f9e0-43df-8c74-bf7840366aa9.png) |
| background | 插件管理页点击背景页即可 | ![](https://gw.alipayobjects.com/zos/antfincdn/9TBFyLrSHY/f78a7c71-a9f5-4bab-9e6c-3ca7f60829a4.png) |
| devtools-js | 暂未找到有效方法 | - |
