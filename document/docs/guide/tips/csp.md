---
title: Content Scripts Policy
order: 4
---

# Content Scripts Policy

## 不直接支持内联 JavaScript 的执行

也就是不支持将 js 直接写在 html 中，比如：

```html
<input id="btn" type="button" value="收藏" onclick="test()" />
```

报错如下：

```
Refused to execute inline event handler because it violates the following Content Security Policy directive:
"script-src 'self' blob: filesystem: chrome-extension-resource:". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution.
```

解决方法就是用 JS 绑定事件：

```js
$('#btn').on('click', function () {
  alert('测试');
});
```

另外，对于 A 标签，这样写`href="javascript:;"`然后用 JS 绑定事件虽然控制台会报错，但是不受影响，当然强迫症患者受不了的话只能写成`href="#"`了。

如果这样写：

```html
<a href="javascript:;" id="get_secret">请求secret</a>
```

报错如下：

```
Refused to execute JavaScript URL because it violates the following Content Security Policy directive:
"script-src 'self' blob: filesystem: chrome-extension-resource:". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution.
```
