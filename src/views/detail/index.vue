<template>
  <div class="detail">
    <div class="main-container">
      <div class="avatar-box">
        <div class="img-box">
          <img class="level-img" :src="getLevelIcon(carerInfo)" alt="" />
          <TheImage class="avatar" :src="carerInfo.picUrl"></TheImage>
        </div>
        <div class="person">
          <div>
            <div class="name">{{ carerInfo.name }}</div>
            <div class="age">
              {{ carerInfo.age }}岁 | {{ carerInfo.nativePlace }} |
              {{ getEdu(carerInfo) }}
              <div class="pop">{{ carerInfo.status === 0 ? "待岗" : "服务中" }}</div>
            </div>
            <div class="tags">
              <div
                class="tag"
                v-for="item in carerInfo.certificateInfoList"
                :key="item.certificateName"
              >
                {{ item.certificateName }}
              </div>
            </div>
          </div>
          <div class="btn-box">
            <el-button color="#fcc760" v-scrollBot> 咨询价格 </el-button>
            <el-button color="#47c4f4" v-scrollBot> 立即预约 </el-button>
          </div>
        </div>
      </div>

      <div class="main-info">
        <div class="info">
          <TheCardTitle :styleObj="{ left: '36px' }" title="她的个人信息"></TheCardTitle>
          <div class="scroll-box">
            <div class="desc">
              <el-descriptions :column="2">
                <el-descriptions-item
                  v-for="item in descConfigs"
                  :key="item.label"
                  :label="item.label"
                  >{{ item.formatter(carerInfo) }}</el-descriptions-item
                >
              </el-descriptions>
            </div>

            <div class="tags">
              <el-tag
                v-for="item in carerInfo.markInfoList"
                :key="item.markId"
                class="mx-1"
                round
                color="#f8f8f8"
              >
                {{ item.mark }}
              </el-tag>
            </div>

            <div class="row">
              <div class="label">
                <img src="@/assets/images/detail/info.png" alt="" />
                自我评价:
              </div>

              <div class="cont">
                {{ carerInfo.selfEvaluate }}
              </div>
            </div>

            <div class="row">
              <div class="label">
                <img src="@/assets/images/detail/thumb.png" alt="" />
                颐挚对她的评价:
              </div>

              <div class="cont">
                {{ carerInfo.orgEvaluate }}
              </div>
            </div>
          </div>
        </div>

        <div class="experience">
          <TheCardTitle :styleObj="{ left: '36px' }" title="她的培训经历"></TheCardTitle>

          <div class="scroll-box">
            <div
              class="time-line"
              v-for="(item, idx) in carerInfo.trainInfoList"
              :key="idx"
            >
              <div class="left">
                <span class="time">{{ item.trainTime }}</span>
                <span class="place">{{ item.trainSchool }}</span>
              </div>
              <div class="right">{{ item.trainCourse }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="pic">
        <TheCardTitle :styleObj="{ left: '36px' }" title="她的工作&生活照"></TheCardTitle>
        <div class="img-box">
          <div
            class="img-item"
            v-for="(item, idx) in carerInfo.workPicInfoList"
            :key="item.workPicUrl"
          >
            <TheImage
              :src="item.workPicUrl"
              :previewlist="carerInfo.workPicInfoList.map((l) => l.workPicUrl)"
              :initialIndex="idx"
            ></TheImage>
          </div>
        </div>
      </div>

      <div class="recommend" v-if="list.length">
        <div class="title">看过她的人还看了</div>

        <div class="list">
          <ThePersonCard :list="list"></ThePersonCard>
        </div>
      </div>
    </div>
    <img src="@/assets/images/detail/03.jpg" alt="" />
    <img src="@/assets/images/detail/04.jpg" alt="" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import ThePersonCard from "@/components/ThePersonCard.vue";
import TheCardTitle from "@/components/TheCardTitle.vue";
import TheImage from "@/components/TheImage.vue";
import api from "@/api";
import { descConfigs } from "./config";
import { useRoute } from "vue-router";
import { getEdu, getLevelIcon } from "@/utils";

const route = useRoute();
const carerId = Number(route.query.id);
const carerInfo = ref({});

const list = ref([]);

const getRecommendList = async (id) => {
  const { data } = await api.getRecommendBabyCarerList({
    babyCarerId: id || carerId,
  });
  list.value = data;
};

const getDetail = async (id) => {
  const { data } = await api.getBabyCarerDetailInfo({ babyCarerId: id || carerId });
  carerInfo.value = data || {};
};

watch(
  () => route.query,
  (v) => {
    // 当前页面点击浏览器的前进后退时，和点击推荐时，页面不会刷新，手动发送请求
    if (route.name === "detail") {
      getDetail(Number(v.id));
      getRecommendList(Number(v.id));
    }
  },
  {
    deep: true,
  }
);

getDetail();
getRecommendList();
</script>
<style lang="scss" scoped>
.detail {
  padding-top: 22px;
  background-color: #f8f8f8;
  text-align: left;

  .avatar-box {
    padding: 24px 28px 34px;
    border: 1px solid #e6e2e2;
    background: #fff;
    display: flex;
    .img-box {
      margin-right: 36px;
      position: relative;
      .level-img {
        position: absolute;
        width: 56px;
        height: 56px;
        left: -10px;
        top: -8px;
        z-index: 1;
      }
      .avatar {
        display: block;
        width: 170px;
        height: 197px;
        background: var(--el-fill-color-light);
      }
    }

    .person {
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name {
        font-weight: 600;
        font-size: 26px;
      }

      .age {
        font-weight: 600;
        margin: 10px 0 14px;
        position: relative;
        width: fit-content;
        .pop {
          position: absolute;
          right: -100px;
          top: 50%;
          transform: translateY(-50%);
          width: 62px;
          height: 32px;
          background: url(@/assets/images/detail/pop.png) no-repeat center / 100% 100%;
          text-align: center;
          line-height: 26px;
          color: #fff;
          font-weight: 500;
        }
      }

      .tags {
        width: 500px;
        display: flex;
        flex-wrap: wrap;
        .tag {
          margin-right: 3px;
          margin-bottom: 8px;
          font-size: 14px;
          color: #666666;
          border: 1px solid #47c4f4;
          padding: 2px 4px;
          border-radius: 4px;
        }
      }

      .btn-box {
        .el-button {
          width: 100px;
          height: 28px;
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }

  .main-info {
    display: flex;
    margin: 40px 0;
    height: 500px;

    .info,
    .experience {
      height: 100%;
      position: relative;
      padding: 40px 0;
      border: 1px solid #e6e2e2;
      background: #fff;
      font-size: 16px;

      .scroll-box {
        overflow: auto;
        height: 100%;
        padding: 0 36px;
      }

      :deep(.el-descriptions--small
          .el-descriptions__body
          .el-descriptions__table
          .el-descriptions__cell) {
        font-size: 16px;
      }
      :deep(.el-descriptions__label:not(.is-bordered-label)) {
        color: #47c4f4;
        font-weight: 600;
      }
      :deep(.el-descriptions__content:not(.is-bordered-label)) {
        font-weight: 600;
      }
    }
    .info {
      margin-right: 44px;
      width: 657px;
      .tags {
        margin-top: 8px;
        .el-tag {
          margin-right: 6px;
          color: #000;
          border-color: #e6e2e2;
          font-weight: 600;
          font-size: 16px;
          height: 26px;
        }
      }

      .row {
        margin-top: 18px;
        .label {
          color: #47c4f4;
          display: flex;
          align-items: center;
          font-weight: 600;
          img {
            margin-right: 6px;
            width: 17px;
            height: 15px;
          }
        }
        .cont {
          margin-top: 10px;
          color: #000;
          line-height: 26px;
          font-weight: 600;
        }
      }
    }
    .experience {
      flex: 1;

      .time-line {
        display: flex;
        justify-content: space-between;
        font-weight: 600;
        & + .time-line {
          margin-top: 30px;
        }

        .left {
          margin-right: 10px;
          display: flex;
          // max-width: 310px;
        }

        .right {
          white-space: nowrap;
          // max-width: 96px;
        }

        .time {
          margin-right: 10px;
          width: 60px;
        }
      }
    }
  }

  .pic {
    margin-bottom: 28px;
    padding: 47px 0;
    border: 1px solid #e6e2e2;
    background-color: #fff;
    height: 460px;
    position: relative;

    .img-box {
      padding: 0 36px;
      display: flex;
      flex-wrap: wrap;
      height: 100%;
      overflow: auto;
      .img-item {
        width: 263px;
        height: 172px;
        display: flex;
        justify-content: center;
        background-color: #c2c2c2;
        margin-right: 16px;
        margin-bottom: 18px;
        border: 1px solid #e6e2e2;
        &:nth-child(4n) {
          margin-right: 0;
        }
        .el-image {
          width: auto;
        }
      }
    }
  }
  .recommend {
    margin-bottom: 10px;
    padding: 17px 16px 0;
    border: 1px solid #e6e2e2;
    background-color: #fff;
    .title {
      margin-bottom: 34px;
      font-size: 16px;
      font-weight: 600;
      .left {
      }
    }
  }
}
</style>
