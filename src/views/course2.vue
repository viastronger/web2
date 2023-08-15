<template>
  <div class="img-placeholder">
    <img v-scrollBot src="@/assets/images/course2/01.png" alt="" />

    <div class="banner-box banner-box1">
      <img v-scrollBot src="@/assets/images/course2/02.png" alt="" />
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
      <img v-scrollBot src="@/assets/images/course2/03.png" alt="" />
      <div class="swiper-box swiper-box2">
        <TheSwiper :bannerList="bannerList2" :slidesPerView="3"></TheSwiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { debounce } from "lodash-es";
import TheSwiper from "@/components/TheSwiper.vue";
import bannerList1 from "@/assets/images/course2/banner1";
import bannerList2 from "@/assets/images/course2/banner2";

const swiperBox1Show = ref(false);

const baseWidth = 1920;
const imgBox1Height = 1575;
const imgBox2Height = 1224;

const swiperBox1Width = ref("1680px");
const swiperBox1Height = ref("272px");
const swiperBox1Bot = ref("197px");
const swiperBox1WidthRadio = 1680 / baseWidth;
const swiperBox1HeightRadio = 272 / imgBox1Height;
const swiperBot1Radio = 197 / imgBox1Height;

const swiperBox2Width = ref("1765px");
const swiperBox2Height = ref("755px");
const swiperBox2Bot = ref("147px");
const swiperBox2WidthRadio = 1765 / baseWidth;
const swiperBox2HeightRadio = 755 / imgBox2Height;
const swiperBot2Radio = 147 / imgBox2Height;

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
  swiperBox1Bot.value = box1Height * swiperBot1Radio + "px";

  swiperBox2Width.value = box2Width * swiperBox2WidthRadio + "px";
  swiperBox2Height.value = box2Height * swiperBox2HeightRadio + "px";
  swiperBox2Bot.value = box2Height * swiperBot2Radio + "px";

  swiperBox1Show.value = true;
}, 300);
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
  bottom: v-bind(swiperBox1Bot);
  width: v-bind(swiperBox1Width);
  height: v-bind(swiperBox1Height);
}

.swiper-box2 {
  bottom: v-bind(swiperBox2Bot);
  width: v-bind(swiperBox2Width);
  height: v-bind(swiperBox2Height);
}
</style>
