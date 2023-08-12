<template>
  <div class="main-container nav">
    <el-menu
      ref="menu"
      :default-active="activeIndex"
      class="el-menu-nav"
      mode="horizontal"
    >
      <div v-for="item in menus" :key="item.route">
        <el-menu-item
          v-if="!item.submenus"
          :index="item.route"
          @click="handlerClick(item)"
          :class="item.route === 'home' ? 'hand' : ''"
        >
          {{ item.name }}
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
          <el-menu-item
            v-for="child in item.submenus"
            :index="`${child.carerType}`"
            :key="child.carerType"
          >
            {{ child.name }}
          </el-menu-item>
        </el-sub-menu>
      </div>
    </el-menu>
    <div class="sign-up" v-scrollBot>立即报名</div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, inject, nextTick } from "vue";
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

const handlerClick = (item) => {
  if (item.type === "out_link") {
    activeIndex.value = "";
    nextTick(() => {
      activeIndex.value = route.name;
    });
    return window.open(item.route, "_blank");
  }
  router.push(item.route);
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

.main-container.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-menu-nav {
    flex: 1;
  }

  .sign-up {
    margin-left: 40px;
    // width: 144px;
    // height: 38px;
    padding: 4px 12px;
    font-size: 22px;
    font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
    color: #fff;
    background-color: #1f92d1;
    border-radius: 4px;
  }
}

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
  .el-menu-item {
    font-size: 16px;
    background-color: #47c4f4 !important;
    color: #fff !important;
    border-bottom: 1px solid #fff;
    &:hover {
      background-color: #fff !important;
      color: #47c4f4 !important;
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
