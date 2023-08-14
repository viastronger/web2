<template>
  <div class="img-placeholder">
    <div class="banner-box banner-box1">
      <img v-scrollBot src="@/assets/images/student/01.png" alt="" />
      <div class="swiper-box swiper-box1" :class="{ active: swiperBox1Show }">
        <TheSwiper :bannerList="bannerList1" :slidesPerView="3"></TheSwiper>
      </div>
    </div>

    <div class="banner-box banner-box2">
      <img v-scrollBot src="@/assets/images/student/02.png" alt="" />
      <div class="swiper-box swiper-box2">
        <TheSwiper :bannerList="bannerList2" :slidesPerView="1"></TheSwiper>
      </div>
    </div>

    <div class="banner-box banner-box3">
      <img v-scrollBot src="@/assets/images/student/03.png" alt="" />
      <div class="swiper-box swiper-box3">
        <TheSwiper
          :bannerList="bannerList3"
          :slidesPerView="4"
          :spaceBetween="40"
        ></TheSwiper>
      </div>
    </div>
    <img v-scrollBot src="@/assets/images/student/04.png" alt="" />
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, watch, onMounted, onUnmounted } from "vue";
import { debounce } from "lodash-es";
import TheSwiper from "@/components/TheSwiper.vue";
import bannerList1 from "@/assets/images/student/banner1";
import bannerList2 from "@/assets/images/student/banner2";
import bannerList3 from "@/assets/images/student/banner3";

const swiperBox1Show = ref(false);

const baseWidth = 1920;
const imgBox1Height = 1136;
const imgBox2Height = 1033;
const imgBox3Height = 1380;

const swiperBox1Width = ref("1680px");
const swiperBox1Height = ref("664px");
const swiperBox1Bot = ref("197px");
const swiperBot1Radio = 197 / imgBox1Height;
const swiperBox1WidthRadio = 1680 / baseWidth;
const swiperBox1HeightRadio = 664 / imgBox1Height;

const swiperBox2Width = ref("748px");
const swiperBox2Height = ref("559px");
const swiperBox2Left = ref("119px");
const swiperBox2Bot = ref("197px");
const swiperBox2LeftRadio = 119 / baseWidth;
const swiperBox2BotRadio = 197 / imgBox2Height;
const swiperBox2WidthRadio = 748 / baseWidth;
const swiperBox2HeightRadio = 559 / imgBox2Height;

const swiperBox3Width = ref("1680px");
const swiperBox3Height = ref("272px");
const swiperBox3Bot = ref("197px");
const swiperBox3BotRadio = 197 / imgBox3Height;
const swiperBox3WidthRadio = 1680 / baseWidth;
const swiperBox3HeightRadio = 272 / imgBox3Height;

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
  const { clientWidth: box2Width, clientHeight: box2Height } = document.querySelector(
    ".banner-box2"
  );

  const { clientWidth: box3Width, clientHeight: box3Height } = document.querySelector(
    ".banner-box3"
  );

  swiperBox1Width.value = box1Width * swiperBox1WidthRadio + "px";
  swiperBox1Height.value = box1Height * swiperBox1HeightRadio + "px";
  swiperBox1Bot.value = box1Height * swiperBot1Radio + "px";

  swiperBox2Width.value = box2Width * swiperBox2WidthRadio + "px";
  swiperBox2Height.value = box2Height * swiperBox2HeightRadio + "px";
  swiperBox2Left.value = box2Width * swiperBox2LeftRadio + "px";
  swiperBox2Bot.value = box2Height * swiperBox2BotRadio + "px";

  swiperBox3Width.value = box3Width * swiperBox3WidthRadio + "px";
  swiperBox3Height.value = box3Height * swiperBox3HeightRadio + "px";
  swiperBox3Bot.value = box3Height * swiperBox3BotRadio + "px";

  swiperBox1Show.value = true;
}, 300);
</script>
<style lang="scss" scoped>
.banner-box {
  overflow: hidden;
  position: relative;
  .swiper-box {
    position: absolute;
  }
}

.swiper-box1 {
  bottom: v-bind(swiperBox1Bot);
  left: 50%;
  transform: translateX(-50%);
  width: v-bind(swiperBox1Width);
  height: v-bind(swiperBox1Height);
  opacity: 0;
  transition: opacity 0.5s;
  &.active {
    opacity: 1;
  }
}

.swiper-box2 {
  left: v-bind(swiperBox2Left);
  bottom: v-bind(swiperBox2Bot);
  width: v-bind(swiperBox2Width);
  height: v-bind(swiperBox2Height);
}

.swiper-box3 {
  bottom: v-bind(swiperBox3Bot);
  left: 50%;
  transform: translateX(-50%);
  width: v-bind(swiperBox3Width);
  height: v-bind(swiperBox3Height);
}
</style>
