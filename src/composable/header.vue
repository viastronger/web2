<template>
  <div class="main-container">
    <div class="logo" @click="router.push('home')">
      <img src="@/assets/images/logo/logo_light.png" alt="" />
    </div>

    <div class="right">
      <div class="search-box">
        <el-dropdown popper-class="person-type">
          <el-button type="primary" color="#47c4f4" round>
            {{ searchNameType === 1 ? "月嫂姓名" : "月嫂等级" }}
            <el-icon style="margin-left: 5px">
              <ArrowDown></ArrowDown>
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changeType(1)">
                <div class="dropdown-item">月嫂姓名</div>
              </el-dropdown-item>
              <el-dropdown-item @click="changeType(2)">
                <div class="dropdown-item">月嫂等级</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <input type="text" v-model="keyword" @keyup.enter="search" />
        <img @click="search" src="@/assets/images/home/search_icon.png" alt="" />
      </div>
      <div class="phone">
        <img src="@/assets/images/home/phone.png" alt="" />
        {{ contactNumber }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { contactNumber } from "../config/constants";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";

const router = useRouter();
const route = useRoute();
const reload = inject("reload");

const keyword = ref("");
const searchNameType = ref(1);

const search = () => {
  // if(!keyword.value) {
  //   return ElMessage.warning('请输入查询内容')
  // }

  const flag = route.name === "search";

  router
    .push({
      name: "search",
      query: {
        keyword: keyword.value,
        searchNameType: searchNameType.value,
      },
    })
    .then(() => {
      if (flag) reload();
    });
};

const changeType = (type) => {
  searchNameType.value = type;
};
</script>
<style lang="scss" scoped>
.main-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0 19px;
  .logo {
    width: 28%;
    cursor: pointer;
  }
  .right {
    display: flex;
    align-items: center;
    .search-box {
      display: flex;
      align-items: center;
      margin-right: 75px;
      width: 497px;
      height: 30px;
      border: 1px solid #a0a0a0;
      border-radius: 15px;
      padding: 0 50px 0 3px;
      position: relative;
      background-color: #fff;
      .el-button {
        font-size: 16px;
        color: #fff;
      }
      input {
        border: none;
        display: block;
        height: 100%;
        width: 100%;
        padding-left: 10px;
      }
      img {
        position: absolute;
        top: -1px;
        right: -1px;
        width: 49px;
        height: 30px;
        cursor: pointer;
      }
    }
    .phone {
      white-space: nowrap;
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      img {
        margin-right: 8px;
        width: 17px;
        height: 17px;
      }
    }
  }
}

.person-type {
  .dropdown-item {
    cursor: pointer;
    padding: 3px 10px;
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
