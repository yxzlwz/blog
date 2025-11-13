import { defineThemeConfig } from 'vuepress-theme-plume';
import { enNavbar, zhNavbar } from './navbar';
import collections from './collections';

export default defineThemeConfig({
  // logo: '/head.png',

  appearance: true,

  social: [
    { icon: 'github', link: 'https://github.com/yxzlwz' },
    { icon: 'twitter', link: 'https://twitter.com/yxzlwz' },
    { icon: 'instagram', link: 'https://www.instagram.com/yxzlwz/' },
    { icon: 'telegram', link: 'https://t.me/yxzlwz' },
  ],
  navbarSocialInclude: ['github'],
  // aside: true, // 页内侧边栏， 默认显示在右侧
  // outline: [2, 3], // 页内大纲， 默认显示 h2, h3

  copyright: 'CC-BY-NC-SA-4.0',

  prevPage: false,
  nextPage: false,
  createTime: true,
  locales: {
    '/': {
      profile: {
        avatar: '/head.png',
        name: '异想之旅',
        // description: '欢迎来到异想之旅的新家！',
        circle: true,
        location: '上海',
        organization: '上海纽约大学',
      },
      collections,
      navbar: zhNavbar,
      footer: {
        message: `<img src="/ua.svg" alt="Ukraine" /> 在俄罗斯对乌克兰发动的野蛮的侵略战争中矢志不渝地支持乌克兰`,
        copyright: `©️ 异想之旅 2018-${new Date().getFullYear()} | <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>`,
      },
    },
    '/en/': {
      profile: {
        avatar: '/head.png',
        name: 'yxzlwz',
        description: '',
        circle: true,
        location: 'Shanghai, China',
        organization: 'New York University Shanghai',
      },
      collections: [
        {
          type: 'post',
          dir: 'tech',
          title: 'Tech Blog',
          link: '/tech/',
          linkPrefix: '/article/',
          tagsLink: '/en/blog/tags/',
          archivesLink: '/en/blog/archives/',
          categories: false,
        },
        {
          type: 'post',
          dir: 'essay',
          title: 'Essay',
          link: '/essay/',
          linkPrefix: '/article/',
          tagsLink: '/en/essay/tags/',
          archivesLink: '/en/essay/archives/',
          categories: false,
        },
        { type: 'doc', dir: 'about', title: 'About', autoFrontmatter: false },
      ],
      navbar: enNavbar,
      footer: {
        message: `<img src="/ua.svg" alt="Ukraine" /> Firmly stand with Ukraine against Russia\'s brutal invasion.`,
        copyright: `©️ yxzlwz 2018-${new Date().getFullYear()} | <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>`,
      },
    },
  },
});
