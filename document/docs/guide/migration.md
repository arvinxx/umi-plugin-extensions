---
title: 迁移指南
order: 1
group:
  order: 10
  title: 其他
---

## 从 0.x 迁移到 1.0

由于 1.0 版本使用了 Manifest V3，因此进行以下调整：

1. 不再支持动态加载脚本（V3 限制），`contentScripts` 不再支持动态插入;
2. `background` 使用 `scripts` 配置调整为 `service_worker`，并移除 `persistent` 配置；

```diff

export default defineConfig({
+  plugins: [require.resolve('umi-plugin-extensions')],

-  manifestVersion: 2,
-  minimumChromeVersion: '80',
+  minimumChromeVersion: '88',

  extensions: {
    background: {
-      scripts: ['@/background/index'],
-      persistent: true,
+      service_worker: '@/background/index',
    },
  },

  contentScripts: [
-    {
-      matches: ['http://*/*', 'https://*/*'],
-      entries: ['jquery', 'require.js'],
-      runAt: 'document_end',
-    },
    {
      matches: ['https://github.com/*'],
      entries: ['@/contentScripts/github'],
    },
]

})
```
