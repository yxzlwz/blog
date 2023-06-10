import { onMounted } from 'vue';
import { defineClientConfig, usePageData } from '@vuepress/client';

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    const page = usePageData();
    fetch('https://api.yixiangzhilv.com/yiyan/sentence/')
      .then(res => res.json())
      .then(data => {
        if (data.provenance && data.author) {
          data.from_show = `${data.provenance} · ${data.author}`;
        } else {
          data.from_show = `${data.provenance || data.author}`;
        }
        page.value.tagline = `${data.content} - 「${data.from_show}」`;
      });
    // console.log(localStorage.getItem('theme'));
    // router.afterEach((to, from) => {
    //   const get_yiyan = () => {
    //     if (!localStorage.getItem('yiyan_next')) {
    //       fetch('https://api.yixiangzhilv.com/yiyan/sentence/')
    //         .then(res => res.json())
    //         .then(res => {
    //           if (localStorage.getItem('yiyan')) {
    //             localStorage.setItem('yiyan_next', JSON.stringify(res));
    //           } else {
    //             localStorage.setItem('yiyan', JSON.stringify(res));
    //             get_yiyan();
    //           }
    //         });
    //     }
    //   };
    //   get_yiyan();
    //   if (to.path === '/') {
    //     let data = JSON.parse(localStorage.getItem('yiyan'));
    //     localStorage.removeItem('yiyan');
    //     if (!data) {
    //       data = {
    //         content:
    //           '明知道总有一日 所有的悲欢都将离我而去 我依然竭力地搜索 搜索那些美丽的 值得为她活一次的记忆',
    //         author: '席慕容',
    //       };
    //     }
    //     if (data.provenance && data.author) {
    //       data.from_show = `${data.provenance} · ${data.author}`;
    //     } else {
    //       data.from_show = `${data.provenance || data.author}`;
    //     }
    //     const tagline = document.querySelector(
    //       '#app > div > div > div > div.home-wrapper > section.banner-brand__wrapper > div > p.tagline'
    //     );
    //     if (tagline) {
    //       tagline.innerHTML = `${data.content} - 「${data.from_show}」`;
    //     }
    //     if (
    //       localStorage.getItem('yiyan_next') &&
    //       !localStorage.getItem('yiyan')
    //     ) {
    //       localStorage.setItem('yiyan', localStorage.getItem('yiyan_next'));
    //       localStorage.removeItem('yiyan_next');
    //     }
    //   }
    // });
  },
  setup() {
    // const get_yiyan = () => {
    //   if (!localStorage.getItem('yiyan_next')) {
    //     fetch('https://api.yixiangzhilv.com/yiyan/sentence/')
    //       .then(res => res.json())
    //       .then(res => {
    //         if (localStorage.getItem('yiyan')) {
    //           localStorage.setItem('yiyan_next', JSON.stringify(res));
    //         } else {
    //           localStorage.setItem('yiyan', JSON.stringify(res));
    //           get_yiyan();
    //         }
    //       });
    //   }
    // };
    // get_yiyan();

    // const page = usePageData();
    // let data = JSON.parse(localStorage.getItem('yiyan'));
    // localStorage.removeItem('yiyan');
    // if (!data) {
    //   data = {
    //     content:
    //       '明知道总有一日 所有的悲欢都将离我而去 我依然竭力地搜索 搜索那些美丽的 值得为她活一次的记忆',
    //     author: '席慕容',
    //   };
    // }
    // if (data.provenance && data.author) {
    //   data.from_show = `${data.provenance} · ${data.author}`;
    // } else {
    //   data.from_show = `${data.provenance || data.author}`;
    // }
    // page.value.tagline = `${data.content} - 「${data.from_show}」`;

    onMounted(() => {
      // Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-YNWN3VVCTL');
    });
  },
  rootComponents: [],
});
