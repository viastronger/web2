<template>
  <div class="img-placeholder">
    <img v-scrollBot src="@/assets/images/course4/01.png" alt="" />

    <div class="banner-box banner-box1">
      <img v-scrollBot src="@/assets/images/course4/02.png" alt="" />
      <div class="swiper-box swiper-box1">
        <TheSwiper
          :bannerList="bannerList1"
          :slidesPerView="4"
          :spaceBetween="40"
          :loop="false"
        ></TheSwiper>
      </div>
    </div>

    <div class="banner-box banner-box2">
      <img v-scrollBot src="@/assets/images/course4/03.png" alt="" />
      <div class="swiper-box swiper-box2">
        <TheSwiper :bannerList="bannerList2" :slidesPerView="3"></TheSwiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import TheSwiper from "@/components/TheSwiper.vue";
import bannerList1 from "@/assets/images/course4/banner1";
import bannerList2 from "@/assets/images/course4/banner2";
import useResizeSetSwiper from "@/hooks";

const baseWidth = 1920;
const imgBox1Height = 1575;
const imgBox2Height = 1224;

const swiperOption = reactive({
  swiper1: {
    index: 1,
    x: [{ prop: "width", radio: 1680 / baseWidth }],
    y: [
      { prop: "height", radio: 272 / imgBox1Height },
      { prop: "bottom", radio: 197 / imgBox1Height },
    ],
  },
  swiper2: {
    index: 2,
    x: [{ prop: "width", radio: 1765 / baseWidth }],
    y: [
      { prop: "height", radio: 755 / imgBox2Height },
      { prop: "bottom", radio: 147 / imgBox2Height },
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
    left: 50%;
    transform: translateX(-50%);
  }
}

.swiper-box1 {
  bottom: v-bind("swiperOption.swiper1.bottom");
  width: v-bind("swiperOption.swiper1.width");
  height: v-bind("swiperOption.swiper1.height");
}

.swiper-box2 {
  bottom: v-bind("swiperOption.swiper2.bottom");
  width: v-bind("swiperOption.swiper2.width");
  height: v-bind("swiperOption.swiper2.height");
}
</style>
