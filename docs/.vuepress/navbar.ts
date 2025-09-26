import { defineNavbarConfig } from 'vuepress-theme-plume';

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blogs/' },
  { text: '标签', link: '/blogs/tags/' },
  { text: '关于', link: '/about/' },
  { text: '友链', link: '/friends/' },
  {
    text: '更多',
    items: [{ text: 'Python 入门文档', link: 'https://python.yxzl.dev/' }],
  },
]);

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  { text: 'Blog', link: '/en/blogs/' },
  { text: 'Tags', link: '/en/blogs/tags/' },
  { text: 'Archives', link: '/en/blogs/archives/' },
  {
    text: 'Notes',
    items: [{ text: 'Demo', link: '/en/notes/demo/README.md' }],
  },
]);
