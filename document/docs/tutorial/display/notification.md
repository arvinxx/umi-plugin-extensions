---
title: notifications 桌面通知
order: 8
---

# 桌面通知

Chrome 提供了一个`chrome.notifications`API 以便插件推送桌面通知，暂未找到`chrome.notifications`和 HTML5 自带的`Notification`的显著区别及优势。

在后台 JS 中，无论是使用`chrome.notifications`还是`Notification`都不需要申请权限（HTML5 方式需要申请权限），直接使用即可。

最简单的通知：

![](https://gw.alipayobjects.com/zos/antfincdn/7Wr2xl56Kj/68a54883-ede3-4fbf-82b5-437c8d756ad3.png)

代码：

```js
chrome.notifications.create(null, {
  type: 'basic',
  iconUrl: 'img/icon.png',
  title: '这是标题',
  message: '您刚才点击了自定义右键菜单！',
});
```

通知的样式可以很丰富：

![](https://gw.alipayobjects.com/zos/antfincdn/6ZTYq63OJb/4e9101f0-68f5-4f5f-adba-713a3692c459.png)

这个没有深入研究，有需要的可以去[官方文档](https://developer.chrome.com/extensions/notifications)查看更多细节。
