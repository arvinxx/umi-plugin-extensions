---
title: 核心概念
order: 3
toc: menu
---

# 核心概念

## manifest.json

这是一个 Chrome 插件最重要也是必不可少的文件，用来配置所有和插件相关的配置，必须放在根目录。其中，`manifest_version`、`name`、`version`3 个是必不可少的，`description`和`icons`是推荐的。

下面给出的是一些常见的配置项，完整的配置文档可以查看 [官方文档](https://developer.chrome.com/extensions/manifest) 。同时本插件提供了 [Manifest 类型说明文档](/api/modules/chromemanifest) 供快速查阅。

```json
{
  "manifest_version": 2,
  "name": "demo",
  "version": "1.0.0",
  "description": "简单的Chrome扩展demo",
  "icons": {
    "16": "img/icon.png",
    "48": "img/icon.png",
    "128": "img/icon.png"
  },
  "background": {
    "page": "background.html"
  },
  "browser_action": {
    "default_icon": "img/icon.png",
    "default_title": "这是一个示例Chrome插件",
    "default_popup": "popup.html"
  },

  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["js/jquery-1.8.3.js", "js/content-script.js"],
      "css": ["css/custom.css"],
      "run_at": "document_start"
    },
    {
      "matches": ["*:/*.jpg", "*:/*.bmp"],
      "js": ["js/show-image-content-size.js"]
    }
  ],
  "permissions": [
    "contextMenus",
    "tabs",
    "notifications",
    "webRequest",
    "webRequestBlocking",
    "storage",
    "http:/*"
  ],
  "web_accessible_resources": ["js/inject.js"],
  "homepage_url": "[https://www.baidu.com](https://www.baidu.com/)",
  "chrome_url_overrides": {
    "newtab": "newtab.html"
  },
  "options_page": "options.html",
  "options_ui": {
    "page": "options.html",
    "chrome_style": true
  },
  "omnibox": { "keyword": "go" },
  "default_locale": "zh_CN",
  "devtools_page": "devtools.html"
}
```

`matches`的语法参考：[https://developer.chrome.com/extensions/match_patterns](https://developer.chrome.com/extensions/match_patterns)

## content-scripts

所谓[content-scripts](https://developer.chrome.com/extensions/content_scripts)，其实就是 Chrome 插件中向页面注入脚本的一种形式（虽然名为 script，其实还可以包括 css 的），借助`content-scripts`我们可以实现通过配置的方式轻松向指定页面注入 JS 和 CSS（如果需要动态注入，可以参考下文），最常见的比如：广告屏蔽、页面 CSS 定制，等等。

示例配置：

```json
{
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["js/jquery-1.8.3.js", "js/content-script.js"],
      "css": ["css/custom.css"],
      "run_at": "document_start"
    }
  ]
}
```

特别注意，如果没有主动指定`run_at`为`document_start`（默认为`document_idle`），下面这种代码是不会生效的：

```js
document.addEventListener('DOMContentLoaded', function () {
  console.log('我被执行了！');
});
```

`content-scripts`和原始页面共享 DOM，但是不共享 JS，如要访问页面 JS（例如某个 JS 变量），只能通过`injected js`来实现。`content-scripts`不能访问绝大部分`chrome.xxx.api`，除了下面这 4 种：

- chrome.extension(getURL , inIncognitoContext , lastError , onRequest , sendRequest)
- chrome.i18n
- chrome.runtime(connect , getManifest , getURL , id , onConnect , onMessage , sendMessage)
- chrome.storage

其实看到这里不要悲观，这些 API 绝大部分时候都够用了，非要调用其它 API 的话，你还可以通过通信来实现让 background 来帮你调用（关于通信，后文有详细介绍）。

好了，Chrome 插件给我们提供了这么强大的 JS 注入功能，剩下的就是发挥你的想象力去玩弄浏览器了。

## background

后台（姑且这么翻译吧），是一个常驻的页面，它的生命周期是插件中所有类型页面中最长的，它随着浏览器的打开而打开，随着浏览器的关闭而关闭，所以通常把需要一直运行的、启动就运行的、全局的代码放在 background 里面。

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

这里顺带介绍一下[event-pages](https://developer.chrome.com/extensions/event_pages)，它是一个什么东西呢？鉴于 background 生命周期太长，长时间挂载后台可能会影响性能，所以 Google 又弄一个`event-pages`，在配置文件上，它与 background 的唯一区别就是多了一个`persistent`参数：

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

## injected-script

这里的`injected-script`是我给它取的，指的是通过 DOM 操作的方式向页面注入的一种 JS。为什么要把这种 JS 单独拿出来讨论呢？又或者说为什么需要通过这种方式注入 JS 呢？

这是因为`content-script`有一个很大的“缺陷”，也就是无法访问页面中的 JS，虽然它可以操作 DOM，但是 DOM 却不能调用它，也就是无法在 DOM 中通过绑定事件的方式调用`content-script`中的代码（包括直接写`onclick`和`addEventListener`2 种方式都不行），但是，“在页面上添加一个按钮并调用插件的扩展 API”是一个很常见的需求，那该怎么办呢？其实这就是本小节要讲的。

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

## homepage_url

开发者或者插件主页设置，一般会在如下 2 个地方显示：

![](http://res.haoji.me/blog/images/transparent.gif)

![](http://res.haoji.me/blog/images/transparent.gif)
