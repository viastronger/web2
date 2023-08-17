<template>
  <div class="footer-wrap" :class="{ active: footerShow }">
    <div class="footer">
      <div class="ewm-box">
        <img src="@/assets/images/footer/weixin_ewm.jpg" alt="" />
        <img src="@/assets/images/footer/buy_ewm.png" alt="" />
        <img src="@/assets/images/footer/weixin_ewm.jpg" alt="" />
      </div>
      <img src="@/assets/images/footer/footer_bg.png" @load="footerBgLoad" alt="" />
      <TheMap class="map"></TheMap>
    </div>
    <div class="bot-link">
      <div class="left">
        <img src="@/assets/images/logo/logo_dark.png" alt="" />
        <div class="copyright">Copyright ◎2023 All Rights Reserved</div>
        <div class="record">
          <img
            class="security"
            src="@/assets/images/footer/publicSecurityLogo.png"
            alt=""
          />
          <a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备20015794号-1 </a>
          <span> | </span>
          <a href="http://cyberpolice.mps.gov.cn/" target="_blank">
            浙公网安备 33011002016623号
          </a>
        </div>
      </div>

      <div class="right">
        <ul>
          <li>
            <div class="title">相关网站</div>
            <!-- <div class="link">颐挚科技</div> -->
            <div class="link">
              <a href="https://mother-health.yilife.cn" target="_blank">颐挚母婴 </a>
            </div>
            <!-- <div class="link">珅昕陪护</div> -->
          </li>
          <li>
            <div class="title">小程序</div>
            <div class="icon-row">
              <el-popover placement="top-start" width="200" trigger="hover">
                <div class="popover-box">
                  <img class="icon" src="@/assets/images/footer/ewm.png" alt="" />
                  关注挚护易小程序
                </div>
                <template #reference>
                  <div class="icon-row">
                    <img class="icon" src="@/assets/images/footer/01.png" alt="" />
                    挚护易
                  </div>
                </template>
              </el-popover>
            </div>
            <div class="icon-row">
              <div class="icon-row">
                <img class="icon" src="@/assets/images/footer/01.png" alt="" />
                挚护帮
              </div>
            </div>
          </li>
          <li>
            <div class="title" style="padding-left: 60px; text-align: left">关注我们</div>
            <div class="icon-box">
              <div class="item">
                <el-popover placement="top-start" width="200" trigger="hover">
                  <div class="popover-box">
                    <img
                      class="icon"
                      src="@/assets/images/footer/wx_gongzhonghao.jpg"
                      alt=""
                    />
                    关注官方微信公众号
                  </div>
                  <template #reference>
                    <img class="icon" src="@/assets/images/footer/02.png" alt="" />
                  </template>
                </el-popover>
              </div>
              <!-- 空着占位，后面可能加icon -->
              <div class="item" style="width: 31px"></div>
              <div class="item" style="width: 31px"></div>
              <div class="item" style="width: 31px"></div>
              <div class="item" style="width: 31px"></div>
              <div class="item" style="width: 31px"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import TheMap from "@/components/TheMap.vue";
import { debounce } from "lodash-es";

const footerShow = ref(false);

const imgHeight = 1131;
const imgWidth = 1920;
const radio = imgWidth / imgHeight;

const ewmBoxWidthRadio = 1494 / imgWidth;
const ewmBoxHeightRadio = 438 / imgHeight;
const ewmBoxBotRadio = 135 / imgHeight;

const mapTopRadio = 287 / imgHeight;
const mapRightRadio = 213 / imgWidth;
const mapWidthRadio = 675 / imgWidth;
const mapHeightRadio = 222 / imgHeight;

const footerHeight = ref(`${imgHeight}px`);

const ewmBoxWidth = ref("1494px");
const ewmBoxHeight = ref("438px");
const ewmBoxBot = ref("135px");

const mapTop = ref("287px");
const mapRight = ref("213px");
const mapWidth = ref("675px");
const mapHeight = ref("222px");

onMounted(() => {
  setTimeout(resizeSetHeight, 300);
  window.addEventListener("resize", resizeSetHeight);
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
  ewmBoxBot.value = clientHeight * ewmBoxBotRadio + "px";

  mapTop.value = clientHeight * mapTopRadio + "px";
  mapRight.value = clientWidth * mapRightRadio + "px";
  mapWidth.value = clientWidth * mapWidthRadio + "px";
  mapHeight.value = clientHeight * mapHeightRadio + "px";
}, 300);

const footerBgLoad = () => {
  setTimeout(() => {
    footerShow.value = true;
  }, 800);
};
</script>
<style lang="scss" scoped>
.footer-wrap {
  overflow: hidden;
  opacity: 0;
  &.active {
    opacity: 1;
  }
}
.footer {
  position: relative;
  .ewm-box {
    position: absolute;
    bottom: v-bind(ewmBoxBot);
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
    top: v-bind(mapTop);
    right: v-bind(mapRight);
    width: v-bind(mapWidth);
    height: v-bind(mapHeight);
    border-radius: 4px;
    overflow: hidden;
  }
}

.bot-link {
  padding: 70px 0;
  background-color: #1f2329;
  display: flex;
  justify-content: center;
  .bot-container {
    margin: 0 auto;
  }
  .left {
    text-align: left;
    color: #85878a;
    width: 390px;
    a {
      color: #85878a;
    }
    img {
      width: 277px;
    }
    .copyright {
      margin: 10px 0 8px;
    }
    .record {
      display: flex;
      align-items: center;
      span {
        margin: 0 2px;
      }
    }
    .security {
      margin-right: 2px;
      width: 18px;
      height: 18px;
    }
  }

  .right {
    font-size: 16px;
    ul {
      display: flex;
      .title {
        color: #797c7f;
        margin-bottom: 15px;
      }
      li {
        margin-top: 15px;
        // border-left: 1px solid rgba(255, 255, 255, 0.4);
        text-align: center;
        width: 240px;
        font-size: 15px;
        position: relative;
        &:last-child {
          width: fit-content;
        }

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 3px;
          width: 1px;
          background-color: rgba(255, 255, 255, 0.4);
          height: calc(100% - 8px);
        }

        .link {
          color: #d3d4d5;
          & + .link {
            margin-top: 8px;
          }
        }

        .icon-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d3d4d5;
          cursor: pointer;
          & + .icon-row {
            margin-top: 6px;
          }
          .icon {
            width: 26px;
            height: 26px;
            margin-right: 10px;
          }
        }
        .icon-box {
          padding-left: 60px;
          display: flex;
          margin-top: 30px;
          .item {
            & + .item {
              margin-left: 15px;
            }
            .icon {
              width: 31px;
              height: 31px;
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
  background-color: rgba(217, 217, 217, 0.6);
  font-family: HarmonyOS_Sans_SC_Medium;
  color: #fff;
  font-style: italic;
}
</style>
<style lang="scss">
.popover-box {
  text-align: center;
  color: #1f2329;
  font-size: 14px;
  img {
    margin: 0 auto 10px;
    width: 120px;
    height: 120px;
  }
}
</style>
