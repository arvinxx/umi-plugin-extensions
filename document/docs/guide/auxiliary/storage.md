---
title: 本地存储
order: 1
---

### 本地存储

本地存储建议用`chrome.storage`而不是普通的`localStorage`，区别有好几点，个人认为最重要的 2 点区别是：

- `chrome.storage`是针对插件全局的，即使你在`background`中保存的数据，在`content-script`也能获取到；
- `chrome.storage.sync`可以跟随当前登录用户自动同步，这台电脑修改的设置会自动同步到其它电脑，很方便，如果没有登录或者未联网则先保存到本地，等登录了再同步至网络；

需要声明`storage`权限，有`chrome.storage.sync`和`chrome.storage.local`2 种方式可供选择，使用示例如下：

```js
chrome.storage.sync.get({ color: 'red', age: 18 }, function (items) {
  console.log(items.color, items.age);
});
chrome.storage.sync.set({ color: 'blue' }, function () {
  console.log('保存成功！');
});
```
