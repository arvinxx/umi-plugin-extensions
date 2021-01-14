---
title: injected-script
order: 5
---

# injected-script

这里的`injected-script`是我给它取的，指的是通过 DOM 操作的方式向页面注入的一种 JS。为什么要把这种 JS 单独拿出来讨论呢？又或者说为什么需要通过这种方式注入 JS 呢？

这是因为`content-script`有一个很大的**缺陷**: 无法访问页面中的 JS，虽然它可以操作 DOM，但是 DOM 却不能调用它，也就是无法在 DOM 中通过绑定事件的方式调用`content-script`中的代码（包括直接写`onclick`和`addEventListener`2 种方式都不行），但是，“在页面上添加一个按钮并调用插件的扩展 API”是一个很常见的需求，那该怎么办呢？其实这就是本小节要讲的。

在`content-script`中通过 DOM 方式向页面注入`inject-script`代码示例：

```js
function injectCustomJs(jsPath) {
  jsPath = jsPath || 'js/inject.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function () {
    this.parentNode.removeChild(this);
  };
  document.head.appendChild(temp);
}
```

你以为这样就行了？执行一下你会看到如下报错：

```
Denying load of chrome-extension://efbllncjkjiijkppagepehoekjojdclc/js/inject.js. Resources must be listed in the web_accessible_resources manifest key in order to be loaded by pages outside the extension.
```

意思就是你想要在 web 中直接访问插件中的资源的话必须显示声明才行，配置文件中增加如下：

```json
{
  "web_accessible_resources": ["js/inject.js"]
}
```

至于`inject-script`如何调用`content-script`中的代码，后面我会在专门的一个消息通信章节详细介绍。
