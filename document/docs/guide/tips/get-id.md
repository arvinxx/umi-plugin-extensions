---
title: 获取 ID
order: 2
---

# 获取 ID

## 获取当前窗口 ID

```js
chrome.windows.getCurrent(function (currentWindow) {
  console.log('当前窗口ID：' + currentWindow.id);
});
```

## 获取当前标签页 ID

一般有 2 种方法：

```js
function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (callback) callback(tabs.length ? tabs[0].id : null);
  });
}
```

获取当前选项卡 id 的另一种方法，大部分时候都类似，只有少部分时候会不一样（例如当窗口最小化时）

```js
function getCurrentTabId2() {
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({ active: true, windowId: currentWindow.id }, (tabs) => {
      if (callback) callback(tabs.length ? tabs[0].id : null);
    });
  });
}
```

## 获取插件 ID

获取插件 id

```js
const id = chrome.runtime.id;
console.log(id);
```
