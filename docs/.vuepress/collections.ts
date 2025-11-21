import { defineCollections } from 'vuepress-theme-plume';

export const zhCollections = defineCollections([
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

export const enCollections = defineCollections([
  {
    type: 'post',
    dir: 'tech',
    title: 'Tech Blog',
    link: '/tech/',
    linkPrefix: '/article/',
    tagsLink: '/en/tech/tags/',
    archivesLink: '/en/tech/archives/',
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
]);
