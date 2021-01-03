---
title: pageAction 地址栏右侧
order: 2
---

# pageAction 地址栏右侧

所谓`pageAction`，指的是只有当某些特定页面打开才显示的图标，它和`browserAction`最大的区别是一个始终都显示，一个只在特定情况才显示。

需要特别说明的是早些版本的 Chrome 是将 pageAction 放在地址栏的最右边，左键单击弹出 popup，右键单击则弹出相关默认的选项菜单：

![](https://gw.alipayobjects.com/zos/antfincdn/u3tWvYhh%26S/f9359b5f-63b6-40d4-a0a3-b04bd4821fcf.png)

而新版的 Chrome 更改了这一策略，pageAction 和普通的 browserAction 一样也是放在浏览器右上角，只不过没有点亮时是灰色的，点亮了才是彩色的，灰色时无论左键还是右键单击都是弹出选项：

![](https://gw.alipayobjects.com/zos/antfincdn/aMQY6nox8c/b23a816a-0062-4153-9049-588acb905e0d.png)

> 具体是从哪一版本开始改的没去仔细考究，反正知道 v50.0 的时候还是前者，v58.0 的时候已改为后者。

调整之后的`pageAction`我们可以简单地把它看成是可以置灰的`browserAction`。

- `chrome.pageAction.show(tabId)`: 显示图标；
- `chrome.pageAction.hide(tabId)`: 隐藏图标；

示例(只有打开百度才显示图标)：

配置:

```json
{
  "page_action": {
    "default_icon": "img/icon.png",
    "default_title": "我是pageAction",
    "default_popup": "popup.html"
  },
  "permissions": ["declarativeContent"]
}
```

实现:

```js
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'baidu.com' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
```

效果图：

![](http://image.liuxianan.com/201705/20170531_174018_541_0451.gif)
