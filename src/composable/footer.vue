<template>
  <div class="footer">
    <div class="ewm-box">
      <img src="@/assets/images/home/weixin_ewm.png" alt="" />
      <img src="@/assets/images/home/service_ewm.png" alt="" />
    </div>
    <img src="@/assets/images/home/06.png" alt="" />
    <TheMap class="map"></TheMap>
  </div>
  <div class="bot-link">
    <div class="left">
      <img src="@/assets/images/logo/logo_light.png" alt="" />
      <div class="copyright">Copyright © 2022-2029 All Rights Reserved.</div>
      <div>
        <a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备2022023635号 </a>
      </div>
      <div style="margin-top: 8px">
        <a href="http://cyberpolice.mps.gov.cn/" target="_blank">
          浙公网安备 33011002016623号
        </a>
      </div>
    </div>

    <div class="right">
      <ul>
        <li>
          <div class="title">相关网站</div>
          <div class="link">上海香格里职业培训学校</div>
          <div class="link">珅昕陪护</div>
        </li>
        <li>
          <div class="title">小程序</div>
          <div class="icon-row">
            <el-popover placement="top-start" width="200" trigger="hover">
              <img class="icon" src="@/assets/images/footer/ewm.png" alt="" />
              <template #reference>
                <div class="icon-row">
                  <img class="icon" src="@/assets/images/footer/01.png" alt="" />
                  挚护易
                </div>
              </template>
            </el-popover>
          </div>
          <div class="icon-row">
            <el-popover placement="top-start" width="200" trigger="hover">
              <img class="icon" src="@/assets/images/footer/ewm.png" alt="" />
              <template #reference>
                <div class="icon-row">
                  <img class="icon" src="@/assets/images/footer/01.png" alt="" />
                  颐挚母婴
                </div>
              </template>
            </el-popover>
          </div>
        </li>
        <li>
          <div class="title" style="padding-left: 60px; text-align: left">关注我们</div>
          <div class="icon-box">
            <div class="item">
              <el-popover placement="top-start" width="200" trigger="hover">
                <img class="icon" src="@/assets/images/footer/ewm.png" alt="" />
                <template #reference>
                  <img class="icon" src="@/assets/images/footer/02.png" alt="" />
                </template>
              </el-popover>
            </div>
            <div class="item">
              <el-popover placement="top-start" width="200" trigger="hover">
                <img class="icon" src="@/assets/images/footer/ewm.png" alt="" />
                <template #reference>
                  <img class="icon" src="@/assets/images/footer/03.png" alt="" />
                </template>
              </el-popover>
            </div>
            <div class="item">
              <el-popover placement="top-start" width="200" trigger="hover">
                <img class="icon" src="@/assets/images/footer/ewm.png" alt="" />
                <template #reference>
                  <img class="icon" src="@/assets/images/footer/04.png" alt="" />
                </template>
              </el-popover>
            </div>
            <div class="item">
              <el-popover placement="top-start" width="200" trigger="hover">
                <img class="icon" src="@/assets/images/footer/ewm.png" alt="" />
                <template #reference>
                  <img class="icon" src="@/assets/images/footer/05.png" alt="" />
                </template>
              </el-popover>
            </div>
            <div class="item">
              <el-popover placement="top-start" width="200" trigger="hover">
                <img class="icon" src="@/assets/images/footer/ewm.png" alt="" />
                <template #reference>
                  <img class="icon" src="@/assets/images/footer/06.png" alt="" />
                </template>
              </el-popover>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- <div class="bot-title">颐挚母婴 一直用心为您服务</div> -->
  <!-- <img src="@/assets/images/home/10.png" alt="" /> -->
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import TheMap from "@/components/TheMap.vue";
import { debounce } from "lodash-es";

const radio = 1920 / 1115;
const ewmBoxWidthRadio = 1065 / 1920;
const ewmBoxHeightRadio = 324 / 1115;
const ewmBoxTopRadio = 295 / 1115;
const mapBottomRadio = 60 / 1115;
const mapWidthRadio = 1070 / 1920;
const mapHeightRadio = 237 / 1115;

const footerHeight = ref("1115px");
const ewmBoxWidth = ref("1065px");
const ewmBoxHeight = ref("324px");
const ewmBoxTop = ref("295px");
const mapBottom = ref("60px");
const mapWidth = ref("1070px");
const mapHeight = ref("237px");

onMounted(() => {
  setTimeout(resizeSetHeight, 300);
  window.addEventListener("resize", resizeSetHeight, 300);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeSetHeight);
});

const resizeSetHeight = debounce(() => {
  const { clientWidth, clientHeight } = document.querySelector(".footer");

  const height = clientWidth / radio;
  footerHeight.value = height + "px";

  ewmBoxHeight.value = height * ewmBoxHeightRadio + "px";
  ewmBoxWidth.value = clientWidth * ewmBoxWidthRadio + "px";
  ewmBoxTop.value = clientHeight * ewmBoxTopRadio + "px";

  mapBottom.value = clientHeight * mapBottomRadio + "px";
  mapWidth.value = clientWidth * mapWidthRadio + "px";
  mapHeight.value = clientHeight * mapHeightRadio + "px";
}, 300);
</script>
<style lang="scss" scoped>
.footer {
  position: relative;
  .ewm-box {
    position: absolute;
    top: v-bind(ewmBoxTop);
    left: 50%;
    transform: translateX(-50%);
    width: v-bind(ewmBoxWidth);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    img {
      width: v-bind(ewmBoxHeight);
      height: v-bind(ewmBoxHeight);
    }
  }

  .map {
    position: absolute;
    bottom: v-bind(mapBottom);
    left: 50%;
    width: v-bind(mapWidth);
    height: v-bind(mapHeight);
    transform: translateX(-50%);
  }
}

.bot-link {
  padding: 70px 176px 70px 115px;
  background-color: #1f2329;
  display: flex;
  justify-content: center;
  .bot-container {
    margin: 0 auto;
  }
  .left {
    text-align: left;
    color: #85878a;
    margin-right: 20px;
    a {
      color: #85878a;
    }
    img {
      width: 100px;
    }
    .copyright {
      margin: 20px 0 15px;
    }
  }

  .right {
    font-size: 16px;
    ul {
      display: flex;
      .title {
        color: #85878a;
        margin-bottom: 25px;
      }
      li {
        margin-top: 15px;
        border-left: 2px solid #535352;
        text-align: center;
        width: 275px;
        .link {
          color: #d3d4d5;
          & + .link {
            margin-top: 16px;
          }
        }

        .icon-row {
          width: 130px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          color: #d3d4d5;
          cursor: pointer;
          & + .icon-row {
            margin-top: 4px;
          }
          .icon {
            width: 31px;
            height: 31px;
            margin-right: 10px;
          }
        }
        .icon-box {
          padding-left: 60px;
          display: flex;
          margin-top: 45px;
          .item {
            & + .item {
              margin-left: 15px;
            }
            .icon {
              width: 44px;
              height: 44px;
            }
          }
        }
        .icon {
          cursor: pointer;
        }
      }
    }
  }
}

.bot-title {
  padding: 20px 0;
  font-size: 30px;
  // backdrop-filter: saturate(180%) blur(10px);
  // background-image: linear-gradient(rgba(255, 255, 255, 0.62), rgba(238, 238, 238, 1));
  background-color: rgba(217, 217, 217, 0.6);
  font-family: HarmonyOS_Sans_SC_Medium;
  color: #fff;
  font-style: italic;
}
</style>
