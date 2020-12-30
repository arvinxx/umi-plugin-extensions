---
title: 展现形式
order: 4
toc: menu
---

# 展现形式

## browserAction(浏览器右上角)

通过配置`browser_action`可以在浏览器的右上角增加一个图标，一个`browser_action`可以拥有一个图标，一个`tooltip`，一个`badge`和一个`popup`。

示例配置如下：

```
`"browser_action":
{
	"default_icon": "img/icon.png",
	"default_title": "这是一个示例Chrome插件",
	"default_popup": "popup.html"
}` 复制运行
```

### 图标

`browser_action`图标推荐使用宽高都为 19 像素的图片，更大的图标会被缩小，格式随意，一般推荐 png，可以通过 manifest 中`default_icon`字段配置，也可以调用 setIcon()方法。

### tooltip

修改`browser_action`的 manifest 中`default_title`字段，或者调用`setTitle()`方法。

![](http://res.haoji.me/blog/images/transparent.gif)

### badge

所谓`badge`就是在图标上显示一些文本，可以用来更新一些小的扩展状态提示信息。因为 badge 空间有限，所以只支持 4 个以下的字符（英文 4 个，中文 2 个）。badge 无法通过配置文件来指定，必须通过代码实现，设置 badge 文字和颜色可以分别使用`setBadgeText()`和`setBadgeBackgroundColor()`。

```
`chrome.browserAction.setBadgeText({text: 'new'});
chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});` 复制运行
```

效果：

![](http://res.haoji.me/blog/images/transparent.gif)

## pageAction(地址栏右侧)

所谓`pageAction`，指的是只有当某些特定页面打开才显示的图标，它和`browserAction`最大的区别是一个始终都显示，一个只在特定情况才显示。

需要特别说明的是早些版本的 Chrome 是将 pageAction 放在地址栏的最右边，左键单击弹出 popup，右键单击则弹出相关默认的选项菜单：

![](http://res.haoji.me/blog/images/transparent.gif)

而新版的 Chrome 更改了这一策略，pageAction 和普通的 browserAction 一样也是放在浏览器右上角，只不过没有点亮时是灰色的，点亮了才是彩色的，灰色时无论左键还是右键单击都是弹出选项：

![](http://res.haoji.me/blog/images/transparent.gif)

> 具体是从哪一版本开始改的没去仔细考究，反正知道 v50.0 的时候还是前者，v58.0 的时候已改为后者。

调整之后的`pageAction`我们可以简单地把它看成是可以置灰的`browserAction`。

- chrome.pageAction.show(tabId) 显示图标；
- chrome.pageAction.hide(tabId) 隐藏图标；

示例(只有打开百度才显示图标)：

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

![](http://res.haoji.me/blog/images/transparent.gif)

## 右键菜单

通过开发 Chrome 插件可以自定义浏览器的右键菜单，主要是通过`chrome.contextMenus`API 实现，右键菜单可以出现在不同的上下文，比如普通页面、选中的文字、图片、链接，等等，如果有同一个插件里面定义了多个菜单，Chrome 会自动组合放到以插件名字命名的二级菜单里，如下：

![](http://res.haoji.me/blog/images/transparent.gif)

### 5.3.1. 最简单的右键菜单示例

```
`{"permissions": ["contextMenus"]}

chrome.contextMenus.create({
	title: "测试右键菜单",
	onclick: function(){alert('您点击了右键菜单！');}
});` 复制运行
```

效果：

![](http://res.haoji.me/blog/images/transparent.gif)

### 5.3.2. 添加右键百度搜索

```
`{"permissions": ["contextMenus"， "tabs"]}

chrome.contextMenus.create({
	title: '使用度娘搜索：%s', 	contexts: ['selection'], 	onclick: function(params)
	{
				chrome.tabs.create({url: '[https://www.baidu.com/s?ie=utf-8&wd=](https://www.baidu.com/s?ie=utf-8&wd=)' + encodeURI(params.selectionText)});
	}
});` 复制运行
```

效果如下：

![](http://res.haoji.me/blog/images/transparent.gif)

### 5.3.3. 语法说明

这里只是简单列举一些常用的，完整 API 参见：[https://developer.chrome.com/extensions/contextMenus](https://developer.chrome.com/extensions/contextMenus)

```
`chrome.contextMenus.create({
	type: 'normal'， 	title: '菜单的名字', 	contexts: ['page'], 	onclick: function(){}, 	parentId: 1, 	documentUrlPatterns: 'https://*.baidu.com/*' });
chrome.contextMenus.remove(menuItemId)；
chrome.contextMenus.removeAll();
chrome.contextMenus.update(menuItemId, updateProperties);` 复制运行
```

### 5.4. override(覆盖特定页面)

使用`override`页可以将 Chrome 默认的一些特定页面替换掉，改为使用扩展提供的页面。

扩展可以替代如下页面：

- 历史记录：从工具菜单上点击历史记录时访问的页面，或者从地址栏直接输入 [chrome://history](chrome://history/)
- 新标签页：当创建新标签的时候访问的页面，或者从地址栏直接输入 [chrome://newtab](chrome://newtab/)
- 书签：浏览器的书签，或者直接输入 [chrome://bookmarks](chrome://bookmarks/)

注意：

- 一个扩展只能替代一个页面；
- 不能替代隐身窗口的新标签页；
- 网页必须设置 title，否则用户可能会看到网页的 URL，造成困扰；

下面的截图是默认的新标签页和被扩展替换掉的新标签页。

![](http://res.haoji.me/blog/images/transparent.gif)

代码（注意，一个插件只能替代一个默认页，以下仅为演示）：

```
`"chrome_url_overrides":
{
	"newtab": "newtab.html",
	"history": "history.html",
	"bookmarks": "bookmarks.html"
}` 复制运行
```

### 5.预热

使用过 vue 的应该见过这种类型的插件：

![](http://res.haoji.me/blog/images/transparent.gif)

是的，Chrome 允许插件在开发者工具(devtools)上动手脚，主要表现在：

- 自定义一个和多个和`Elements`、`Console`、`Sources`等同级别的面板；
- 自定义侧边栏(sidebar)，目前只能自定义`Elements`面板的侧边栏；

先来看 2 张简单的 demo 截图，自定义面板（判断当前页面是否使用了 jQuery）：

![](http://res.haoji.me/blog/images/transparent.gif)

自定义侧边栏（获取当前页面所有图片）：

![](http://res.haoji.me/blog/images/transparent.gif)

### 5.5.2. devtools 扩展介绍

主页：[https://developer.chrome.com/extensions/devtools](https://developer.chrome.com/extensions/devtools)

来一张官方图片：

![](http://res.haoji.me/blog/images/transparent.gif)

每打开一个开发者工具窗口，都会创建 devtools 页面的实例，F12 窗口关闭，页面也随着关闭，所以 devtools 页面的生命周期和 devtools 窗口是一致的。devtools 页面可以访问一组特有的`DevTools API`以及有限的扩展 API，这组特有的`DevTools API`只有 devtools 页面才可以访问，background 都无权访问，这些 API 包括：

- `chrome.devtools.panels`：面板相关；
- `chrome.devtools.inspectedWindow`：获取被审查窗口的有关信息；
- `chrome.devtools.network`：获取有关网络请求的信息；

大部分扩展 API 都无法直接被`DevTools`页面调用，但它可以像`content-script`一样直接调用`chrome.extension`和`chrome.runtime`API，同时它也可以像`content-script`一样使用 Message 交互的方式与 background 页面进行通信。

### 5.5.3. 实例：创建一个 devtools 扩展

首先，要针对开发者工具开发插件，需要在清单文件声明如下：

```
`{
		"devtools_page": "devtools.html"
}` 复制运行
```

这个`devtools.html`里面一般什么都没有，就引入一个 js：

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <script type="text/javascript" src="js/devtools.js"></script>
  </body>
</html>
```

可以看出来，其实真正代码是`devtools.js`，html 文件是“多余”的，所以这里觉得有点坑，`devtools_page`干嘛不允许直接指定 JS 呢？

再来看 devtools.js 的代码：

```js
chrome.devtools.panels.create(
  'MyPanel',
  'img/icon.png',
  'mypanel.html',
  function (panel) {
    console.log('自定义面板创建成功！');
  },
);

chrome.devtools.panels.elements.createSidebarPane('Images', function (sidebar) {
  sidebar.setExpression('document.querySelectorAll("img")', 'All Images');
});
```

setPage 时的效果：

![](http://res.haoji.me/blog/images/transparent.gif)

以下截图示例的代码：

![](http://res.haoji.me/blog/images/transparent.gif)

```js
document.getElementById('check_jquery').addEventListener('click', function () {
  chrome.devtools.inspectedWindow.eval(
    'jQuery.fn.jquery',
    function (result, isException) {
      var html = '';
      if (isException) html = '当前页面没有使用jQuery。';
      else html = '当前页面使用了jQuery，版本为：' + result;
      alert(html);
    },
  );
});

document.getElementById('open_resource').addEventListener('click', function () {
  chrome.devtools.inspectedWindow.eval(
    'window.location.href',
    function (result, isException) {
      chrome.devtools.panels.openResource(result, 20, function () {
        console.log('资源打开成功！');
      });
    },
  );
});

document.getElementById('test_inspect').addEventListener('click', function () {
  chrome.devtools.inspectedWindow.eval(
    'inspect(document.images[0])',
    function (result, isException) {},
  );
});

document
  .getElementById('get_all_resources')
  .addEventListener('click', function () {
    chrome.devtools.inspectedWindow.getResources(function (resources) {
      alert(JSON.stringify(resources));
    });
  });
```

### 5.5.4. 调试技巧

修改了 devtools 页面的代码时，需要先在 chrome://extensions 页面按下`Ctrl+R`重新加载插件，然后关闭再打开开发者工具即可，无需刷新页面（而且只刷新页面不刷新开发者工具的话是不会生效的）。

由于 devtools 本身就是开发者工具页面，所以几乎没有方法可以直接调试它，直接用 `chrome-extension://extid/devtools.html"`的方式打开页面肯定报错，因为不支持相关特殊 API，只能先自己写一些方法屏蔽这些错误，调试通了再放开。

### 5.6. option(选项页)

所谓`options`页，就是插件的设置页面，有 2 个入口，一个是右键图标有一个“选项”菜单，还有一个在插件管理页面：

![](http://res.haoji.me/blog/images/transparent.gif)

![](http://res.haoji.me/blog/images/transparent.gif)

在 Chrome40 以前，options 页面和其它普通页面没什么区别，Chrome40 以后则有了一些变化。

我们先看老版的[options](https://developer.chrome.com/extensions/options)：

```
`{
		"options_page": "options.html",
}` 复制运行
```

这个页面里面的内容就随你自己发挥了，配置之后在插件管理页就会看到一个`选项`按钮入口，点进去就是打开一个网页，没啥好讲的。

效果:

![](http://res.haoji.me/blog/images/transparent.gif)

再来看新版的[optionsV2](https://developer.chrome.com/extensions/optionsV2)：

```
`{
	"options_ui":
	{
		"page": "options.html",
				"chrome_style": true
	},
}` 复制运行
```

`options.html`的代码我们没有任何改动，只是配置文件改了，之后效果如下：

![](http://res.haoji.me/blog/images/transparent.gif)

看起来是不是高大上了？

几点注意：

- 为了兼容，建议 2 种都写，如果都写了，Chrome40 以后会默认读取新版的方式；
- 新版 options 中不能使用 alert；
- 数据存储建议用 chrome.storage，因为会随用户自动同步；

### 5.7. omnibox

`omnibox`是向用户提供搜索建议的一种方式。先来看个`gif`图以便了解一下这东西到底是个什么鬼：

![](http://res.haoji.me/blog/images/transparent.gif)

注册某个关键字以触发插件自己的搜索建议界面，然后可以任意发挥了。

首先，配置文件如下：

```
`{
		"omnibox": { "keyword" : "go" },
}` 复制运行
```

然后`background.js`中注册监听事件：

```
`chrome.omnibox.onInputChanged.addListener((text, suggest) => {
	console.log('inputChanged: ' + text);
	if(!text) return;
	if(text == '美女') {
		suggest([
			{content: '中国' + text, description: '你要找“中国美女”吗？'},
			{content: '日本' + text, description: '你要找“日本美女”吗？'},
			{content: '泰国' + text, description: '你要找“泰国美女或人妖”吗？'},
			{content: '韩国' + text, description: '你要找“韩国美女”吗？'}
		]);
	}
	else if(text == '微博') {
		suggest([
			{content: '新浪' + text, description: '新浪' + text},
			{content: '腾讯' + text, description: '腾讯' + text},
			{content: '搜狐' + text, description: '搜索' + text},
		]);
	}
	else {
		suggest([
			{content: '百度搜索 ' + text, description: '百度搜索 ' + text},
			{content: '谷歌搜索 ' + text, description: '谷歌搜索 ' + text},
		]);
	}
});

chrome.omnibox.onInputEntered.addListener((text) => {
	console.log('inputEntered: ' + text);
	if(!text) return;
	var href = '';
	if(text.endsWith('美女')) href = '[http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=](http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=)' + text;
	else if(text.startsWith('百度搜索')) href = '[https://www.baidu.com/s?ie=UTF-8&wd=](https://www.baidu.com/s?ie=UTF-8&wd=)' + text.replace('百度搜索 ', '');
	else if(text.startsWith('谷歌搜索')) href = '[https://www.google.com.tw/search?q=](https://www.google.com.tw/search?q=)' + text.replace('谷歌搜索 ', '');
	else href = '[https://www.baidu.com/s?ie=UTF-8&wd=](https://www.baidu.com/s?ie=UTF-8&wd=)' + text;
	openUrlCurrentTab(href);
});
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

function openUrlCurrentTab(url)
{
	getCurrentTabId(tabId => {
		chrome.tabs.update(tabId, {url: url});
	})
}` 复制运行
```

### 5.8. 桌面通知

Chrome 提供了一个`chrome.notifications`API 以便插件推送桌面通知，暂未找到`chrome.notifications`和 HTML5 自带的`Notification`的显著区别及优势。

在后台 JS 中，无论是使用`chrome.notifications`还是`Notification`都不需要申请权限（HTML5 方式需要申请权限），直接使用即可。

最简单的通知：

![](http://res.haoji.me/blog/images/transparent.gif)

代码：

```
`chrome.notifications.create(null, {
	type: 'basic',
	iconUrl: 'img/icon.png',
	title: '这是标题',
	message: '您刚才点击了自定义右键菜单！'
});` 复制运行
```

通知的样式可以很丰富：

![](http://res.haoji.me/blog/images/transparent.gif)

这个没有深入研究，有需要的可以去[官方文档](https://developer.chrome.com/extensions/notifications)查看更多细节。

Chrome 插件的 JS 主要可以分为这 5 类：`injected script`、`content-script`、`popup js`、`background js`和`devtools js`，
