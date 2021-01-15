---
title: cookies
order: 3
---

# cookies

## `chrome.cookies`

获取某个网站的所有 cookie：

```js
const url = '[https://www.baidu.com](https://www.baidu.com/)';
chrome.cookies.getAll({ url }, (cookies) => {
  console.log(cookies);
});
```

清除某个网站的某个 cookie：

```js
const url = '[https://www.baidu.com](https://www.baidu.com/)';
const cookieName = 'userName';
chrome.cookies.remove({ url, name: cookieName }, (details) => {});
```
