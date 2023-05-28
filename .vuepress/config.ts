import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import recoTheme from 'vuepress-theme-reco';

export default defineUserConfig({
  title: '异想之旅のBlog',
  description: '异想之旅的技术分享',
  head: [['script', { src: '/js/main.js' }]],
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
      '/docs/yxzl/': [
        '/docs/yxzl/about',
        // {
        //   text: '我的项目',
        //   children: ['/docs/yxzl/projects/*'],
        // },
      ],
    },
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/docs/yxzl/about' },
      // { text: 'Categories', link: '/categories/reco/1/' },
      // { text: 'Tags', link: '/tags/tag1/1/' },
      // {
      //   text: 'Docs',
      //   children: [
      //     { text: 'vuepress-reco', link: '/docs/theme-reco/theme' },
      //     { text: 'vuepress-theme-reco', link: '/blogs/other/guide' },
      //   ],
      // },
    ],
    // bulletin: {
    //   body: [
    //     {
    //       type: 'text',
    //       content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
    //       style: 'font-size: 12px;',
    //     },
    //   ],
    // },
    // commentConfig: {
    //   type: 'valie',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
