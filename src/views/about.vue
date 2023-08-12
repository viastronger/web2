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

const baseWidth = 1920;
const imgBox1Height = 830;

const carouselBox1Right = ref("120px");
const carouselBox1Bot = ref("65px");
const carouselBox1Width = ref("672px");
const carouselBox1Height = ref("514px");
const carouselBox1RightRadio = 120 / baseWidth;
const carouselBox1BotRadio = 65 / imgBox1Height;
const carouselBox1WidthRadio = 672 / baseWidth;
const carouselBox1HeightRadio = 514 / imgBox1Height;

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

  carouselBox1Right.value = box1Width * carouselBox1RightRadio + "px";
  carouselBox1Bot.value = box1Height * carouselBox1BotRadio + "px";
  carouselBox1Width.value = box1Width * carouselBox1WidthRadio + "px";
  carouselBox1Height.value = box1Height * carouselBox1HeightRadio + "px";

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
    right: v-bind(carouselBox1Right);
    bottom: v-bind(carouselBox1Bot);
    width: v-bind(carouselBox1Width);
    height: v-bind(carouselBox1Height);
  }
}
.preview-div {
  position: fixed;
  left: -99999px;
  z-index: 999;
}
</style>
