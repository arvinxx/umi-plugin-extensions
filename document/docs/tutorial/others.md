---
title: 其他
order: 10
---

## 动态注入

### 动态注入或执行 JS

虽然在`background`和`popup`中无法直接访问页面 DOM，但是可以通过`chrome.tabs.executeScript`来执行脚本，从而实现访问 web 页面的 DOM（注意，这种方式也不能直接访问页面 JS）。

示例`manifest.json`配置：

```json
{
	"name": "动态JS注入演示",
	...
	"permissions": [
		"tabs", "http:/*"
	],
	...
}
```

JS：

```
`chrome.tabs.executeScript(tabId, {code: 'document.body.style.backgroundColor="red"'});
chrome.tabs.executeScript(tabId, {file: 'some-script.js'});
```

### 动态注入 CSS

示例`manifest.json`配置：

```
`{
	"name": "动态CSS注入演示",
	...
	"permissions": [
		"tabs", "http:/*"
	],
	...
}
```

JS 代码：

```
`chrome.tabs.insertCSS(tabId, {code: 'xxx'});
chrome.tabs.insertCSS(tabId, {file: 'some-style.css'});
```

### 获取当前窗口 ID

```
`chrome.windows.getCurrent(function(currentWindow)
{
	console.log('当前窗口ID：' + currentWindow.id);
});
```

### 获取当前标签页 ID

一般有 2 种方法：

```
`function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}
```

获取当前选项卡 id 的另一种方法，大部分时候都类似，只有少部分时候会不一样（例如当窗口最小化时）

```
`function getCurrentTabId2()
{
	chrome.windows.getCurrent(function(currentWindow)
	{
		chrome.tabs.query({active: true, windowId: currentWindow.id}, function(tabs)
		{
			if(callback) callback(tabs.length ? tabs[0].id: null);
		});
	});
}
```

### 本地存储

本地存储建议用`chrome.storage`而不是普通的`localStorage`，区别有好几点，个人认为最重要的 2 点区别是：

- `chrome.storage`是针对插件全局的，即使你在`background`中保存的数据，在`content-script`也能获取到；
- `chrome.storage.sync`可以跟随当前登录用户自动同步，这台电脑修改的设置会自动同步到其它电脑，很方便，如果没有登录或者未联网则先保存到本地，等登录了再同步至网络；

需要声明`storage`权限，有`chrome.storage.sync`和`chrome.storage.local`2 种方式可供选择，使用示例如下：

```
`chrome.storage.sync.get({color: 'red', age: 18}, function(items) {
	console.log(items.color, items.age);
});
chrome.storage.sync.set({color: 'blue'}, function() {
	console.log('保存成功！');
});
```

### webRequest

通过[webRequest](https://developer.chrome.com/extensions/webRequest)系列 API 可以对 HTTP 请求进行任性地修改、定制，下面是`webRequest`的几个生命周期：

![](http://res.haoji.me/blog/images/transparent.gif)

这里通过`beforeRequest`来简单演示一下它的冰山一角：

```
`{
		"permissions":
	[
		"webRequest", 		"webRequestBlocking", 		"storage", 		"http:/*" 	],
}

var showImage;
chrome.storage.sync.get({showImage: true}, function(items) {
	showImage = items.showImage;
});
chrome.webRequest.onBeforeRequest.addListener(details => {
		if(!showImage && details.type == 'image') return {cancel: true};
			if(details.type == 'media') {
		chrome.notifications.create(null, {
			type: 'basic',
			iconUrl: 'img/icon.png',
			title: '检测到音视频',
			message: '音视频地址：' + details.url,
		});
	}
}, {urls: ["<all_urls>"]}, ["blocking"]);
```

几个可能经常用到的事件使用示例：

```
`chrome.webRequest.onBeforeRequest.addListener(details => {
	console.log('onBeforeRequest', details);
}, {urls: ['<all_urls>']}, ['blocking', 'extraHeaders', 'requestBody']);

chrome.webRequest.onBeforeSendHeaders.addListener(details => {
	console.log('onBeforeSendHeaders', details);
}, {urls: ['<all_urls>']}, ['blocking', 'extraHeaders', 'requestHeaders']);

chrome.webRequest.onResponseStarted.addListener(details => {
	console.log('onResponseStarted', details);
}, {urls: ['<all_urls>']}, ['extraHeaders', 'responseHeaders']);

chrome.webRequest.onCompleted.addListener(details => {
	console.log('onCompleted', details);
}, {urls: ['<all_urls>']}, ['extraHeaders', 'responseHeaders']);
```

上面示例中提到，使用`webRequest`API 是无法拿到`responseBody`的，想要拿到的话只能采取一些变通方法，例如：

1.  重写`XmlHttpRequest`和`fetch`，增加自定义拦截事件，缺点是实现方式可能有点脏，重写不好的话可能影响正常页面；
2.  `devtools`的`chrome.devtools.network.onRequestFinished`API 可以拿到返回的 body，缺点是必须打开开发者面板；
3.  使用`chrome.debugger.sendCommand`发送`Network.getResponseBody`命令来获取 body 内容，缺点也很明显，会有一个恼人的提示：

![](http://res.haoji.me/blog/images/transparent.gif)

上述几种方法的实现方式这个链接基本上都有，可以参考下：[https://stackoverflow.com/questions/18534771/chrome-extension-how-to-get-http-response-body](https://stackoverflow.com/questions/18534771/chrome-extension-how-to-get-http-response-body)

### 国际化

插件根目录新建一个名为`_locales`的文件夹，再在下面新建一些语言的文件夹，如`en`、`zh_CN`、`zh_TW`，然后再在每个文件夹放入一个`messages.json`，同时必须在清单文件中设置`default_locale`。

`_locales\en\messages.json`内容：

```
`{
	"pluginDesc": {"message": "A simple chrome extension demo"},
	"helloWorld": {"message": "Hello World!"}
}
```

`_locales\zh_CN\messages.json`内容：

```
`{
	"pluginDesc": {"message": "一个简单的Chrome插件demo"},
	"helloWorld": {"message": "你好啊，世界！"}
}
```

在`manifest.json`和`CSS`文件中通过`__MSG_messagename__`引入，如：

```
`{
	"description": "__MSG_pluginDesc__",
		"default_locale": "zh_CN",
}
```

JS 中则直接`chrome.i18n.getMessage("helloWorld")`。

测试时，通过给 chrome 建立一个不同的快捷方式`chrome.exe --lang=en`来切换语言，如：

![](http://res.haoji.me/blog/images/transparent.gif)

英文效果：

![](http://res.haoji.me/blog/images/transparent.gif)

中文效果：

![](http://res.haoji.me/blog/images/transparent.gif)

比较常用用的一些 API 系列：

- chrome.tabs
- chrome.webRequest
- chrome.window
- chrome.storage
- chrome.contextMenus
- chrome.devtools
- chrome.extension

## cookies

### chrome.cookies

获取某个网站的所有 cookie：

```
`const url = '[https://www.baidu.com](https://www.baidu.com/)';
chrome.cookies.getAll({url}, cookies => {
	console.log(cookies);
});
```

清除某个网站的某个 cookie：

```
`const url = '[https://www.baidu.com](https://www.baidu.com/)';
const cookieName = 'userName';
chrome.cookies.remove({url, name: cookieName}, details => {});
```

### 9.2. chrome.runtime

- `chrome.runtime.id`：获取插件 id
- `chrome.runtime.getURL('xxx.html')`：获取`xxx.html`在插件中的地址

## 10.1. 查看已安装插件路径

查看本地已安装的插件源码路径：`C:\Users\用户名\AppData\Local\Google\Chrome\User Data\Default\Extensions`，每一个插件被放在以插件 ID 为名的文件夹里面，想要学习某个插件的某个功能是如何实现的，看人家的源码是最好的方法了：

![](http://res.haoji.me/blog/images/transparent.gif)

如何查看某个插件的 ID？进入 chrome://extensions ，然后勾线开发者模式即可看到了。

![](http://res.haoji.me/blog/images/transparent.gif)

> Mac 系统插件本地缓存位于：`/Users/用户名/Library/Application Support/Google/Chrome/Default/Extensions` 文件夹

## 10.2. 特别注意 background 的报错

很多时候你发现你的代码会莫名其妙的失效，找来找去又找不到原因，这时打开 background 的控制台才发现原来某个地方写错了导致代码没生效，正式由于 background 报错的隐蔽性(需要主动打开对应的控制台才能看到错误)，所以特别注意这点。

在对 popup 页面审查元素的时候 popup 会被强制打开无法关闭，只有控制台关闭了才可以关闭 popup，原因很简单：如果 popup 关闭了控制台就没用了。这种方法在某些情况下很实用！

## 10.4. 不支持内联 JavaScript 的执行

也就是不支持将 js 直接写在 html 中，比如：

```
`<input id="btn" type="button" value="收藏" onclick="test()"/>
```

报错如下：

```
`Refused to execute inline event handler because it violates the following Content Security Policy directive: "script-src 'self' blob: filesystem: chrome-extension-resource:". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution.
```

解决方法就是用 JS 绑定事件：

```
`$('#btn').on('click', function(){alert('测试')});
```

另外，对于 A 标签，这样写`href="javascript:;"`然后用 JS 绑定事件虽然控制台会报错，但是不受影响，当然强迫症患者受不了的话只能写成`href="#"`了。

如果这样写：

```
`<a href="javascript:;" id="get_secret">请求secret</a>
```

报错如下：

```
`Refused to execute JavaScript URL because it violates the following Content Security Policy directive: "script-src 'self' blob: filesystem: chrome-extension-resource:". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution.
```

## 10.5. 注入 CSS 的时候必须小心

由于通过`content_scripts`注入的 CSS 优先级非常高，几乎仅次于浏览器默认样式，稍不注意可能就会影响一些网站的展示效果，所以尽量不要写一些影响全局的样式。

之所以强调这个，是因为这个带来的问题非常隐蔽，不太容易找到，可能你正在写某个网页，昨天样式还是好好的，怎么今天就突然不行了？然后你辛辛苦苦找来找去，找了半天才发现竟然是因为插件里面的一个样式影响的！

![](http://res.haoji.me/blog/images/transparent.gif)

打包的话直接在插件管理页有一个打包按钮：

![](http://res.haoji.me/blog/images/transparent.gif)

然后会生成一个`.crx`文件，要发布到 Google 应用商店的话需要先登录你的 Google 账号，然后花 5 个\$注册为开发者，本人太穷，就懒得亲自验证了，有发布需求的自己去整吧。

![](http://res.haoji.me/blog/images/transparent.gif)

## 12.1. 官方资料

推荐查看官方文档，虽然是英文，但是全且新，国内的中文资料都比较旧（注意以下全部需要翻墙）：

- [Chrome 插件官方文档主页](https://developer.chrome.com/extensions)
- [Chrome 插件官方示例](https://developer.chrome.com/extensions/samples)
- [manifest 清单文件](https://developer.chrome.com/extensions/manifest)
- [permissions 权限](https://developer.chrome.com/extensions/permissions)
- [chrome.xxx.api 文档](https://developer.chrome.com/extensions/api_index)
- [模糊匹配规则语法详解](https://developer.chrome.com/extensions/match_patterns)

## 12.2. 第三方资料

部分中文资料，不是特别推荐：

- [360 安全浏览器开发文档](http://open.se.360.cn/open/extension_dev/overview.html)
- [360 极速浏览器 Chrome 扩展开发文档](http://open.chrome.360.cn/extension_dev/overview.html)
- [Chrome 扩展开发极客系列博客](http://www.cnblogs.com/champagne/p/)

## 12.3. 附图

附图：Chrome 高清 png 格式 logo：

![](http://res.haoji.me/blog/images/transparent.gif)
