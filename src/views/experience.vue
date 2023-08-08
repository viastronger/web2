<template>
  <div class="img-placeholder">
    <img src="@/assets/images/experience/01.png" alt="" />
    <TheBanner :bannerList="bannerList"></TheBanner>
  </div>
</template>

<script setup>
import TheBanner from "@/components/TheBanner.vue";
import banner1 from "@/assets/images/apply/01.png";
import banner2 from "@/assets/images/apply/01.png";
import banner3 from "@/assets/images/apply/01.png";

const bannerList = [{ url: banner1 }, { url: banner2 }, { url: banner3 }];
</script>
<style lang="scss" scoped></style>
