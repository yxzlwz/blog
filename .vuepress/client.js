import { onMounted } from 'vue';
import { defineClientConfig, usePageData } from '@vuepress/client';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';

export default defineClientConfig({
  setup() {
    onMounted(() => {
      polyfillCountryFlagEmojis();

      if (window.location.pathname === '/')
        fetch('https://api.yixiangzhilv.com/yiyan/sentence/')
          .then(res => res.json())
          .then(data => {
            if (data.provenance && data.author) {
              data.from_show = `${data.provenance} · ${data.author}`;
            } else {
              data.from_show = `${data.provenance || data.author}`;
            }
            const yiyan = `${data.content} - 「${data.from_show}」`;
            const element = document.getElementsByClassName('tagline')[0];
            element.innerHTML = yiyan;
          });
    });
  },
  rootComponents: [],
});
