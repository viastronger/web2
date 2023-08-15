<template>
  <div class="img-placeholder">
    <div class="banner-box banner-box1">
      <img v-scrollBot src="@/assets/images/query/06.png" alt="" />
      <div class="swiper-box swiper-box1" :class="{ active: swiperBox1Show }">
        <a href="http://www.rsj.sh.gov.cn/xjd/index600.jsp" target="_blank">
          <img src="@/assets/images/query/01.png" alt="" />
        </a>
        <a href="http://na.mofyi.com/na/login/search.html" target="_blank">
          <img src="@/assets/images/query/02.png" alt="" />
        </a>
        <img v-scrollBot src="@/assets/images/query/03.png" alt="" />
      </div>
    </div>
    <img v-scrollBot src="@/assets/images/query/04.png" alt="" />
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { debounce } from "lodash-es";

const swiperBox1Show = ref(false);

const baseWidth = 1920;
const imgBox1Height = 1317;

const swiperBox1Width = ref("1770px");
const swiperBox1Height = ref("817px");
const swiperBox1Bot = ref("219px");
const swiperBox1WidthRadio = 1770 / baseWidth;
const swiperBox1HeightRadio = 817 / imgBox1Height;
const swiperBot1Radio = 219 / imgBox1Height;

onMounted(() => {
  setTimeout(resizeSetHeight, 0);
  window.addEventListener("resize", resizeSetHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeSetHeight);
});

const resizeSetHeight = debounce(() => {
  const { clientWidth: box1Width, clientHeight: box1Height } = document.querySelector(
    ".banner-box1"
  );

  swiperBox1Width.value = box1Width * swiperBox1WidthRadio + "px";
  swiperBox1Height.value = box1Height * swiperBox1HeightRadio + "px";
  swiperBox1Bot.value = box1Height * swiperBot1Radio + "px";

  swiperBox1Show.value = true;
}, 300);
</script>
<style lang="scss" scoped>
@import "~@/style/common";

.swiper-box {
  display: flex;
  justify-content: space-between;
  bottom: v-bind(swiperBox1Bot);
  width: v-bind(swiperBox1Width);
  height: v-bind(swiperBox1Height);
  a,
  > img {
    width: 33%;
  }
}

.swiper-box1 {
  opacity: 0;
  transition: opacity 0.5s;
  &.active {
    opacity: 1;
  }
}
</style>
