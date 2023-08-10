<template>
  <div class="img-placeholder">
    <img src="@/assets/images/about/02.jpg" alt="" />
    <img src="@/assets/images/about/03.jpg" alt="" />
    <div class="carousel-wrap">
      <img v-scrollBot src="@/assets/images/about/04.png" alt="" />
      <div class="carousel-box">
        <TheBanner
          :bannerList="bannerList"
          height="200px"
          indicator="outside"
          @carouselItemClick="carouselItemClick"
        ></TheBanner>
      </div>
      <TheImage
        ref="previewDiv"
        :src="banner1"
        class="preview-div"
        :previewlist="bannerList.map((l) => l.url)"
        :initialIndex="initialIndex"
      ></TheImage>
    </div>
    <img v-scrollBot src="@/assets/images/about/05.jpg" alt="" />
    <img v-scrollBot src="@/assets/images/about/06.png" alt="" />
  </div>
</template>
<script setup>
import { ref, reactive, toRefs, watch, onMounted, onUnmounted } from "vue";
import { debounce } from "lodash-es";
import TheImage from "@/components/TheImage.vue";
import TheBanner from "@/components/TheBanner.vue";
import banner1 from "@/assets/images/about/carousel/1.png";
import banner2 from "@/assets/images/about/carousel/2.png";
import banner3 from "@/assets/images/about/carousel/3.png";
import banner4 from "@/assets/images/about/carousel/4.png";
import banner5 from "@/assets/images/about/carousel/5.png";
import banner6 from "@/assets/images/about/carousel/6.png";
import banner7 from "@/assets/images/about/carousel/7.png";
import banner8 from "@/assets/images/about/carousel/8.png";
import banner9 from "@/assets/images/about/carousel/9.jpg";

const bannerList = [
  { url: banner1 },
  { url: banner2 },
  { url: banner3 },
  { url: banner4 },
  { url: banner5 },
  { url: banner6 },
  { url: banner7 },
  { url: banner8 },
  { url: banner9 },
];

const carouselRightRadio = 365 / 1920;
const carouselBotRadio = 185 / 690;
const carouselWidthRadio = 467 / 1920;

const carouselBoxRight = ref("365px");
const carouselBoxBot = ref("185px");
const carouselBoxWidth = ref("467px");

const previewDiv = ref(null);
const initialIndex = ref(0);
onMounted(() => {
  setTimeout(resizeSetHeight, 300);
  window.addEventListener("resize", resizeSetHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeSetHeight);
});

const resizeSetHeight = debounce(() => {
  const { clientWidth, clientHeight } = document.querySelector(".carousel-wrap");

  carouselBoxRight.value = clientWidth * carouselRightRadio + "px";
  carouselBoxBot.value = clientHeight * carouselBotRadio + "px";
  carouselBoxWidth.value = clientWidth * carouselWidthRadio + "px";
}, 300);

const carouselItemClick = (idx) => {
  initialIndex.value = idx;
  previewDiv.value.getEl().children[0].click();
};
</script>
<style lang="scss" scoped>
.carousel-wrap {
  position: relative;
  .carousel-box {
    position: absolute;
    right: v-bind(carouselBoxRight);
    bottom: v-bind(carouselBoxBot);
    width: v-bind(carouselBoxWidth);
    height: 200px;

    :deep(.carousel-img) {
      width: 100%;
      height: 100%;
      .el-image__inner {
        max-width: 100%;
        // height: auto;
        max-height: 100%;
      }
    }
  }

  .preview-div {
    position: fixed;
    left: -99999px;
    z-index: 999;
  }
}
</style>
