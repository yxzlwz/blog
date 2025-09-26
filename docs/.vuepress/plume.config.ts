import { defineThemeConfig } from 'vuepress-theme-plume';
import { enNavbar, zhNavbar } from './navbar';
import { enNotes, zhNotes } from './notes';

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

  /**
   * 文章版权信息
   * @see https://theme-plume.vuejs.press/guide/features/copyright/
   */
  copyright: 'CC-BY-NC-SA-4.0',

  prevPage: false,
  nextPage: false,
  createTime: true,

  locales: {
    '/': {
      /**
       * @see https://theme-plume.vuejs.press/config/basic/#profile
       */
      profile: {
        avatar: '/head.png',
        name: '异想之旅',
        // description: '欢迎来到异想之旅的新家！',
        circle: true,
        location: '上海',
        organization: '上海纽约大学',
      },

      navbar: zhNavbar,
      notes: zhNotes,
      footer: {
        message: `<div class="footer-ua"><img src="/ua.svg" alt="Ukraine" /><span>在俄罗斯对乌克兰发动的野蛮的侵略战争中矢志不渝地支持乌克兰</span></div>`,
        copyright: `©️ 异想之旅 2018-${new Date().getFullYear()} | <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>`,
      },
      // bulletin: {
      //   layout: 'top-right',
      //   contentType: 'markdown',
      //   title: '',
      //   content: '',
      // },
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

      navbar: enNavbar,
      notes: enNotes,

      footer: {
        message:
          '<div class="footer-ua"><img src="/ua.svg" alt="Ukraine" /><span>Firmly stand with Ukraine against Russia\'s brutal invasion.</span></div>',
        copyright: `©️ yxzlwz 2018-${new Date().getFullYear()} | <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>`,
      },
    },
  },
});
