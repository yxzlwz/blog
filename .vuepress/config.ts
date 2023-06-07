import { defineUserConfig } from 'vuepress';
import recoTheme from 'vuepress-theme-reco';
import katex from 'markdown-it-katex';
import { seoPlugin } from 'vuepress-plugin-seo2';
import { sitemapPlugin } from 'vuepress-plugin-sitemap2';

export default defineUserConfig({
  title: '异想之旅のBlog',
  description: '异想之旅的技术分享',
  head: [
    ['script', { src: '/js/main.js' }],
    ['link', { rel: 'stylesheet', href: '/css/katex.min.css' }],
    ['link', { rel: 'stylesheet', href: '/css/github-markdown.min.css' }],
    [
      'meta',
      {
        name: 'description',
        content: '异想之旅官网 异想之旅王子的技术分享博客',
      },
    ],
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: '异想之旅王子',
    authorAvatar: '/head.png',
    lastUpdatedText: '',
    series: {
      '/docs/yxzl/projects/': ['yiyan', 'lightmysql'],
    },
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/docs/yxzl/projects/yiyan' },
      { text: 'About', link: '/docs/yxzl/about' },
      { text: 'Friend Link', link: '/docs/yxzl/friendlink' },
      // {
      //   text: 'Docs',
      //   children: [
      //     { text: 'vuepress-reco', link: '/docs/theme-reco/theme' },
      //     { text: 'vuepress-theme-reco', link: '/blogs/other/guide' },
      //   ],
      // },
    ],
    commentConfig: {
      type: 'giscus',
      options: {
        repo: 'yxzlwz/blog',
        repoId: 'R_kgDOJq1RYg',
        category: 'Announcements',
        categoryId: 'DIC_kwDOJq1RYs4CW7t8',
      },
    },
    algolia: {
      appId: 'N32QD6F9U4',
      apiKey: '2b0bc41ff2874019c52f998bd0d9ba89',
      indexName: 'yixiangzhilv',
      inputSelector: '### REPLACE ME ####',
      algoliaOptions: { facetFilters: ['lang:$LANG'] },
      debug: false, // Set debug to true if you want to inspect the dropdown
    },
    // bulletin: {
    //   body: [
    //     {
    //       type: 'text',
    //       content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
    //       style: 'font-size: 12px;',
    //     },
    //   ],
    // },
  }),
  plugins: [
    seoPlugin({
      hostname: 'https://www.yixiangzhilv.com',
      author: {
        name: '异想之旅王子',
        email: 'mail@yixiangzhilv.com',
      },
    }),
    sitemapPlugin({
      hostname: 'https://www.yixiangzhilv.com',
      changefreq: 'weekly',
    }),
  ],
  extendsMarkdown: md => {
    md.set({ html: true });
    md.use(katex);
  },
});
