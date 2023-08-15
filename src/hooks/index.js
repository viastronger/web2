import { onMounted, onUnmounted } from "vue";
import { debounce } from "lodash-es";

export default function useResizeSetSwiper(swiperOption) {
  onMounted(() => {
    setTimeout(resizeSetSwiper, 0);
    window.addEventListener("resize", resizeSetSwiper);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resizeSetSwiper);
  });


  const resizeSetSwiper = debounce(() => {

    Object.keys(swiperOption).forEach((key) => {

      const swiperBox = swiperOption[key]

      const { clientWidth, clientHeight } = document.querySelector(`.${swiperBox.el || 'banner-box'}${swiperBox.index}`);

      swiperBox.x && swiperBox.x.forEach(l => {
        swiperBox[l.prop] = clientWidth * l.radio + "px";
      });

      swiperBox.y && swiperBox.y.forEach(l => {
        swiperBox[l.prop] = clientHeight * l.radio + "px";
      });
    });
  }, 300);
}