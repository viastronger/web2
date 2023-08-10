<template>
  <div class="img-placeholder">
    <TheBanner :bannerList="bannerList"></TheBanner>
    <img v-scrollBot src="@/assets/images/home/03.png" alt="" />
    <img src="@/assets/images/about/03.jpg" alt="" />
    <img v-scrollBot src="@/assets/images/home/09.png" alt="" />
    <img src="@/assets/images/home/05.jpg" alt="" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import TheBanner from "@/components/TheBanner.vue";
import { useRouter } from "vue-router";
import banner1 from "@/assets/images/banner/1.png";
import banner2 from "@/assets/images/banner/2.png";
import banner3 from "@/assets/images/banner/3.png";

const bannerList = ref([{ url: banner1 }, { url: banner2 }, { url: banner3 }]);

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
</style>
