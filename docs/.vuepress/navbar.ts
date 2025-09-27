import { defineNavbarConfig } from 'vuepress-theme-plume';

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '关于', link: '/about/' },
  { text: '友链', link: '/friends/' },
  {
    text: '更多',
    items: [{ text: 'Python 入门文档', link: 'https://python.yxzl.dev/' }],
  },
]);

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  { text: 'Blog', link: '/en/blog/' },
  { text: 'About', link: '/en/about/' },
  { text: 'Friends', link: '/en/friends/' },
  {
    text: 'More',
    items: [{ text: 'Python Tutorial', link: 'https://python.yxzl.dev/' }],
  },
]);
