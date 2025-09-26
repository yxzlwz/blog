import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from 'vuepress';
import { plumeTheme } from 'vuepress-theme-plume';

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  locales: {
    '/': {
      title: '异想之旅のBlog',
      lang: 'zh-CN',
      description: '欢迎来到异想之旅的新家！',
    },
    '/en/': {
      title: '异想之旅のBlog',
      lang: 'en-US',
      description: "Welcome to YXZL's new place!",
    },
  },

  head: [['link', { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }]],

  bundler: viteBundler(),
  shouldPrefetch: false,

  theme: plumeTheme({
    hostname: 'https://yxzl.dev',

    docsRepo: 'yxzlwz/blog',
    docsDir: 'docs',
    docsBranch: 'main',

    editLink: true,
    lastUpdated: { formatOptions: { dateStyle: 'short', timeStyle: 'short' } },
    contributors: false,
    changelog: true,

    blog: {
      link: '/blogs/',
      tagsLink: '/blogs/tags/',
      tagsTheme: 'colored',
      postList: true,
      tags: true,
      archives: true,
      categories: false,
      postCover: 'right',
      pagination: 15,
    },

    /* 博客文章页面链接前缀 */
    article: '/blogs/',

    cache: 'filesystem',

    autoFrontmatter: {
      permalink: false,
      createTime: true,
      title: true,
    },

    search: {
      provider: 'algolia',
      appId: '6T04KIYWWA',
      apiKey: 'bf499ff2ef33bee13e00afc00af7dd93',
      indexName: 'blog-crawler',
    },

    /**
     * Shiki 代码高亮
     * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
     */
    // codeHighlighter: {
    //   twoslash: true, // 启用 twoslash
    //   whitespace: true, // 启用 空格/Tab 高亮
    //   lineNumbers: true, // 启用行号
    // },

    readingTime: false,

    markdown: {
      abbr: true, // 启用 abbr 语法  *[label]: content
      annotation: true, // 启用 annotation 语法  [+label]: content
      pdf: true, // 启用 PDF 嵌入 @[pdf](/xxx.pdf)
      caniuse: true, // 启用 caniuse 语法  @[caniuse](feature_name)
      plot: true, // 启用隐秘文本语法 !!xxxx!!
      bilibili: true, // 启用嵌入 bilibili视频 语法 @[bilibili](bid)
      youtube: true, // 启用嵌入 youtube视频 语法 @[youtube](video_id)
      // artPlayer: true, // 启用嵌入 artPlayer 本地视频 语法 @[artPlayer](url)
      audioReader: true, // 启用嵌入音频朗读功能 语法 @[audioReader](url)
      icon: { provider: 'iconify' }, // 启用内置图标语法  ::icon-name::
      table: true, // 启用表格增强容器语法 ::: table
      replit: true, // 启用嵌入 replit 语法 @[replit](user/repl-name)
      codeSandbox: true, // 启用嵌入 codeSandbox 语法 @[codeSandbox](id)
      jsfiddle: true, // 启用嵌入 jsfiddle 语法 @[jsfiddle](user/id)
      npmTo: true, // 启用 npm-to 容器  ::: npm-to
      demo: true, // 启用 demo 容器  ::: demo
      repl: {
        // 启用 代码演示容器
        python: true,
      },
      math: {
        type: 'katex',
      },
      // chartjs: true, // 启用 chart.js
      // echarts: true, // 启用 ECharts
      // mermaid: true, // 启用 mermaid
      // flowchart: true, // 启用 flowchart
      image: {
        figure: true, // 启用 figure
        lazyload: true, // 启用图片懒加载
        mark: true, // 启用图片标记
        size: true, // 启用图片大小
      },
      imageSize: 'local', // 启用 自动填充 图片宽高属性，避免页面抖动
    },

    comment: {
      provider: 'Giscus',
      comment: true,
      repo: 'yxzlwz/blog',
      repoId: 'R_kgDOJq1RYg',
      category: 'Announcements',
      categoryId: 'DIC_kwDOJq1RYs4CW7t8',
      mapping: 'pathname',
      reactionsEnabled: true,
      inputPosition: 'top',
    },
  }),
});
