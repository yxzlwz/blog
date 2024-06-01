import { defineUserConfig } from 'vuepress';
import recoTheme from 'vuepress-theme-reco';
import katex from 'markdown-it-katex';
// import { viteBundler } from '@vuepress/bundler-vite';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { seoPlugin } from 'vuepress-plugin-seo2';
import { sitemapPlugin } from 'vuepress-plugin-sitemap2';

const hostname = 'https://blog.yixiangzhilv.com';

export default defineUserConfig({
//   bundler: viteBundler(),
  title: '异想之旅のBlog',
  shouldPrefetch: false,
  head: [
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
  lang: 'zh-CN',
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: '异想之旅王子',
    authorAvatar: '/head.png',
    repo: 'yxzlwz/blog',
    docsBranch: 'master',
    lastUpdatedText: '',
    series: {
      '/docs/yxzl/projects/': [
        'services',
        'cloudreve',
        'lightmysql',
        'netdist',
      ],
      '/docs/genuine-oj/': [
        'introduction',
        {
          text: '部署',
          children: [
            'before_start',
            'frontend',
            '/docs/genuine-oj/backend.md',
            'judger',
            'docker',
          ],
          disableSort: true,
        },
        {
          text: '使用教程和说明',
          children: [
            'about_hidden',
            '/docs/genuine-oj/add_judge_language.md',
            'test_case',
            'end_relationship',
            'import_problem',
            'bug_and_feature',
          ],
        },
      ],
    },
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/docs/yxzl/projects/services' },
      { text: 'About', link: '/docs/yxzl/about' },
      { text: 'Friend Link', link: '/docs/yxzl/friendlink' },
      { text: 'Services', link: 'https://www.yixiangzhilv.com/' },
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
      appId: 'JUYHKBPOI3',
      apiKey: 'c091ec1bf2a040f0d4a7b149ac98085c',
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
    googleAnalyticsPlugin({
      id: 'G-YNWN3VVCTL',
    }),
    seoPlugin({
      hostname: hostname,
      author: {
        name: '异想之旅王子',
        email: 'mail@yixiangzhilv.com',
      },
    }),
    sitemapPlugin({
      hostname: hostname,
      changefreq: 'weekly',
    }),
  ],
  extendsMarkdown: md => {
    md.set({ html: true });
    md.use(katex);
  },
});
