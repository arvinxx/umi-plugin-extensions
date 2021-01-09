---
title: 通信
order: 6
toc: menu
---

# 通信

通信主页：[https://developer.chrome.com/extensions/messaging](https://developer.chrome.com/extensions/messaging)

前面我们介绍了 Chrome 插件中存在的 5 种 JS，那么它们之间如何互相通信呢？下面先来系统概况一下，然后再分类细说。需要知道的是，popup 和 background 其实几乎可以视为一种东西，因为它们可访问的 API 都一样、通信机制一样、都可以跨域。

## 互相通信概览

注：`-`表示不存在或者无意义，或者待验证。

|  | injected-script | content-script | popup-js | background-js |
| --- | --- | --- | --- | --- |
| injected-script | \- | `window.postMessage` | - | - |
| content-script | `window.postMessage` | - | `chrome.runtime.sendMessage` `chrome.runtime.connect` | `chrome.runtime.sendMessage` `chrome.runtime.connect` |
| popup-js | - | `chrome.tabs.sendMessage` `chrome.tabs.connect` | - | `chrome.extension. getBackgroundPage` |
| background-js | - | `chrome.tabs.sendMessage` `chrome.tabs.connect` | `chrome.extension.getViews` | - |
| devtools-js | `chrome.devtools.inspectedWindow.eval` | - | `chrome.runtime.sendMessage` | `chrome.runtime.sendMessage` |

## 通信详细介绍

popup 可以直接调用 background 中的 JS 方法，也可以直接访问 background 的 DOM：

```js
function test() {
  alert('我是background！');
}

var bg = chrome.extension.getBackgroundPage();
bg.test();
alert(bg.document.body.innerHTML);
```

> 小插曲，今天碰到一个情况，发现 popup 无法获取 background 的任何方法，找了半天才发现是因为 background 的 js 报错了，而你如果不主动查看 background 的 js 的话，是看不到错误信息的，特此提醒。

至于`background`访问`popup`如下（前提是`popup`已经打开）：

```js
var views = chrome.extension.getViews({ type: 'popup' });
if (views.length > 0) {
  console.log(views[0].location.href);
}
```

### popup 或者 bg 向 content 主动发送消息

background.js 或者 popup.js：

```js
function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      if (callback) callback(response);
    });
  });
}
sendMessageToContentScript(
  { cmd: 'test', value: '你好，我是popup！' },
  function (response) {
    console.log('来自content的回复：' + response);
  },
);
```

`content-script.js`接收：

```js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd == 'test') alert(request.value);
  sendResponse('我收到了你的消息！');
});
```

双方通信直接发送的都是 JSON 对象，不是 JSON 字符串，所以无需解析，很方便（当然也可以直接发送字符串）。

> 网上有些老代码中用的是`chrome.extension.onMessage`，没有完全查清二者的区别(貌似是别名)，但是建议统一使用`chrome.runtime.onMessage`。

### content-script 主动发消息给后台

`content-script.js`：

```js
chrome.runtime.sendMessage(
  { greeting: '你好，我是content-script呀，我主动发消息给后台！' },
  function (response) {
    console.log('收到来自后台的回复：' + response);
  },
);
```

`background.js` 或者 `popup.js`：

```js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('收到来自content-script的消息：');
  console.log(request, sender, sendResponse);
  sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});
```

注意事项：

- content_scripts 向`popup`主动发消息的前提是 popup 必须打开！否则需要利用 background 作中转；
- 如果 background 和 popup 同时监听，那么它们都可以同时收到消息，但是只有一个可以 sendResponse，一个先发送了，那么另外一个再发送就无效；

### injected script 和 content-script

`content-script`和页面内的脚本（`injected-script`自然也属于页面内的脚本）之间唯一共享的东西就是页面的 DOM 元素，有 2 种方法可以实现二者通讯：

1.  可以通过`window.postMessage`和`window.addEventListener`来实现二者消息通讯；
2.  通过自定义 DOM 事件来实现；

第一种方法（推荐）：

`injected-script`中：

```js
window.postMessage({ test: '你好！' }, '*');
```

content script 中：

```js
window.addEventListener(
  'message',
  function (e) {
    console.log(e.data);
  },
  false,
);
```

第二种方法：

`injected-script`中：

```js
var customEvent = document.createEvent('Event');
customEvent.initEvent('myCustomEvent', true, true);
function fireCustomEvent(data) {
  hiddenDiv = document.getElementById('myCustomEventDiv');
  hiddenDiv.innerText = data;
  hiddenDiv.dispatchEvent(customEvent);
}
fireCustomEvent('你好，我是普通JS！');
```

`content-script.js`中：

```js
var hiddenDiv = document.getElementById('myCustomEventDiv');
if (!hiddenDiv) {
  hiddenDiv = document.createElement('div');
  hiddenDiv.style.display = 'none';
  document.body.appendChild(hiddenDiv);
}
hiddenDiv.addEventListener('myCustomEvent', function () {
  var eventData = document.getElementById('myCustomEventDiv').innerText;
  console.log('收到自定义事件消息：' + eventData);
});
```

`injected-script`无法直接和`popup`通信，必须借助`content-script`作为中间人。

//TODO 示例代码有待完善。

## 长连接和短连接

其实上面已经涉及到了，这里再单独说明一下。Chrome 插件中有 2 种通信方式，一个是短连接（`chrome.tabs.sendMessage`和`chrome.runtime.sendMessage`），一个是长连接（`chrome.tabs.connect`和`chrome.runtime.connect`）。

短连接的话就是挤牙膏一样，我发送一下，你收到了再回复一下，如果对方不回复，你只能重新发，而长连接类似`WebSocket`会一直建立连接，双方可以随时互发消息。

短连接上面已经有代码示例了，这里只讲一下长连接。

popup.js：

```js
getCurrentTabId((tabId) => {
  var port = chrome.tabs.connect(tabId, { name: 'test-connect' });
  port.postMessage({ question: '你是谁啊？' });
  port.onMessage.addListener(function (msg) {
    alert('收到消息：' + msg.answer);
    if (msg.answer && msg.answer.startsWith('我是')) {
      port.postMessage({ question: '哦，原来是你啊！' });
    }
  });
});
```

`content-script.js`：

```js
chrome.runtime.onConnect.addListener(function (port) {
  console.log(port);
  if (port.name == 'test-connect') {
    port.onMessage.addListener(function (msg) {
      console.log('收到长连接消息：', msg);
      if (msg.question == '你是谁啊？')
        port.postMessage({ answer: '我是你爸！' });
    });
  }
});
```
