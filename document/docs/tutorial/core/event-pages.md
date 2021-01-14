---
title: event-pages
order: 4
---

# event-pages

这里顺带介绍一下[event-pages](https://developer.chrome.com/extensions/event_pages)，它是一个什么东西呢？鉴于 `background` 生命周期太长，长时间挂载后台可能会影响性能，所以 Google 又弄一个`event-pages`，在配置文件上，它与 background 的唯一区别就是多了一个`persistent`参数：

```json
{
  "background": {
    "scripts": ["event-page.js"],
    "persistent": false
  }
}
```

它的生命周期是：在被需要时加载，在空闲时被关闭，什么叫被需要时呢？比如第一次安装、插件更新、有 content-script 向它发送消息，等等。

除了配置文件的变化，代码上也有一些细微变化，个人这个简单了解一下就行了，一般情况下 background 也不会很消耗性能的。

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

需要特别注意的是，由于单击图标打开 popup，焦点离开又立即关闭，所以 popup 页面的生命周期一般很短，需要长时间运行的代码千万不要写在 popup 里面。

在权限上，它和 background 非常类似，它们之间最大的不同是生命周期的不同，popup 中可以直接通过`chrome.extension.getBackgroundPage()`获取 background 的 window 对象。
