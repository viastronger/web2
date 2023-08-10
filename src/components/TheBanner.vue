<template>
  <el-carousel
    class="carousel"
    :indicator-position="indicator"
    :height="carouselHeight"
    :autoplay="autoplay"
  >
    <el-carousel-item
      class="carousel-card"
      v-for="(item, index) in bannerList"
      :key="'carousel-card' + index"
      @click="carouselItemClick(index)"
    >
      <TheImage
        v-if="!rows.length"
        ref="elImageRef"
        class="carousel-img"
        :src="item.url"
        :previewlist="previewlist"
        @load="imgLoadHandler"
      ></TheImage>
      <div v-else class="row-box" ref="rowBox">
        <div class="row" v-for="(row, idx) in rows" :key="idx">
          <div class="col" v-for="(col, i) in row" :key="i">
            <TheImage :src="col" @load="imgLoadHandler"></TheImage>
          </div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import TheImage from "@/components/TheImage.vue";

import { debounce } from "lodash-es";

const props = defineProps({
  bannerList: {
    type: Array,
    default: () => {
      return [];
    },
  },
  fixedHeight: {
    type: Boolean,
    default: false,
  },
  height: {
    type: [String],
    default: "",
  },
  indicator: {
    type: [String],
    default: "none",
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  previewlist: {
    type: Array,
    default: () => {
      return [];
    },
  },
  rows: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

const emits = defineEmits(["carouselItemClick"]);

const carouselHeight = ref(props.height || "600px");
const elImageRef = ref();
const rowBox = ref();

const imgLoadHandler = (e) => {
  !props.fixedHeight && resizeSetHeight();
};

onMounted(() => {
  window.addEventListener("resize", resizeSetHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeSetHeight);
});

const resizeSetHeight = debounce(() => {
  if (elImageRef.value) {
    carouselHeight.value = `${elImageRef.value[0].getEl().clientHeight}px`;
  } else {
    carouselHeight.value = `${rowBox.value[0].clientHeight}px`;
  }
}, 300);

const carouselItemClick = (idx) => {
  emits("carouselItemClick", idx);
};
</script>

<style lang="scss" scoped>
.carousel-img {
  width: 100%;
  height: auto;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 60px;
}

:deep(.el-carousel__container) {
  transition: height 0.3s;
}

.carousel-card {
  .row-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .row {
      display: flex;
      justify-content: space-between;
      & + .row {
        margin-top: 10px;
      }
      .col {
        width: 32.5%;
      }
    }
  }
}
</style>
