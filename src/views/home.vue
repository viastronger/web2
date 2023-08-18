<template>
  <section class="img-placeholder">
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
          isScrollBot
        ></TheSwiper>
      </div>
    </div>

    <div class="banner-box banner-box2">
      <img src="@/assets/images/home/04.png" alt="" />
      <div class="swiper-box swiper-box2">
        <TheSwiper :bannerList="bannerList2" :autoplay="true" :loop="false"></TheSwiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import useResizeSetSwiper from "@/hooks";

import TheSwiper from "@/components/TheSwiper.vue";
import bannerList from "@/assets/images/home/banner";
import bannerList1 from "@/assets/images/home/banner1";
import bannerList2 from "@/assets/images/home/banner2";

const baseWidth = 1920;
const imgBox1Height = 884;
const imgBox2Height = 1220;

/**
 * radio: 算出宽高比例，通过比例计算当前应该给 swiper-box 设置的宽高
 * 设计图上面轮播图区域的 宽度 / 轮播图底下的背景图片宽度
 * 设计图上面轮播图区域的 高度 / 轮播图底下的背景图片高度
 */

const swiperOption = reactive({
  swiper1: {
    index: 1,
    x: [{ prop: "width", radio: 1920 / baseWidth }],
    y: [{ prop: "height", radio: 612 / imgBox1Height }],
  },
  swiper2: {
    index: 2,
    x: [{ prop: "width", radio: 1685 / baseWidth }],
    y: [
      { prop: "height", radio: 830 / imgBox2Height },
      { prop: "bottom", radio: 100 / imgBox2Height },
    ],
  },
});

useResizeSetSwiper(swiperOption);
</script>

<style lang="scss" scoped>
@import "~@/style/common";

.swiper-box1 {
  bottom: 0;
  width: v-bind("swiperOption.swiper1.width");
  height: v-bind("swiperOption.swiper1.height");
}

.swiper-box2 {
  bottom: v-bind("swiperOption.swiper2.bottom");
  width: v-bind("swiperOption.swiper2.width");
  height: v-bind("swiperOption.swiper2.height");
}
</style>
