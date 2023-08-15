<template>
  <div class="map-container">
    <div id="map"></div>

    <div class="mask-pos" @click="mapReset">
      <img src="@/assets/images/home/07.png" alt="" /> 上海市青浦区朱家角西井街84号北门
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

let map = null;
const centerCoor = [31.113334, 121.054681];

onMounted(() => {
  initMap();
});

const mapReset = () => {
  map && map.setCenter(new TMap.LatLng(...centerCoor));
};

function initMap(params) {
  //定义地图中心点坐标
  var center = new TMap.LatLng(...centerCoor);
  //定义map变量，调用 TMap.Map() 构造函数创建地图
  map = new TMap.Map(document.getElementById("map"), {
    center: center, //设置地图中心点坐标
    zoom: 17.2, //设置地图缩放级别
    // pitch: 43.5, //设置俯仰角
    // rotation: 45, //设置地图旋转角度
  });

  map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.SCALE);
  map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
  map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION);

  var marker = new TMap.MultiMarker({
    map: map,
    styles: {
      // 点标记样式
      marker: new TMap.MarkerStyle({
        width: 20, // 样式宽
        height: 30, // 样式高
        // anchor: { x: 10, y: 30 }, // 描点位置
      }),
    },
    geometries: [
      // 点标记数据数组
      {
        // 标记位置(纬度，经度，高度)
        position: center,
        id: "marker",
      },
    ],
  });
}
</script>

<style lang="scss" scoped>
.map-container {
  position: relative;
  height: 100%;
  .mask-pos {
    padding: 4px 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2002;
    background-color: #757e82;
    font-size: 22px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      margin-right: 25px;
      width: 20px;
      height: 24px;
    }
  }
}
#map {
  height: 100%;
  :deep([href^="http"]),
  :deep(.logo-text) {
    display: none;
  }
}
</style>
