---
title: contextMenu 右键菜单
order: 3
---

# contextMenu 右键菜单

通过开发 Chrome 插件可以自定义浏览器的右键菜单，主要是通过`chrome.contextMenus`API 实现，右键菜单可以出现在不同的上下文，比如普通页面、选中的文字、图片、链接，等等，如果有同一个插件里面定义了多个菜单，Chrome 会自动组合放到以插件名字命名的二级菜单里，如下：

![](http://res.haoji.me/blog/images/transparent.gif)

## 最简单的右键菜单示例

配置项:

```json
{
  "permissions": ["contextMenus"]
}
```

代码:

```js
chrome.contextMenus.create({
  title: '测试右键菜单',
  onclick: function () {
    alert('您点击了右键菜单！');
  },
});
```

效果：

![](https://gw.alipayobjects.com/zos/antfincdn/VN1XN%24ViME/4033ae4c-4fb7-4abb-87ab-ae12cd41d242.png)

## 添加右键百度搜索

配置

```json
{
  "permissions": ["contextMenus", "tabs"]
}
```

代码:

```js
chrome.contextMenus.create({
  title: '使用度娘搜索：%s',
  contexts: ['selection'],
  onclick: function (params) {
    chrome.tabs.create({
      url:
        '[https://www.baidu.com/s?ie=utf-8&wd=](https://www.baidu.com/s?ie=utf-8&wd=)' +
        encodeURI(params.selectionText),
    });
  },
});
```

效果如下：

![](https://gw.alipayobjects.com/zos/antfincdn/V9X3Muelr6/7c64db08-12d8-4ccf-a41c-46516fb79f10.png)

## 语法说明

这里只是简单列举一些常用的，完整 API 参见：[https://developer.chrome.com/extensions/contextMenus](https://developer.chrome.com/extensions/contextMenus)

```js
// 创建
chrome.contextMenus.create({
  type: 'normal',
  title: '菜单的名字',
  contexts: ['page'],
  onclick: function () {},
  parentId: 1,
  documentUrlPatterns: 'https://*.baidu.com/*',
});

// 删除
chrome.contextMenus.remove(menuItemId);

// 删除所有
chrome.contextMenus.removeAll();

// 更新
chrome.contextMenus.update(menuItemId, updateProperties);
```
