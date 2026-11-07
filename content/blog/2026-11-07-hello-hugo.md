---
title: 把博客从 Docusaurus 换成 Hugo
date: 2026-11-07T15:00:00+08:00
slug: hello-hugo
tags: [建站, Hugo]
description: 为了一个 12 篇文章的个人主页，装 284MB 的 node_modules 到底图什么。
---

先说结论：这个站现在由 Hugo 生成，一个 60MB 的单文件程序，没有 `node_modules`，没有依赖树，构建耗时 22 毫秒。

## 之前的样子

旧站是用 Docusaurus 搭的。它其实是给「几百页、有层级、还要版本管理的文档站」准备的，而我拿它放了三类东西：

- 一篇自我介绍
- 三篇「想法」
- 12 篇日志

也就是说，我用一整套文档框架托管了 4 个静态页面和 12 篇随笔。真正让我下决心的是这些数字：

| 项目 | Docusaurus | Hugo |
| --- | --- | --- |
| 依赖目录 | 284 MB `node_modules` | 无 |
| 访客要下载的 JS | 114 个文件，共 1.5 MB | **0** |
| 主包 | 455 KB（gzip 后 142 KB） | 无 |
| CSS | 148 KB | 8 KB |
| 构建耗时 | 几十秒 | 22 毫秒 |

455 KB 的 JavaScript，就为了显示一段中文段落。这件事怎么想都不太对。

## 现在怎么组织的

没有用任何主题。`layouts/` 下十几个模板文件，`assets/css/main.css` 一个样式表，加起来比 Docusaurus 的一个配置文件还短。写一篇新文章就是往 `content/blog/` 里丢一个 Markdown 文件：

```markdown
---
title: 标题
date: 2026-11-07T15:00:00+08:00
tags: [建站]
---

正文。
```

然后 `make build`，等 22 毫秒。

## 代价

诚实地说，也不是没有：

- 模板从 React 换成了 Go 的 `html/template`，语法完全不一样，得重新学。
- 没有现成的主题和插件生态，想要什么样式得自己写。
- 站内搜索之类的东西需要额外接（不过 12 篇文章本来也不需要搜索）。
- 评论区还是 giscus，这个和框架无关，换个地方挂而已。

不过这些都是「一次性」的成本，而 `node_modules` 是「每一次」的成本。

> 一个 14 岁的初中生为了写点东西，差点被一个前端框架拖垮。

## 关于评论

评论区用的是 giscus，挂在 GitHub Discussions 上。现在每篇文章底下都会显示，但需要先去 [giscus.app](https://giscus.app) 填一下仓库和分类，拿到 `repoId` 和 `categoryId` 塞进 `hugo.toml`，否则只会显示一行提示。
