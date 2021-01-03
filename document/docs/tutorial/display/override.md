---
title: override 覆盖特定页面
order: 4
---

# override 覆盖特定页面

使用`override`页可以将 Chrome 默认的一些特定页面替换掉，改为使用扩展提供的页面。

扩展可以替代如下页面：

- 历史记录：从工具菜单上点击历史记录时访问的页面，或者从地址栏直接输入 [chrome://history](chrome://history/)
- 新标签页：当创建新标签的时候访问的页面，或者从地址栏直接输入 [chrome://newtab](chrome://newtab/)
- 书签：浏览器的书签，或者直接输入 [chrome://bookmarks](chrome://bookmarks/)

注意：

- 一个扩展只能替代一个页面；
- 不能替代隐身窗口的新标签页；
- 网页必须设置 title，否则用户可能会看到网页的 URL，造成困扰；

下面的截图是默认的新标签页和被扩展替换掉的新标签页。

![](https://gw.alipayobjects.com/zos/antfincdn/CsAFGYbkkV/2c0091d2-1dc3-4b46-818e-5234717b9cd4.png)

代码（注意，一个插件只能替代一个默认页，以下仅为演示）：

```json
{
  "chrome_url_overrides": {
    "newtab": "newtab.html",
    "history": "history.html",
    "bookmarks": "bookmarks.html"
  }
}
```
