import { defineNavbarConfig } from 'vuepress-theme-plume';

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  {
    text: '文章',
    items: [
      { text: '技术博客', link: '/tech/' },
      { text: '随笔', link: '/essay/' },
      { text: '线性代数', link: '/en/linear_algebra/' },
    ],
  },
  // { text: '项目', link: '/projects.md' },
  // { text: '关于', link: '/about/README.md' },
  { text: '关于我', link: 'https://i.yxzl.dev/' },
  { text: '友链', link: '/friends/' },
  {
    text: '更多',
    items: [
      { text: '技术文档', link: 'https://docs.yxzl.dev/' },
    ],
  },
]);

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  {
    text: 'Articles',
    items: [
      { text: 'Tech Blog', link: '/en/tech/' },
      { text: 'Essay', link: '/en/essay/' },
      { text: 'Linear Algebra', link: '/en/linear_algebra/' },
    ],
  },
  // { text: 'Projects', link: '/en/projects.md' },
  // { text: 'About', link: '/en/about/' },
  { text: 'About Me', link: 'https://i.yxzl.dev/' },
  { text: 'Friends', link: '/en/friends/' },
  // {
  //   text: 'More',
  //   items: [{ text: 'Python Tutorial', link: 'https://python.yxzl.dev/' }],
  // },
]);
