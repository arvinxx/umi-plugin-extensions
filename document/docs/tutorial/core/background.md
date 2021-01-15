---
title: background
order: 3
---

# background

后台脚本，是一个常驻的页面，它的生命周期是插件中所有类型页面中最长的，它随着浏览器的打开而打开，随着浏览器的关闭而关闭，所以通常把需要一直运行的、启动就运行的、全局的代码放在 background 里面。

background 的权限非常高，几乎可以调用所有的 Chrome 扩展 API（除了 devtools），而且它可以无限制跨域，也就是可以跨域访问任何网站而无需要求对方设置`CORS`。

> 经过测试，其实不止是 background，所有的直接通过`chrome-extension://id/xx.html`这种方式打开的网页都可以无限制跨域。

配置中，`background`可以通过`page`指定一张网页，也可以通过`scripts`直接指定一个 JS，Chrome 会自动为这个 JS 生成一个默认的网页：

```json
{
  "background": {
    "page": "background.html"
  }
}
```

需要特别说明的是，虽然你可以通过`chrome-extension://xxx/background.html`直接打开后台页，但是你打开的后台页和真正一直在后台运行的那个页面不是同一个，换句话说，你可以打开无数个`background.html`，但是真正在后台常驻的只有一个，而且这个你永远看不到它的界面，只能调试它的代码。

## event-pages

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

<Alert type="warning">留意 Background 报错</Alert>

很多时候你发现你的代码会莫名其妙的失效，找来找去又找不到原因，这时打开 background 的控制台才发现原来某个地方写错了导致代码没生效，正式由于 background 报错的隐蔽性(需要主动打开对应的控制台才能看到错误)，所以特别注意这点。

在对 popup 页面审查元素的时候 popup 会被强制打开无法关闭，只有控制台关闭了才可以关闭 popup，原因很简单：如果 popup 关闭了控制台就没用了。这种方法在某些情况下很实用！
