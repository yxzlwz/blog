/**
 * 查看以下文档了解主题配置
 * - @see https://theme-plume.vuejs.press/config/intro/ 配置说明
 * - @see https://theme-plume.vuejs.press/config/theme/ 主题配置项
 *
 * 请注意，对此文件的修改不会重启 vuepress 服务，而是通过热更新的方式生效
 * 但同时部分配置项不支持热更新，请查看文档说明
 * 对于不支持热更新的配置项，请在 `.vuepress/config.ts` 文件中配置
 *
 * 特别的，请不要在两个配置文件中重复配置相同的项，当前文件的配置项会覆盖 `.vuepress/config.ts` 文件中的配置
 */

import { defineThemeConfig } from 'vuepress-theme-plume';
import { enNavbar, zhNavbar } from './navbar';
import { enNotes, zhNotes } from './notes';

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  // logo: '/head.png',

  appearance: true, // 配置 深色模式

  social: [{ icon: 'github', link: 'https://github.com/yxzlwz' }],
  // navbarSocialInclude: ['github'], // 允许显示在导航栏的 social 社交链接
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
        message:
          '<div style="display: flex; align-items: center; justify-content: center; font-size: 1.1em"><span style="font-size: 1.7em">🇺🇦</span><span style="margin-left: .5em">在俄罗斯对乌克兰发动的野蛮的侵略战争中矢志不渝地支持乌克兰</span></div>',
        copyright: '',
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
          '<div style="display: flex; align-items: center; justify-content: center; font-size: 1.1em"><span style="font-size: 1.7em">🇺🇦</span><span style="margin-left: .5em">Firmly stand with Ukraine against Russia\'s brutal invasion.</span></div>',
        copyright: '',
      },
    },
  },
});
