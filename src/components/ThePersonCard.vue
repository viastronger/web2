<template>
  <div class="card-list">
    <div
      class="card"
      v-for="(item, idx) in list"
      :key="idx"
      @mouseleave="handlerMouseLeave(item, idx)"
      @click="goDetail(item)"
    >
      <img class="level-img" :src="getLevelIcon(item)" alt="" />
      <div class="img-box">
        <TheImage :src="item.picUrl"></TheImage>
      </div>
      <div class="info-box">
        <div class="name">
          {{ hideName(item.name) }} | {{ item.age }}岁 | {{ item.nativePlace }} |
          {{ getEdu(item) }}
        </div>

        <div class="change-area">
          <Transition name="fade">
            <div class="status-btn" v-if="!item.show">
              <div
                class="status"
                :class="{ active: item.status === 1 }"
                @mouseenter="handlerMouseEnter(item)"
              >
                <span>{{ item.status === 0 ? "待岗" : "服务中" }}</span>
                <span>{{ item.serviceYears }}经验</span>
              </div>

              <el-button color="#fcc760" round v-scrollBot> 咨询 </el-button>
            </div>

            <div v-else class="tags">
              <div class="tag" v-for="item in item.markInfoList" :key="item.markId">
                {{ item.mark }}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import TheImage from "@/components/TheImage.vue";
import { getEdu, getLevelIcon, hideName } from "@/utils";

defineProps({
  list: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
const router = useRouter();
const route = useRoute();

const reload = inject("reload");

const handlerMouseEnter = (item) => {
  item.markInfoList && item.markInfoList.length && (item.show = true);
};

const handlerMouseLeave = (item) => {
  item.show = false;
};

const goDetail = (item) => {
  router.push({
    name: "detail",
    query: { id: item.babyCarerId },
  });
};
</script>
<style lang="scss" scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  background-color: #fff;
  .card {
    margin-right: 19px;
    margin-bottom: 15px;
    border: 1px solid #e6e2e2;
    border-radius: 10px;
    background-color: #f8f8f8;
    width: 376px;
    height: 160px;
    display: flex;
    position: relative;
    cursor: pointer;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .level-img {
      position: absolute;
      width: 56px;
      height: 56px;
      left: -10px;
      top: -8px;
      z-index: 1;
    }
    .img-box {
      width: 138px;
      height: 100%;
      background-color: #fff;
      border-radius: 10px 0 0 10px;
      overflow: hidden;
    }

    .info-box {
      flex: 1;
      padding: 15px;
      font-size: 16px;
      text-align: left;
      display: flex;
      flex-direction: column;
      .name {
        margin-bottom: 10px;
        font-weight: 600;
      }

      .status {
        span {
          display: inline-block;
          color: #666;
          &:first-child {
            width: 94px;
            color: #157309;
            &.active {
              color: #ff2c1c;
            }
          }
        }
      }

      .el-button {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 86px;
        color: #fff;
      }

      .tags {
        overflow: auto;
        .tag {
          margin-right: 3px;
          margin-bottom: 8px;
          float: left;
          border: 1px solid #47c4f4;
          border-radius: 4px;
          padding: 2px 4px;
        }
      }

      .change-area {
        position: relative;
        flex: 1;
        .status-btn,
        .tags {
          position: absolute;
          top: 0;
          bottom: 0;
        }
      }
    }
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 1s;
  }
  .fade-enter-to {
    opacity: 1;
  }
}
</style>
