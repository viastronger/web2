<template>
  <div class="img-placeholder">
    <img src="@/assets/images/home/01.png" alt="" />
    <img v-scrollBot src="@/assets/images/home/02.png" alt="" />
    <img v-scrollBot src="@/assets/images/home/03.png" alt="" />
    <div class="service">
      <div class="title">
        <span>客户服务</span>
        <span>五大合作模式</span>
      </div>
      <div class="sub-title">学校+政府+协会+企业+机构</div>
      <TheBanner :bannerList="bannerList" v-scrollBot></TheBanner>
    </div>
    <div class="service swiper-box">
      <div class="title">
        <span>实战派</span>
        <span>技能师资</span>
      </div>
      <div class="sub-title">
        学校具备一支高学历、高职称、教学经验丰富的师资队伍，专业性、针对性教学，让学员快速掌握技能用于实践。此外，学校还与各级医院、政府、机构、企业等建立了长期合作顾问关系。
      </div>
      <TheSwiper :bannerList="bannerList2"></TheSwiper>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import TheBanner from "@/components/TheBanner.vue";
import TheSwiper from "@/components/TheSwiper.vue";
import { useRouter } from "vue-router";

import banner1 from "@/assets/images/home/banner/01.png";
import banner2 from "@/assets/images/home/banner/02.png";
import banner3 from "@/assets/images/home/banner/03.png";
import banner4 from "@/assets/images/home/banner/04.png";
import banner2_1 from "@/assets/images/home/banner2/01.png";
import banner2_2 from "@/assets/images/home/banner2/02.png";
import banner2_3 from "@/assets/images/home/banner2/03.png";
import banner2_4 from "@/assets/images/home/banner2/04.png";

const bannerList = ref([
  { url: banner1 },
  { url: banner2 },
  { url: banner3 },
  { url: banner4 },
]);

const bannerList2 = ref([
  { url: banner2_1 },
  { url: banner2_2 },
  { url: banner2_3 },
  { url: banner2_4 },
]);

const router = useRouter();

const radio = 371 / 1920;
const radioBox = 1200 / 1920;
const radioTop = 59 / 530;

const btnWidth = ref("371px");
const btnBoxWidth = ref("1200px");
const btnBoxTop = ref("59px");
</script>

<style lang="scss" scoped>
.btn-img {
  position: relative;
  .btn-box {
    position: absolute;
    top: v-bind(btnBoxTop);
    left: 50%;
    transform: translateX(-50%);
    width: v-bind(btnBoxWidth);
    display: flex;
    justify-content: space-between;
    .btn {
      width: v-bind(btnWidth);
      height: v-bind(btnWidth);
      cursor: pointer;
    }
  }
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
    margin-bottom: 68px;
  }
}

.swiper-box {
  .swiper {
    margin: 0 100px;
  }
}
</style>
