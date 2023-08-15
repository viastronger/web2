<template>
  <div class="img-placeholder">
    <div class="banner-box banner-box1">
      <img v-scrollBot src="@/assets/images/about/01.png" alt="" />
      <div class="swiper-box swiper-box1" :class="{ active: showBanner }">
        <TheSwiper
          :bannerList="bannerList1"
          :slidesPerView="1"
          :pagination="{ clickable: true }"
        ></TheSwiper>
      </div>
    </div>
    <img v-scrollBot src="@/assets/images/about/02.png" alt="" />
    <img src="@/assets/images/about/03.png" alt="" />

    <div class="banner-box banner-box2">
      <img v-scrollBot src="@/assets/images/about/04.png" alt="" />
      <div class="swiper-box swiper-box2" :class="{ active: showBanner }">
        <TheSwiper :bannerList="bannerList2" :slidesPerView="1" rows></TheSwiper>
      </div>
    </div>

    <TheImage
      ref="previewDiv"
      class="preview-div"
      :previewlist="previewBanner"
      :initialIndex="initialIndex"
    ></TheImage>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import useResizeSetSwiper from "@/hooks";

import TheSwiper from "@/components/TheSwiper.vue";
import TheImage from "@/components/TheImage.vue";
import bannerList1 from "@/assets/images/about/banner1";
import bannerList from "@/assets/images/about/banner2";

const bannerList2 = [bannerList.slice(0, 12), bannerList.slice(12).concat([{}, {}])];

const baseWidth = 1920;
const imgBox1Height = 830;
const imgBox2Height = 1295;

const previewDiv = ref(null);
const initialIndex = ref(0);
const previewBanner = ref([]);

const showBanner = ref(false);

const swiperOption = reactive({
  swiper1: {
    index: 1,
    x: [
      { prop: "width", radio: 672 / baseWidth },
      { prop: "right", radio: 120 / baseWidth },
    ],
    y: [
      { prop: "height", radio: 514 / imgBox1Height },
      { prop: "bottom", radio: 65 / imgBox1Height },
    ],
  },
  swiper2: {
    index: 2,
    x: [{ prop: "width", radio: 1690 / baseWidth }],
    y: [
      { prop: "height", radio: 888 / imgBox2Height },
      { prop: "bottom", radio: 107 / imgBox2Height },
    ],
  },
});

useResizeSetSwiper(swiperOption);

const carouselItemClick = (idx) => {
  initialIndex.value = idx;
  previewDiv.value.getEl().children[0].click();
};
</script>
<style lang="scss" scoped>
.banner-box {
  position: relative;
  .swiper-box {
    position: absolute;
  }
  .swiper-box1 {
    right: v-bind("swiperOption.swiper1.right");
    bottom: v-bind("swiperOption.swiper1.bottom");
    width: v-bind("swiperOption.swiper1.width");
    height: v-bind("swiperOption.swiper1.height");
  }

  .swiper-box2 {
    transform: translateX(-50%);
    left: 50%;
    bottom: v-bind("swiperOption.swiper2.bottom");
    width: v-bind("swiperOption.swiper2.width");
    height: v-bind("swiperOption.swiper2.height");
  }
}
.preview-div {
  position: fixed;
  left: -99999px;
  z-index: 999;
}
</style>
