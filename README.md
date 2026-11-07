# 山邱HillQiu 的个人网站

用 [Hugo](https://gohugo.io) 生成的静态站点，没有任何主题或前端框架依赖。

## 开始

Hugo 二进制已经放在 `bin/hugo`（0.169.0 extended，Linux amd64）。换机器的话从
[releases](https://github.com/gohugoio/hugo/releases) 重新下一个，或者 `apt install hugo`。

```bash
make serve     # 本地预览 http://127.0.0.1:1313
make build     # 生成到 public/
```

## 写东西

```bash
make new NAME=my-new-post     # 生成 content/blog/my-new-post.md
```

**文件名可以随便起**，Hugo 不会从文件名里读日期（`2026-03-12-` 这种前缀没有任何作用，
留着也不影响）。但有三件事要清楚：

- **必须是 `.md`**。Hugo 不认 `.mdx`，文件会被直接忽略，不报错。
  迁过来的 4 篇 `.mdx` 已经转成 `.md` 了。
- **`slug` 决定 URL**。没写就用文件名：中文文件名会变成一串 `%E9%9A%8F...`。
- **`date` 必须自己写**。不写会回退到文件修改时间（本地看着正常，但 CI 上一 clone，
  所有没写日期的文章会全变成构建当天，排序就乱了）。

`make new` 用的模板在 `archetypes/blog.md`，会把这些字段都填好。

文章就是 `content/blog/` 里的一个 Markdown 文件：

```markdown
---
title: 标题
date: 2026-11-07T15:00:00+08:00
tags: [建站]
description: 可选的摘要
---

正文，支持 Markdown 和直接写 HTML。
```

页面（不是文章）放 `content/<名字>/index.md`，比如 `content/about/index.md`。

## 目录结构

```
hugo.toml            全站配置（导航、giscus、代码高亮）
content/             内容：blog/ 是文章，about/ 是页面
data/projects.yaml   作品列表，首页和关于页都从这里读
layouts/             模板，没有用主题
  baseof.html        页面骨架
  home.html          首页
  section.html       文章列表
  single.html        文章正文
  _partials/         头尾、卡片、giscus 等片段
  _shortcodes/       {{< projects >}} 这类 Markdown 内嵌组件
assets/css/main.css  全部样式（一个文件，约 400 行）
static/              原样复制的文件（favicon 等）
```

## 要改的地方

- **评论区**：已接好（giscus，仓库 `Zhichii/zhichii.github.io`，分类 `General`），配置在
  `hugo.toml` 的 `[params.giscus]`。

  默认映射是 `specific`，term 取文章的 `slug`。这样中英文两个版本（`/blog/x/` 与
  `/en/blog/x/`）共用同一个讨论串，URL 结构变了、尾斜杠有没有，都不会分叉。

  想让某篇文章继承旧站的讨论串，在那篇文章的 front matter 写：

  ```yaml
  giscusMapping: number   # 按讨论编号取，而不是按标题匹配
  giscusTerm: "5"         # 讨论编号，#5 = blog/h-alpha
  ```

  `number` 里的 term 是**讨论编号**（GitHub Discussions 里的 #5、#7 那种），
  和 `specific` 的标题匹配是两回事，别混。迁移过来的 4 篇旧文章就是这样接回去的。

  两个不同栏目的文章如果 slug 撞名，也可以用 `giscusTerm` 区分（配合 `specific`）。
- **作品列表**：`data/projects.yaml`。
- **导航**：`hugo.toml` 的 `[[menus.main]]`。
- **配色**：`assets/css/main.css` 顶部的 CSS 变量。

## 部署

推到 `main` 分支后，`.github/workflows/hugo.yml` 会自动构建并发布到 GitHub Pages。
仓库的 Settings → Pages → Source 需要选 "GitHub Actions"。
