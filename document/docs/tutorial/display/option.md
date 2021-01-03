---
title: option 选项页
order: 6
---

# Option 选项页

所谓`options`页，就是插件的设置页面，有 2 个入口，一个是右键图标有一个“选项”菜单，还有一个在插件管理页面：

![](http://image.liuxianan.com/201706/20170621_170046_846_5529.png) ![](http://image.liuxianan.com/201706/20170621_115902_196_9130.png)

在 Chrome40 以前，options 页面和其它普通页面没什么区别，Chrome40 以后则有了一些变化。

## 新版 options

新版的[optionsV2](https://developer.chrome.com/extensions/optionsV2)：

```json
{
  "options_ui": {
    "page": "options.html",
    "chrome_style": true
  }
}
```

`options.html`的代码我们没有任何改动，只是配置文件改了，之后效果如下：

![](http://image.liuxianan.com/201706/20170621_115809_750_1163.png)

看起来是不是高大上了？

## 老版 options

老版的[options](https://developer.chrome.com/extensions/options)：

```json
{
  "options_page": "options.html"
}
```

这个页面里面的内容就随你自己发挥了，配置之后在插件管理页就会看到一个`选项`按钮入口，点进去就是打开一个网页，没啥好讲的。

效果:

![](https://gw.alipayobjects.com/zos/antfincdn/zIIKrPVgVK/39888bd1-69fb-4490-b1ea-5ec4efbfb90b.png)

几点注意事项：

- 为了兼容，建议 2 种都写，如果都写了，Chrome40 以后会默认读取新版的方式；
- 新版 options 中不能使用 alert；
- 数据存储建议用 chrome.storage，因为会随用户自动同步；
