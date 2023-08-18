<template>
  <nav class="main-container nav">
    <el-menu :default-active="activeIndex" class="el-menu-nav" mode="horizontal">
      <div v-for="item in menus" :key="item.route">
        <el-menu-item
          v-if="!item.submenus"
          :index="`/${item.route}`"
          @click="handlerClick(item)"
        >
          {{ item.name }}
        </el-menu-item>

        <el-sub-menu
          v-else-if="item.submenus && item.submenus.length"
          :index="`/${item.route}`"
          class="hand-active"
          popper-class="menu-pop"
          collapse-open-icon="none"
        >
          <template #title>
            <div
              class="sub-title"
              :class="{ 'no-pad': route.name === 'home' }"
              @click="handlerClick(item)"
            >
              <template v-if="route.name === 'home'"> {{ item.name }} </template>
              <img v-else src="@/assets/images/home/home.png" alt="" />
            </div>
          </template>
          <el-menu-item
            v-for="child in item.submenus"
            :index="`/${child.route}/${child.id}`"
            :key="child.route"
            @click="handlerClick(child)"
          >
            {{ child.name }}
          </el-menu-item>
        </el-sub-menu>
      </div>
      <img class="sign-up" v-scrollBot src="@/assets/images/header/sign_up.png" alt="" />
    </el-menu>
  </nav>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import TheImage from "@/components/TheImage.vue";
import menus from "../config/menus";

const router = useRouter();
const route = useRoute();

const activeIndex = ref(route.path);

watch(route, (v) => {
  activeIndex.value = v.path;
});

const handlerClick = (item) => {
  if (item.type === "out_link") {
    activeIndex.value = "";
    nextTick(() => {
      activeIndex.value = route.path;
    });
    return window.open(item.route, "_blank");
  }
  router.push({ name: item.route, params: { id: item.id } });
};
</script>

<style lang="scss">
$cardWidth: 125px;
$cardHeight: 202px;

.main-container.nav {
  .sign-up {
    width: 80px;
    margin-top: -6px;
    margin-left: 40px;
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
      background-color: #04b1f3 !important;
    }
    &.is-active {
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
  border: none !important;
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

  .hand-active {
    background: url(@/assets/images/home/nav_bg.png) no-repeat center / 100% 100%;

    .el-sub-menu__title {
      color: white !important;
      padding: 0;
      .sub-title {
        padding: 10px 44px 10px 30px;
        font-size: 16px;
        font-weight: 600;
        &.no-pad {
          padding: 0 24px 0 20px;
        }
      }
    }
  }
}
</style>
