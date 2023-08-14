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
import { ref, reactive, toRefs, watch, onMounted, onUnmounted } from "vue";
import { debounce } from "lodash-es";
import TheSwiper from "@/components/TheSwiper.vue";
import TheImage from "@/components/TheImage.vue";
import TheBanner from "@/components/TheBanner.vue";
import bannerList1 from "@/assets/images/about/banner1";
import bannerList from "@/assets/images/about/banner2";

const bannerList2 = [bannerList.slice(0, 12), bannerList.slice(12).concat([{}, {}])];

const baseWidth = 1920;
const imgBox1Height = 830;
const imgBox2Height = 1295;

const bannerBox1Right = ref("120px");
const bannerBox1Bot = ref("65px");
const bannerBox1Width = ref("672px");
const bannerBox1Height = ref("514px");
const bannerBox1RightRadio = 120 / baseWidth;
const bannerBox1BotRadio = 65 / imgBox1Height;
const bannerBox1WidthRadio = 672 / baseWidth;
const bannerBox1HeightRadio = 514 / imgBox1Height;

const bannerBox2Bot = ref("107px");
const bannerBox2Width = ref("1690px");
const bannerBox2Height = ref("888px");
const bannerBox2BotRadio = 107 / imgBox2Height;
const bannerBox2WidthRadio = 1690 / baseWidth;
const bannerBox2HeightRadio = 888 / imgBox2Height;

const previewDiv = ref(null);
const initialIndex = ref(0);
const previewBanner = ref([]);

const showBanner = ref(false);
onMounted(() => {
  setTimeout(resizeSetHeight, 300);
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

  bannerBox1Right.value = box1Width * bannerBox1RightRadio + "px";
  bannerBox1Bot.value = box1Height * bannerBox1BotRadio + "px";
  bannerBox1Width.value = box1Width * bannerBox1WidthRadio + "px";
  bannerBox1Height.value = box1Height * bannerBox1HeightRadio + "px";

  bannerBox2Bot.value = box2Height * bannerBox2BotRadio + "px";
  bannerBox2Width.value = box2Width * bannerBox2WidthRadio + "px";
  bannerBox2Height.value = box2Height * bannerBox2HeightRadio + "px";

  showBanner.value = true;
}, 300);

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
    opacity: 0;
    transition: opacity 0.5;
    &.active {
      opacity: 1;
    }
  }
  .swiper-box1 {
    right: v-bind(bannerBox1Right);
    bottom: v-bind(bannerBox1Bot);
    width: v-bind(bannerBox1Width);
    height: v-bind(bannerBox1Height);
  }

  .swiper-box2 {
    bottom: v-bind(bannerBox2Bot);
    left: 50%;
    transform: translateX(-50%);
    width: v-bind(bannerBox2Width);
    height: v-bind(bannerBox2Height);
  }
}
.preview-div {
  position: fixed;
  left: -99999px;
  z-index: 999;
}
</style>
