<template>
  <div class="img-placeholder">
    <img src="@/assets/images/experience/01.png" alt="" />
    <TheBanner :bannerList="bannerList" :rows="rows"></TheBanner>
  </div>
</template>

<script setup>
import TheBanner from "@/components/TheBanner.vue";
import banner1 from "@/assets/images/apply/01.png";

const bannerList = [{ url: banner1 }, { url: banner1 }, { url: banner1 }];

const rows = [
  [banner1, banner1, banner1],
  [banner1, banner1, banner1],
  [banner1, banner1, banner1],
];
</script>
<style lang="scss" scoped></style>
