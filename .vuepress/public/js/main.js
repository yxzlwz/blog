// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'G-YNWN3VVCTL');

// 一言
if (location.pathname === '/') {
  fetch('https://api.yixiangzhilv.com/yiyan/sentence/')
    .then(res => res.json())
    .then(res => {
      if (res.provenance && res.author) {
        res.from_show = `${res.provenance} · ${res.author}`;
      } else {
        res.from_show = `${res.provenance || res.author}`;
      }
      const tagline = document.querySelector(
        '#app > div > div > div > div.home-wrapper > section.banner-brand__wrapper > div > p.tagline'
      );
      if (tagline) {
        tagline.innerHTML = `${res.content} - 「${res.from_show}」`;
      }
    })
    .catch(error => {
      console.log('请求发生错误:', error);
    });
}
