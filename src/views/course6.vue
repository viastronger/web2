<template>
  <div class="img-placeholder">
    <img v-scrollBot src="@/assets/images/course6/01.png" alt="" />

    <div class="banner-box banner-box1">
      <img v-scrollBot src="@/assets/images/course6/02.png" alt="" />
      <div class="swiper-box swiper-box1">
        <TheSwiper
          :bannerList="bannerList1"
          :slidesPerView="4"
          :spaceBetween="40"
          :loop="false"
        ></TheSwiper>
      </div>
    </div>

    <div class="service">
      <div class="title">
        <span>优秀学员案例</span>
        <span>他们的收货</span>
      </div>
      <div class="sub-title">在这里培训，你也能像他们一样优秀</div>
      <div class="swiper-box2">
        <TheSwiper :bannerList="bannerList2" :slidesPerView="3"></TheSwiper>
      </div>
      <img v-scrollBot src="@/assets/images/common/consult_btn.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { debounce } from "lodash-es";
import TheSwiper from "@/components/TheSwiper.vue";
import bannerList1 from "@/assets/images/course6/banner1";
import bannerList2 from "@/assets/images/course6/banner2";

const swiperBox1Show = ref(false);

const baseWidth = 1920;
const imgBox1Height = 1575;
const imgBox2Height = 1033;

const swiperBox1Width = ref("1680px");
const swiperBox1Height = ref("272px");
const swiperBox1Bot = ref("197px");
const swiperBox1WidthRadio = 1680 / baseWidth;
const swiperBox1HeightRadio = 272 / imgBox1Height;
const swiperBot1Radio = 197 / imgBox1Height;

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
}

.swiper-box2 {
  margin: 0 120px 48px;
}

.service {
  padding-top: 68px;
  font-family: Alibaba PuHuiTi-Medium, Alibaba PuHuiTi;
  .title {
    margin-bottom: 18px;
    font-size: 58px;
    font-weight: 500;
    span:last-child {
      margin-left: 30px;
      color: #1f92d1;
    }
  }
  .sub-title {
    margin: 0 auto;
    max-width: 1200px;
    font-size: 28px;
    font-weight: 400;
    color: #888888;
    margin-bottom: 38px;
  }
  > img {
    margin: 0 auto 28px;
    width: 297px;
    height: 71px;
  }
}
</style>
