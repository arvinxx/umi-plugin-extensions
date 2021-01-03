---
title: devtools 开发者工具
order: 5
---

# devtools 开发者工具

使用过 vue 的应该见过这种类型的插件：

![](https://gw.alipayobjects.com/zos/antfincdn/OZgQmzGqAX/5fb36e22-8ffb-425d-bf4a-37962c1b1e1b.png)

是的，Chrome 允许插件在开发者工具(devtools)上动手脚，主要表现在：

- 自定义一个和多个和`Elements`、`Console`、`Sources`等同级别的面板；
- 自定义侧边栏(sidebar)，目前只能自定义`Elements`面板的侧边栏；

先来看 2 张简单的 demo 截图，自定义面板（判断当前页面是否使用了 jQuery）：

![](https://gw.alipayobjects.com/zos/antfincdn/4Bf09O3W%26c/c744893a-25f0-44d9-be7d-f705747c6071.png)

自定义侧边栏（获取当前页面所有图片）：

![](https://gw.alipayobjects.com/zos/antfincdn/Tc31OemP0T/c7bb2476-7d69-4d38-8749-121154c19c9d.png)

## devtools 扩展介绍

主页：[https://developer.chrome.com/extensions/devtools](https://developer.chrome.com/extensions/devtools)

来一张官方图片：

![](https://gw.alipayobjects.com/zos/antfincdn/5Gsb2jHxqu/a1c399e3-7efa-452e-bf24-de11dcd6ffe5.png)

每打开一个开发者工具窗口，都会创建 devtools 页面的实例，F12 窗口关闭，页面也随着关闭，所以 devtools 页面的生命周期和 devtools 窗口是一致的。devtools 页面可以访问一组特有的`DevTools API`以及有限的扩展 API，这组特有的`DevTools API`只有 devtools 页面才可以访问，background 都无权访问，这些 API 包括：

- `chrome.devtools.panels`：面板相关；
- `chrome.devtools.inspectedWindow`：获取被审查窗口的有关信息；
- `chrome.devtools.network`：获取有关网络请求的信息；

大部分扩展 API 都无法直接被`DevTools`页面调用，但它可以像`content-script`一样直接调用`chrome.extension`和`chrome.runtime`API，同时它也可以像`content-script`一样使用 Message 交互的方式与 background 页面进行通信。

## 实例：创建一个 devtools 扩展

首先，要针对开发者工具开发插件，需要在清单文件声明如下：

```json
{
  "devtools_page": "devtools.html"
}
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

![](https://gw.alipayobjects.com/zos/antfincdn/8spju%26Mtgj/db432377-0470-4f96-bf8f-fad9a74c99e6.png)

以下截图示例的代码：

![](https://gw.alipayobjects.com/zos/antfincdn/XwwxJGFCjO/2eff0366-0770-4ac5-a835-9809ba226591.png)

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

## 调试技巧

修改了 devtools 页面的代码时，需要先在 chrome://extensions 页面按下`Ctrl+R`重新加载插件，然后关闭再打开开发者工具即可，无需刷新页面（而且只刷新页面不刷新开发者工具的话是不会生效的）。

由于 devtools 本身就是开发者工具页面，所以几乎没有方法可以直接调试它，直接用 `chrome-extension://extid/devtools.html"`的方式打开页面肯定报错，因为不支持相关特殊 API，只能先自己写一些方法屏蔽这些错误，调试通了再放开。
