---
title: 动态注入
order: 1
group:
  order: 2
  title: 开发技巧
---

# 动态注入

## 动态注入或执行 JS

虽然在`background`和`popup`中无法直接访问页面 DOM，但是可以通过`chrome.tabs.executeScript`来执行脚本，从而实现访问 web 页面的 DOM（注意，这种方式也不能直接访问页面 JS）。

示例

```json
// manifest.json 配置
{
  "name": "动态JS注入演示",
  //...
  "permissions": ["tabs", "http:/*"]
  //...
}
```

```js
// JS 代码
chrome.tabs.executeScript(tabId, {
  code: 'document.body.style.backgroundColor="red"',
});
chrome.tabs.executeScript(tabId, { file: 'some-script.js' });
```

## 动态注入 CSS

示例

```json
// manifest.json
{
  "name": "动态CSS注入演示",
  //...
  "permissions": ["tabs", "http:/*"]
  //...
}
```

```js
// JS 代码
chrome.tabs.insertCSS(tabId, { code: 'xxx' });
chrome.tabs.insertCSS(tabId, { file: 'some-style.css' });
```

<Alert type="warning">
注入 CSS 的时候必须注意
</Alert>

由于通过`content_scripts`注入的 CSS 优先级非常高，几乎仅次于浏览器默认样式，稍不注意可能就会影响一些网站的展示效果，所以尽量不要写一些影响全局的样式。

之所以强调这个，是因为这个带来的问题非常隐蔽，不太容易找到，可能你正在写某个网页，昨天样式还是好好的，怎么今天就突然不行了？然后你辛辛苦苦找来找去，找了半天才发现竟然是因为插件里面的一个样式影响的！

![](http://res.haoji.me/blog/images/transparent.gif)
