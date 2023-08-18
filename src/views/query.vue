<template>
  <section class="img-placeholder">
    <div class="banner-box banner-box1">
      <img v-scrollBot src="@/assets/images/query/06.png" alt="" />

      <div class="swiper-box swiper-box1">
        <a href="http://www.rsj.sh.gov.cn/xjd/index600.jsp" target="_blank">
          <img src="@/assets/images/query/01.png" alt="" />
        </a>

        <a href="http://na.mofyi.com/na/login/search.html" target="_blank">
          <img src="@/assets/images/query/02.png" alt="" />
        </a>

        <img v-scrollBot src="@/assets/images/query/03.png" alt="" />
      </div>
    </div>

    <img v-scrollBot src="@/assets/images/query/04.png" alt="" />
  </section>
</template>
<script setup>
import { reactive } from "vue";
import useResizeSetSwiper from "@/hooks";

const baseWidth = 1920;
const imgBox1Height = 1317;

const swiperOption = reactive({
  swiper1: {
    index: 1,
    x: [{ prop: "width", radio: 1770 / baseWidth }],
    y: [
      { prop: "height", radio: 817 / imgBox1Height },
      { prop: "bottom", radio: 219 / imgBox1Height },
    ],
  },
});

useResizeSetSwiper(swiperOption);
</script>
<style lang="scss" scoped>
@import "~@/style/common";

.swiper-box {
  display: flex;
  justify-content: space-between;
  bottom: v-bind("swiperOption.swiper1.bottom");
  width: v-bind("swiperOption.swiper1.width");
  height: v-bind("swiperOption.swiper1.height");
  a,
  > img {
    width: 33%;
  }
}
</style>
