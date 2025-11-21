import { defineClientConfig } from 'vuepress/client';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

import './style.scss';

const updateYiyan = () => {
  if (window.location.pathname === '/') {
    fetch('https://api.yixiangzhilv.com/yiyan/sentence/get/')
      .then(res => res.json())
      .then(data => {
        if (data.provenance && data.author) {
          data.from_show = `${data.provenance} · ${data.author}`;
        } else {
          data.from_show = `${data.provenance || data.author}`;
        }
        const yiyan = `${data.content} - 「${data.from_show}」`;
        const element = document.getElementsByClassName('hero-text')[0];
        element.innerHTML = yiyan;
      })
      .catch(err => {
        // fallback to hitokoto
        console.error(err);
        fetch('https://international.v1.hitokoto.cn/')
          .then(res => res.json())
          .then(data => {
            if (data.provenance && data.author) {
              data.from_show = `${data.from} · ${data.from_who}`;
            } else {
              data.from_show = `${data.from || data.from_who}`;
            }
            const yiyan = `${data.hitokoto} - 「${data.from_show}」`;
            const element = document.getElementsByClassName('hero-text')[0];
            element.innerHTML = yiyan;
          });
      });
  } else if (window.location.pathname === '/en/') {
    fetch('https://thequoteshub.com/api/?format=json&lang=en')
      .then(res => res.json())
      .then(data => {
        const yiyan = `${data.text} - 「${data.author}」`;
        const element = document.getElementsByClassName('hero-text')[0];
        element.innerHTML = yiyan;
      });
  }
};

export default defineClientConfig({
  enhance({ app }) {
    // built-in components
    // app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`
    // your custom components
    // app.component('CustomComponent', CustomComponent)
  },
  setup() {
    onMounted(() => {
      updateYiyan();
      const route = useRoute();
      watch(route, updateYiyan);
    });
  },
});
