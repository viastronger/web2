<template>
  <div class="img-placeholder">
    <img src="@/assets/images/train/01.png" alt="" />
    <div class="main-container">
      <TheSwiper :bannerList="bannerList"></TheSwiper>
    </div>
    <img v-scrollBot src="@/assets/images/train/02.png" alt="" />
    <img src="@/assets/images/train/03.png" alt="" />
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, watch, onMounted, getCurrentInstance } from "vue";
import TheSwiper from "@/components/TheSwiper.vue";
import banner from "@/assets/images/train/banner";

const bannerList = banner;
</script>
<style lang="scss" scoped></style>
