import { onMounted } from 'vue';
import { defineClientConfig, usePageData } from '@vuepress/client';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    let yiyan;
    fetch('https://api.yixiangzhilv.com/yiyan/sentence/')
      .then(res => res.json())
      .then(data => {
        if (data.provenance && data.author) {
          data.from_show = `${data.provenance} · ${data.author}`;
        } else {
          data.from_show = `${data.provenance || data.author}`;
        }
        yiyan = `${data.content} - 「${data.from_show}」`;

        const page = usePageData();
        page.value.tagline = yiyan;
      });
    router.afterEach((to, from) => {
      setTimeout(() => {
        const page = usePageData();
        page.value.tagline = yiyan;
      });
    });
  },
  setup() {
    onMounted(() => {
      polyfillCountryFlagEmojis();
    });
  },
  rootComponents: [],
});
