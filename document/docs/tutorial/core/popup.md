---
title: popup
order: 4
---

# popup

`popup`是点击`browser_action`或者`page_action`图标时打开的一个小窗口网页，焦点离开网页就立即关闭，一般用来做一些临时性的交互。

![](http://res.haoji.me/blog/images/transparent.gif)

`popup`可以包含任意你想要的 HTML 内容，并且会自适应大小。可以通过`default_popup`字段来指定 popup 页面，也可以调用`setPopup()`方法。

配置方式：

```json
{
  "browser_action": {
    "default_icon": "img/icon.png",
    "default_title": "这是一个示例Chrome插件",
    "default_popup": "popup.html"
  }
}
```

![](http://res.haoji.me/blog/images/transparent.gif)

需要特别注意的是，由于单击图标打开 `popup`，焦点离开又立即关闭，所以 `popup` 页面的生命周期一般很短，需要长时间运行的代码千万不要写在 `popup` 里面。

在权限上，它和 `background` 非常类似，它们之间最大的不同是生命周期的不同，`popup` 中可以直接通过 `chrome.extension.getBackgroundPage()` 获取 `background` 的 `window` 对象。
