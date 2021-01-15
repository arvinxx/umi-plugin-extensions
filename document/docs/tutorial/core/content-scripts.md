---
title: content-scripts
order: 2
---

# content-scripts

所谓[content-scripts](https://developer.chrome.com/extensions/content_scripts)，其实就是 Chrome 插件中向页面注入脚本的一种形式（虽然名为 script，其实还可以包括 css 的），借助`content-scripts`我们可以实现通过配置的方式轻松向指定页面注入 JS 和 CSS（如果需要动态注入，可以参考下文），最常见的比如：广告屏蔽、页面 CSS 定制等等。

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

- `chrome.i18n`
- `chrome.storage`
- `chrome.extension`
  - `getURL`
  - `inIncognitoContext`
  - `lastError`
  - `onRequest`
  - `sendRequest`
- `chrome.runtime`
  - `connect`
  - `getManifest`
  - `getURL`
  - `id`
  - `onConnect`
  - `onMessage`
  - `sendMessage`

这些 API 绝大部分时候都够用。非要调用其它 API 的话，你还可以通过通信来实现让 `background` 来帮你调用（关于通信，后文有详细介绍）。

好了，Chrome 插件给我们提供了这么强大的 JS 注入功能，剩下的就是发挥你的想象力了。
