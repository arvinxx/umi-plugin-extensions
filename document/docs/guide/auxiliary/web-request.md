---
title: webRequest
order: 3
---

# webRequest

通过[webRequest](https://developer.chrome.com/extensions/webRequest)系列 API 可以对 HTTP 请求进行任性地修改、定制，下面是`webRequest`的几个生命周期：

![](http://res.haoji.me/blog/images/transparent.gif)

这里通过`beforeRequest`来简单演示一下它的冰山一角：

```json
// manifest 配置
{
  "permissions": ["webRequest", "webRequestBlocking", "storage", "http:/*"]
}
```

```js
// 逻辑代码
var showImage;
chrome.storage.sync.get({ showImage: true }, function (items) {
  showImage = items.showImage;
});
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (!showImage && details.type == 'image') return { cancel: true };
    if (details.type == 'media') {
      chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'img/icon.png',
        title: '检测到音视频',
        message: '音视频地址：' + details.url,
      });
    }
  },
  { urls: ['<all_urls>'] },
  ['blocking'],
);
```

几个可能经常用到的事件使用示例：

```js
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log('onBeforeRequest', details);
  },
  { urls: ['<all_urls>'] },
  ['blocking', 'extraHeaders', 'requestBody'],
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    console.log('onBeforeSendHeaders', details);
  },
  { urls: ['<all_urls>'] },
  ['blocking', 'extraHeaders', 'requestHeaders'],
);

chrome.webRequest.onResponseStarted.addListener(
  (details) => {
    console.log('onResponseStarted', details);
  },
  { urls: ['<all_urls>'] },
  ['extraHeaders', 'responseHeaders'],
);

chrome.webRequest.onCompleted.addListener(
  (details) => {
    console.log('onCompleted', details);
  },
  { urls: ['<all_urls>'] },
  ['extraHeaders', 'responseHeaders'],
);
```

上面示例中提到，使用`webRequest`API 是无法拿到`responseBody`的，想要拿到的话只能采取一些变通方法，例如：

1.  重写`XmlHttpRequest`和`fetch`，增加自定义拦截事件，缺点是实现方式可能有点脏，重写不好的话可能影响正常页面；
2.  `devtools`的`chrome.devtools.network.onRequestFinished`API 可以拿到返回的 body，缺点是必须打开开发者面板；
3.  使用`chrome.debugger.sendCommand`发送`Network.getResponseBody`命令来获取 body 内容，缺点也很明显，会有一个恼人的提示：

![](http://res.haoji.me/blog/images/transparent.gif)

上述几种方法的实现方式这个链接基本上都有，可以参考下：[https://stackoverflow.com/questions/18534771/chrome-extension-how-to-get-http-response-body](https://stackoverflow.com/questions/18534771/chrome-extension-how-to-get-http-response-body)
