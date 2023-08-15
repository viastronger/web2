<template>
  <div class="img-placeholder">
    <img v-scrollBot :src="bgImg.bg1" alt="" />

    <div class="banner-box banner-box1">
      <img v-scrollBot :src="bgImg.bg2" alt="" />
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
      <img v-scrollBot :src="bgImg.bg3" alt="" />
      <div class="swiper-box swiper-box2">
        <TheSwiper :bannerList="bannerList2" :slidesPerView="3"></TheSwiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import TheSwiper from "@/components/TheSwiper.vue";
import banner from "@/assets/images/course";
import useResizeSetSwiper from "@/hooks";
import { useRoute } from "vue-router";

const route = useRoute();
const baseWidth = 1920;
const imgBox1Height = 1575;
const imgBox2Height = 1224;

const bannerList1 = ref([]);
const bannerList2 = ref([]);
const bgImg = ref({});

const test = (id) => {
  console.log(id);
  bannerList1.value = banner[`course${id}`][`course${id}Banner1`];
  bannerList2.value = banner[`course${id}`][`course${id}Banner2`];
  bgImg.value = {
    bg1: require(`@/assets/images/course/course${id}/01.png`),
    bg2: require(`@/assets/images/course/course${id}/02.png`),
    bg3: require(`@/assets/images/course/course${id}/03.png`),
  };
};

test(route.params.id);

watch(
  () => route,
  () => {
    test(route.params.id);
  },
  { deep: true }
);

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
