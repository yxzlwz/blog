import { defineCollections } from 'vuepress-theme-plume';

export default defineCollections([
  {
    type: 'post',
    dir: 'tech',
    title: '技术博客',
    link: '/tech/',
    linkPrefix: '/article/',
    tagsLink: '/tech/tags/',
    archivesLink: '/tech/archives/',
    categories: false,
    exclude: ['**/archive/*.md'],
  },
  {
    type: 'post',
    dir: 'essay',
    title: '随笔',
    link: '/essay/',
    linkPrefix: '/article/',
    tagsLink: '/essay/tags/',
    archivesLink: '/essay/archives/',
    categories: false,
  },
  { type: 'doc', dir: 'about', title: '关于', autoFrontmatter: false },
  {
    type: 'doc',
    dir: 'genuine-oj',
    title: 'Genuine OJ',
    autoFrontmatter: false,
    sidebar: [
      '',
      {
        text: '部署',
        items: [
          'before-start',
          'frontend',
          'backend',
          'judger',
          'end-relationship',
          'docker',
        ],
      },
      {
        text: '使用说明',
        items: [
          'add-judge-language',
          'test-case',
          'about-hidden',
          'import-problem',
          'bug-and-feature',
        ],
      },
    ],
  },
]);
