<template>
  <main class="main-body">
    <el-config-provider size="small">
      <el-affix class="affix" @change="affixChange" z-index="2003">
        <div class="nav-head" :class="{ active: affixStatu }">
          <Header></Header>

          <Navbar></Navbar>
        </div>
      </el-affix>

      <router-view></router-view>

      <Footer></Footer>
    </el-config-provider>
  </main>
</template>

<script setup>
import Header from "@/composable/header.vue";
import Navbar from "@/composable/navbar.vue";
import Footer from "@/composable/footer.vue";
import { ref, provide, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";

const routerAlive = ref(true);
const route = useRoute();

const affixStatu = ref(false);

const reload = () => {
  routerAlive.value = false;
  nextTick(() => {
    routerAlive.value = true;
  });
};

provide("reload", reload);

const affixChange = (f) => {
  affixStatu.value = f;
};
</script>
<style lang="scss" scoped>
.main-body {
  min-width: 1428px;
  .affix {
    width: calc(100vw - 12px) !important;
    min-width: 1428px;
  }
  .nav-head {
    padding-bottom: 5px;
    backdrop-filter: saturate(180%) blur(10px);
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.62),
      rgba(238, 238, 238, 0.62)
    );
    &.active {
      box-shadow: 0 3px 10px #c2c2c2;
    }
  }
}
</style>
