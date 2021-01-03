---
title: 基础教程
order: 1
toc: menu
---

> 转载自: [【干货】Chrome 插件(扩展)开发全攻略](http://blog.liuxianan.com/chrome-plugin-develop.html)

![](https://gw.alipayobjects.com/zos/antfincdn/Hec2qkSYYS/401070bb-64b4-4f95-8ff1-5641e0634b39.png)

# Chrome 插件基础教程

## 什么是 Chrome 插件

严格来讲，我们正在说的东西应该叫 Chrome 扩展(`Chrome Extension`)，真正意义上的 Chrome 插件是更底层的浏览器功能扩展，可能需要对浏览器源码有一定掌握才有能力去开发。鉴于 Chrome 插件的叫法已经习惯，本文也全部采用这种叫法，但读者需深知本文所描述的 Chrome 插件实际上指的是 Chrome 扩展。

Chrome 插件是一个用 Web 技术开发、用来增强浏览器功能的软件，它其实就是一个由 HTML、CSS、JS、图片等资源组成的一个[.crx](https://developer.chrome.com/extensions/crx)后缀的压缩包.

`crx`可能是`Chrome Extension`如下 3 个字母的简写：

![](https://gw.alipayobjects.com/zos/antfincdn/vr97m9dRxS/310b0c9b-f16c-4bfb-a509-97cef1ed47fb.png)

另外，其实不只是前端技术，Chrome 插件还可以配合 C++编写的 dll 动态链接库实现一些更底层的功能(NPAPI)，比如全屏幕截图。

![](https://gw.alipayobjects.com/zos/antfincdn/a3irwk3Wwp/3ed42bc4-07c2-42d0-ae89-607c5929ee59.png)

> 由于安全原因，Chrome 浏览器 42 以上版本已经陆续不再支持 NPAPI 插件，取而代之的是更安全的 PPAPI。

## 学习 Chrome 插件开发有什么意义

增强浏览器功能，轻松实现属于自己的“定制版”浏览器，等等。

Chrome 插件提供了很多实用 API 供我们使用，包括但不限于：

- 书签控制；
- 下载控制；
- 窗口控制；
- 标签控制；
- 网络请求控制，各类事件监听；
- 自定义原生菜单；
- 完善的通信机制；
- 等等；

## 为什么是 Chrome 插件而不是 Firefox 插件

1.  Chrome 占有率更高，更多人用；
2.  开发更简单；
3.  应用场景更广泛，Firefox 插件只能运行在 Firefox 上，而 Chrome 除了 Chrome 浏览器之外，还可以运行在所有 webkit 内核的国产浏览器，比如 360 极速浏览器、360 安全浏览器、搜狗浏览器、QQ 浏览器等等；
4.  除此之外，Firefox 浏览器也对 Chrome 插件的运行提供了一定的支持；

Chrome 插件没有严格的项目结构要求，只要保证本目录有一个`manifest.json`即可，也不需要专门的 IDE，普通的 web 开发工具即可。

从右上角菜单->更多工具->扩展程序可以进入 插件管理页面，也可以直接在地址栏输入 [chrome://extensions](chrome://extensions/) 访问。

![](https://gw.alipayobjects.com/zos/antfincdn/1TdzkAP%242g/764de3f6-13a3-42bf-9538-2feb747080ad.png)

勾选`开发者模式`即可以文件夹的形式直接加载插件，否则只能安装`.crx`格式的文件。Chrome 要求插件必须从它的 Chrome 应用商店安装，其它任何网站下载的都无法直接安装，所以，其实我们可以把`crx`文件解压，然后通过开发者模式直接加载。

开发中，代码有任何改动都必须重新加载插件，只需要在插件管理页按下`Ctrl+R`即可，以防万一最好还把页面刷新一下。
