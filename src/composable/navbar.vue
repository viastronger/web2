<template>
  <div class="main-container">
    <el-menu
      ref="menu"
      :default-active="activeIndex"
      class="el-menu-nav"
      mode="horizontal"
      @close="menuCloseHandler"
      @open="menuOpenHandler"
    >
      <div v-for="item in menus" :key="item.route">
        <el-menu-item
          v-if="!item.submenus"
          :index="item.route"
          @click="handlerClick(item)"
          :class="item.route === 'home' ? 'hand' : ''"
        >
          <template v-if="item.route === 'home'">
            <div class="hand-active" :class="route.name === 'home' ? 'no-pad' : ''">
              <div v-if="route.name === 'home'" @click.stop="goSearch"> {{ item.name }} </div>
              <img v-else src="@/assets/images/home/home.png" alt="" />
            </div>
          </template>
          <template v-else>
            {{ item.name }}
          </template>
        </el-menu-item>

        <el-sub-menu
          v-else-if="item.submenus && item.submenus.length"
          :index="item.route"
          class="hand-active"
          popper-class="menu-pop"
          collapse-open-icon="none"
        >
          <template #title>
            <div class="sub-title" @click="handlerClick(item)">
              <template v-if="route.name === 'home'"> {{ item.name }} </template>
              <img v-else src="@/assets/images/home/home.png" alt="" />
            </div>
          </template>
          <div :key="reloadKey" v-if="false">
            <el-sub-menu
              v-for="child in item.submenus"
              :key="child.name"
              :index="child.name"
            >
              <template #title>
                <div style="width: 100%" @click="goSearch(child)">
                  {{ child.name }}
                </div>
              </template>
              <div style="padding: 9px 20px">
                <el-carousel
                  class="carousel"
                  v-if="child.carerType && carerMapInfo[child.carerType].list"
                  :height="getCarouselHeight(carerMapInfo[child.carerType].list.length)"
                  :autoplay="false"
                  indicator-position="none"
                  :loop="false"
                  arrow="always"
                  @change="carouselChange"
                >
                  <el-carousel-item
                    class="carousel-card"
                    v-for="(item, index) in getCarouselItemIndex(
                      carerMapInfo[child.carerType].list.length
                    )"
                    :key="'carousel-card' + item"
                    :style="{
                      'z-index': `${
                        getCarouselItemIndex(carerMapInfo[child.carerType].list.length) -
                        index
                      }`,
                    }"
                  >
                    <div
                      class="card"
                      v-for="(card, idx) in getCardIndex(
                        carerMapInfo[child.carerType].list,
                        index
                      )"
                      :key="'card' + item + idx"
                      @click="goDetail(card)"
                    >
                      <TheImage :src="card.picUrl"></TheImage>
                      <div class="name">{{ hideName(card.name) }}</div>
                      <div class="desc">
                        {{ card.age }}岁 | {{ card.nativePlace }} | {{ getEdu(card) }}
                      </div>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-sub-menu>
          </div>
        </el-sub-menu>
      </div>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, reactive, watch, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/api";
import TheImage from "@/components/TheImage.vue";
import menus from "../config/menus";
import { hideName, getEdu } from "@/utils";

const menu = ref(null);
const router = useRouter();
const route = useRoute();
const reload = inject("reload");

const activeIndex = ref(route.name);

const reloadKey = ref(String(+new Date()));
const curCarerType = ref(1);

const getQuery = (type) => {
  return {
    pageIndex: 0,
    pageSize: 1000,
    type,
  };
};

const carerMapInfo = reactive({
  1: {
    list: [],
    query: getQuery(1),
  },
  2: {
    list: [],
    query: getQuery(2),
  },
});

watch(route, (v) => {
  activeIndex.value = v.name;
});

const handlerClick = (item) => {
  router.push(item.route);
};

const menuCloseHandler = () => {
  reloadKey.value = String(+new Date());
};

const menuOpenHandler = (index) => {
  const findItem = findTargetMenu(menus, index);
  curCarerType.value = findItem.carerType;
  if (findItem.carerType && !carerMapInfo[findItem.carerType].list.length) {
    carerMapInfo[findItem.carerType].query.type = findItem.carerType;
    getTypeBabyCarerPageList();
  }
};

const getTypeBabyCarerPageList = async () => {
  const { data } = await api.getTypeBabyCarerPageList(
    carerMapInfo[curCarerType.value].query
  );
  carerMapInfo[curCarerType.value].list = data.data;
};

const carouselChange = (index) => {
  // todo
};

const findTargetMenu = (arr, index) => {
  let target = null;
  arr.forEach((l) => {
    if (target) return;
    if (l.name === index || l.route === index) {
      target = l;
    } else if (l.submenus && l.submenus.length) {
      target = findTargetMenu(l.submenus, index);
    }
  });
  return target;
};

const goDetail = (item) => {
  router.push({
    name: "detail",
    query: {
      id: item.babyCarerId,
    },
  });
  menu.value.close("home");
};

const goSearch = (item) => {
  const flag = route.name === "search";
  router
    .push({
      name: "search",
      query: {
        carerType: item.carerType,
      },
    })
    .then(() => {
      if (flag) reload();
    });
  menu.value.close("home");
};

const getCarouselItemIndex = (length) => {
  return Math.ceil(length / 12);
};

const getCardIndex = (arr, idx) => {
  return arr.slice(idx * 12, (idx + 1) * 12);
};

const getCarouselHeight = (length) => {
  return Number(length) > 12 ? "642px" : Math.ceil(length / 4) * 202 + 36 + "px";
};
</script>

<style lang="scss">
$cardWidth: 125px;
$cardHeight: 202px;

.menu-pop,
.menu-pop .el-popper.is-light,
.menu-pop .el-menu--horizontal {
  border: none !important;
}

.menu-pop {
  .carousel {
    width: $cardWidth * 4 + 69px;
  }
  .carousel-card {
    display: grid;
    grid-template-columns: $cardWidth $cardWidth $cardWidth $cardWidth;
    grid-template-rows: $cardHeight $cardHeight $cardHeight;
    column-gap: 23px;
    row-gap: 18px;
    background-color: white;
    .card {
      font-weight: 600;
      cursor: pointer;
      .el-image {
        display: block;
        width: $cardWidth;
        height: $cardWidth + 20px;
        border-radius: 10px;
      }
      .name {
        margin: 10px 0 8px;
        font-size: 18px;
      }
      .desc {
        font-size: 16px;
      }
    }
  }

  .el-sub-menu {
    font-size: 16px;
    .el-sub-menu__title {
      background-color: #47c4f4;
      color: #fff;
    }
  }
  .el-sub-menu.is-opened {
    .el-sub-menu__title:hover {
      background-color: #fff;
      color: #47c4f4 !important;
    }
  }

  .el-sub-menu + .el-sub-menu {
    margin-top: 1px;
  }
}

.el-menu-nav {
  border: none;
  background-color: transparent;
  > div {
    .el-sub-menu,
    .el-menu-item,
    .el-sub-menu__title {
      height: 40px;
      line-height: 40px;
      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
  }

  .hand {
    padding: 0;
    &.is-active {
      border: none !important;
    }
  }
  .hand-active {
    padding: 10px 40px 10px 30px;
    background: url(@/assets/images/home/nav_bg.png) no-repeat center / 100% 100%;
    &.no-pad {
      padding: 0 30px;
      color: white !important;
    }
    .el-sub-menu__title {
      color: white !important;
    }
  }

  .el-menu-item {
    font-size: 16px;
    font-weight: 600;
    &.is-active {
      border-bottom: 3px solid #47c4f4;
      color: #000;
    }
  }

  .el-menu-item:not(.is-disabled):focus,
  .el-menu-item:not(.is-disabled):hover {
    background-color: transparent;
    color: #000;
  }

  .el-sub-menu__title:hover {
    color: white !important;
    background-color: transparent;
  }

  .el-sub-menu__title {
    padding: 0;
    .sub-title {
      padding: 0 44px 0 30px;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
