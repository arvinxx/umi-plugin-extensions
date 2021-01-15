---
title: omnibox 搜索建议
order: 7
---

# omnibox

`omnibox`是向用户提供搜索建议的一种方式。先来看个`gif`图以便了解一下这东西到底是个什么鬼：

![](http://image.liuxianan.com/201706/20170621_155455_980_5359.gif)

注册某个关键字以触发插件自己的搜索建议界面，然后可以任意发挥了。

首先，配置文件如下：

```json
{
  "omnibox": { "keyword": "go" }
}
```

然后`background.js`中注册监听事件：

```js
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  console.log('inputChanged: ' + text);
  if (!text) return;
  if (text == '美女') {
    suggest([
      { content: '中国' + text, description: '你要找“中国美女”吗？' },
      { content: '日本' + text, description: '你要找“日本美女”吗？' },
      { content: '泰国' + text, description: '你要找“泰国美女或人妖”吗？' },
      { content: '韩国' + text, description: '你要找“韩国美女”吗？' },
    ]);
  } else if (text == '微博') {
    suggest([
      { content: '新浪' + text, description: '新浪' + text },
      { content: '腾讯' + text, description: '腾讯' + text },
      { content: '搜狐' + text, description: '搜索' + text },
    ]);
  } else {
    suggest([
      { content: '百度搜索 ' + text, description: '百度搜索 ' + text },
      { content: '谷歌搜索 ' + text, description: '谷歌搜索 ' + text },
    ]);
  }
});

chrome.omnibox.onInputEntered.addListener((text) => {
  console.log('inputEntered: ' + text);
  if (!text) return;
  var href = '';
  if (text.endsWith('美女'))
    href =
      '[http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=](http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=)' +
      text;
  else if (text.startsWith('百度搜索'))
    href =
      '[https://www.baidu.com/s?ie=UTF-8&wd=](https://www.baidu.com/s?ie=UTF-8&wd=)' +
      text.replace('百度搜索 ', '');
  else if (text.startsWith('谷歌搜索'))
    href =
      '[https://www.google.com.tw/search?q=](https://www.google.com.tw/search?q=)' +
      text.replace('谷歌搜索 ', '');
  else
    href =
      '[https://www.baidu.com/s?ie=UTF-8&wd=](https://www.baidu.com/s?ie=UTF-8&wd=)' +
      text;
  openUrlCurrentTab(href);
});
function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (callback) callback(tabs.length ? tabs[0].id : null);
  });
}

function openUrlCurrentTab(url) {
  getCurrentTabId((tabId) => {
    chrome.tabs.update(tabId, { url: url });
  });
}
```
