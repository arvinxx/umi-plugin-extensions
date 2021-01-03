---
title: browserAction 主按钮
order: 1
group:
  order: 3
  title: 呈现形式
---

# browserAction 插件主按钮

通过配置`browser_action`可以在浏览器的右上角增加一个图标，一个`browser_action`可以拥有一个图标，一个`tooltip`，一个`badge`和一个`popup`。

示例配置如下：

```json
{
  "browser_action": {
    "default_icon": "img/icon.png",
    "default_title": "这是一个示例Chrome插件",
    "default_popup": "popup.html"
  }
}
```

## 图标

`browser_action`图标推荐使用宽高都为 19 像素的图片，更大的图标会被缩小，格式随意，一般推荐 png，可以通过 manifest 中`default_icon`字段配置，也可以调用 setIcon()方法。

## tooltip

修改`browser_action`的 manifest 中`default_title`字段，或者调用`setTitle()`方法。

![](https://gw.alipayobjects.com/zos/antfincdn/3lLaLiLaRC/86b49e2f-4db2-4dcd-b571-a035fb82e89a.png)

## badge 徽标

所谓 `badge` 就是在图标上显示一些文本，可以用来更新一些小的扩展状态提示信息。因为 `badge` 空间有限，所以只支持 4 个以下的字符（英文 4 个，中文 2 个）。`badge` 无法通过配置文件来指定，必须通过代码实现，设置 `badge` 文字和颜色可以分别使用`setBadgeText()`和`setBadgeBackgroundColor()`。

```js
chrome.browserAction.setBadgeText({ text: 'new' });
chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
```

效果：

![](https://gw.alipayobjects.com/zos/antfincdn/JyE5tOY3to/3033e9f5-18f4-48b6-ad61-8045958ee715.png)
