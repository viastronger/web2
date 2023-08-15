<template>
  <div class="img-placeholder">
    <TheSwiper :bannerList="bannerList1" :slidesPerView="1"></TheSwiper>

    <img v-scrollBot src="@/assets/images/home/01.png" alt="" />
    <img v-scrollBot src="@/assets/images/home/02.png" alt="" />

    <div class="banner-box banner-box1">
      <img src="@/assets/images/home/03.png" alt="" />
      <div class="swiper-box swiper-box1">
        <TheSwiper
          :bannerList="bannerList"
          :autoplay="true"
          :slidesPerView="1"
          v-scrollBot
        ></TheSwiper>
      </div>
    </div>

    <div class="banner-box banner-box2">
      <img src="@/assets/images/home/04.png" alt="" />
      <div class="swiper-box swiper-box2">
        <TheSwiper :bannerList="bannerList2" :autoplay="true" :loop="false"></TheSwiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { debounce } from "lodash-es";
import TheBanner from "@/components/TheBanner.vue";
import TheSwiper from "@/components/TheSwiper.vue";
import { useRouter } from "vue-router";

import bannerList from "@/assets/images/home/banner";
import bannerList1 from "@/assets/images/home/banner1";
import bannerList2 from "@/assets/images/home/banner2";

const router = useRouter();

const baseWidth = 1920;
const imgBox1Height = 884;
const imgBox2Height = 1220;

const swiperBox1Width = ref("1920px");
const swiperBox1Height = ref("612px");
const swiperBox1WidthRadio = 1920 / baseWidth;
const swiperBox1HeightRadio = 612 / imgBox1Height;

const swiperBox2Width = ref("1685px");
const swiperBox2Height = ref("830px");
const swiperBox2Bot = ref("100px");
const swiperBox2WidthRadio = 1685 / baseWidth;
const swiperBox2HeightRadio = 830 / imgBox2Height;
const swiperBot2Radio = 100 / imgBox2Height;

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

  swiperBox1Width.value = box1Width * swiperBox1WidthRadio + "px";
  swiperBox1Height.value = box1Height * swiperBox1HeightRadio + "px";

  swiperBox2Width.value = box2Width * swiperBox2WidthRadio + "px";
  swiperBox2Height.value = box2Height * swiperBox2HeightRadio + "px";
  swiperBox2Bot.value = box2Height * swiperBot2Radio + "px";
}, 300);
</script>

<style lang="scss" scoped>
@import "~@/style/common";

.swiper-box1 {
  bottom: 0;
  width: v-bind(swiperBox1Width);
  height: v-bind(swiperBox1Height);
}

.swiper-box2 {
  bottom: v-bind(swiperBox2Bot);
  width: v-bind(swiperBox2Width);
  height: v-bind(swiperBox2Height);
}
</style>
