<template>
  <Swiper
    :slides-per-view="slidesPerView"
    :space-between="spaceBetween"
    :pagination="pagination"
    :modules="modules"
    :navigation="swiperOptions.navigation"
    :autoplay="swiperOptions.autoplay"
    :loop="loop"
    :observer="true"
    :observeParents="true"
  >
    <template v-if="!rows">
      <swiper-slide v-for="(item, idx) in bannerList" :key="idx">
        <TheImage
          v-scrollBot="isScrollBot"
          ref="elImageRef"
          class="carousel-img"
          :src="item.url"
          @load="imgLoadHandler"
        ></TheImage>
      </swiper-slide>
    </template>
    <template v-if="rows">
      <swiper-slide v-for="(banner, idx) in bannerList" :key="idx">
        <div class="wrapper">
          <template v-for="(row, index) in banner" :key="'' + index + idx">
            <TheImage
              v-if="row.url"
              ref="elImageRef"
              class="carousel-img"
              :src="row.url"
              @load="imgLoadHandler"
            ></TheImage>
            <div v-else></div>
          </template>
        </div>
      </swiper-slide>
    </template>
    <div class="swiper-button-next swiper-button"></div>
    <div class="swiper-button-prev swiper-button"></div>
  </Swiper>
</template>

<script setup>
import { ref, reactive, toRefs, watch, onMounted, getCurrentInstance } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import TheImage from "@/components/TheImage.vue";

const props = defineProps({
  bannerList: {
    type: Array,
    default: () => {
      return [];
    },
  },
  height: {
    type: [String],
    default: "",
  },
  slidesPerView: {
    type: Number,
    default: 2.6,
  },
  spaceBetween: {
    type: Number,
    default: 0,
  },
  pagination: {
    type: [Boolean, Object],
    default: false,
  },
  autoplay: {
    type: [Boolean, Object],
    default: false,
  },
  rows: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  isScrollBot: {
    type: Boolean,
    default: false,
  },
});

const modules = [Pagination, Navigation, EffectCoverflow, Autoplay];

const swiperOptions = reactive({
  autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  coverflowEffect: {
    rotate: 0, //slide做3d旋转时Y轴的旋转角度。默认50。
    // stretch: 50, //每个slide之间的拉伸值（距离），越大slide靠得越紧。 默认0。
    // depth: 100, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
    // modifier: 1, //depth和rotate和stretch的倍率，相当于            depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
    slideShadows: false, //开启slide阴影。默认 true。
  },
});

const imgLoadHandler = () => {};
</script>
<style lang="scss" scoped>
.swiper {
  height: 100%;
}
.swiper-button {
  width: 36px;
  height: 36px;
  background-color: rgba(31, 45, 61, 0.51);
  border-radius: 50%;
  &::after {
    font-size: 14px;
    color: #fff;
  }
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-imager,
  > div {
    width: 24%;
    margin-bottom: 10px;
  }
}
</style>
