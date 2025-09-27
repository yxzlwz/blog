import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume';

/* =================== locale: zh-CN ======================= */

export const zhNotes = defineNotesConfig({
  dir: 'docs',
  link: '/',
  notes: [
    defineNoteConfig({
      dir: 'about',
      link: '/about',
    }),
  ],
});

export const enNotes = defineNotesConfig({
  dir: 'en/docs',
  link: '/en/',
  notes: [
    defineNoteConfig({
      dir: 'about',
      link: '/about',
    }),
  ],
});
