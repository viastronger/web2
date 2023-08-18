<template>
  <section class="img-placeholder">
    <div class="banner-box banner-box1">
      <img v-scrollBot src="@/assets/images/student/01.png" alt="" />
      <div class="swiper-box swiper-box1">
        <TheSwiper :bannerList="bannerList1" :slidesPerView="3" :loop="false"></TheSwiper>
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
  </section>
</template>

<script setup>
import { ref, reactive, toRefs, watch, onMounted, onUnmounted } from "vue";
import useResizeSetSwiper from "@/hooks";

import TheSwiper from "@/components/TheSwiper.vue";
import bannerList1 from "@/assets/images/student/banner1";
import bannerList2 from "@/assets/images/student/banner2";
import bannerList3 from "@/assets/images/student/banner3";

const baseWidth = 1920;
const imgBox1Height = 1136;
const imgBox2Height = 1033;
const imgBox3Height = 1380;

const swiperOption = reactive({
  swiper1: {
    index: 1,
    x: [{ prop: "width", radio: 1680 / baseWidth }],
    y: [
      { prop: "height", radio: 664 / imgBox1Height },
      { prop: "bottom", radio: 197 / imgBox1Height },
    ],
  },
  swiper2: {
    index: 2,
    x: [
      { prop: "width", radio: 748 / baseWidth },
      { prop: "left", radio: 119 / baseWidth },
    ],
    y: [
      { prop: "height", radio: 559 / imgBox2Height },
      { prop: "bottom", radio: 197 / imgBox2Height },
    ],
  },
  swiper3: {
    index: 3,
    x: [{ prop: "width", radio: 1680 / baseWidth }],
    y: [
      { prop: "height", radio: 272 / imgBox3Height },
      { prop: "bottom", radio: 197 / imgBox3Height },
    ],
  },
});

useResizeSetSwiper(swiperOption);
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
  transform: translateX(-50%);
  left: 50%;
  bottom: v-bind("swiperOption.swiper1.bottom");
  width: v-bind("swiperOption.swiper1.width");
  height: v-bind("swiperOption.swiper1.height");
}

.swiper-box2 {
  left: v-bind("swiperOption.swiper2.left");
  bottom: v-bind("swiperOption.swiper2.bottom");
  width: v-bind("swiperOption.swiper2.width");
  height: v-bind("swiperOption.swiper2.height");
}

.swiper-box3 {
  transform: translateX(-50%);
  left: 50%;
  bottom: v-bind("swiperOption.swiper3.bottom");
  width: v-bind("swiperOption.swiper3.width");
  height: v-bind("swiperOption.swiper3.height");
}
</style>
