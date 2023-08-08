<template>
  <div class="search-main">
    <div class="main-container">
      <Filter @filterChange="filterChange" :level="level"></Filter>

      <div class="list" v-loading="loading">
        <ThePersonCard v-if="list.length" :list="list"></ThePersonCard>
        <TheEmpty v-else></TheEmpty>

        <div class="total">共{{ total }}条</div>

        <div class="sort-box">
          <div
            :class="['sort-item', { active: sortIndex === idx }]"
            v-for="(item, idx) in sortArr"
            @click="sortHandler(item, idx)"
            :key="item.name"
          >
            {{ item.name }}
            <el-icon style="margin-left: 3px">
              <ArrowDown v-if="item.value === 1"></ArrowDown>
              <ArrowUp v-else></ArrowUp>
            </el-icon>
          </div>
        </div>

        <div class="next-page" v-if="query.pageIndex < totalPage" @click="nextPage"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ArrowDown, ArrowUp } from "@element-plus/icons-vue";
import Filter from "@/components/filter";
import ThePersonCard from "@/components/ThePersonCard.vue";
import TheEmpty from "@/components/TheEmpty.vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api";
import { levelList } from "@/components/filter/config";

const emits = defineEmits(["scrollTo"]);
const route = useRoute();
const router = useRouter();

const loading = ref(false);
const sortIndex = ref(0);

const sortArr = reactive([
  { name: "综合", prop: 0, value: 1 },
  { name: "按从业时间", prop: 2, value: 1 },
  { name: "按年龄", prop: 1, value: 1 },
]);

const total = ref(0);
const totalPage = ref(0);

const { searchNameType, keyword, carerType } = route.query;
let level = "";

const findLevel = levelList.find((l) => l.label.includes(keyword));
if (Number(searchNameType) === 2 && findLevel) {
  level = findLevel.value;
  router.replace({
    query: {},
  });
}

const query = reactive({
  pageIndex: 1,
  pageSize: 9,
  sort: 0,
  orderBy: 1,
  markIdList: [],
  nativePlaceArea: "",
  ageRange: "",
  education: "",
  level,
  type: carerType ? Number(carerType) : 1,
  name: Number(searchNameType) === 1 ? keyword : "",
});

const list = ref([]);

const sortHandler = (item, idx) => {
  sortIndex.value = idx;
  item.value = item.value === 1 ? 2 : 1;
  query.sort = item.prop;
  query.orderBy = item.value;
  query.pageIndex = 1;
  getList();
};

const filterChange = (item, type) => {
  if (type === "tag") {
    if (item.includes(1)) item = [];
    query.markIdList = item;
  } else {
    query[item.prop] = item.activeIndex;
  }
  query.pageIndex = 1;
  getList();
};

const nextPage = () => {
  query.pageIndex = query.pageIndex + 1;
  getList("nextPage");
};

const getList = async (type) => {
  loading.value = true;
  try {
    const { data } = await api.getSearchBabyCarerPageList(query);
    if (type === "nextPage") {
      list.value = list.value.concat(data.data);
    } else {
      list.value = data.data;
    }
    total.value = data.total;
    totalPage.value = Math.ceil(data.total / 9);
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

getList();
</script>
<style lang="scss" scoped>
.search-main {
  padding: 50px 0 40px;
  background-color: #f8f8f8;
  .list {
    margin-top: 55px;
    border: 1px solid #e6e2e2;
    padding: 17px 16px 30px;
    position: relative;
    background-color: #fff;

    .total {
      position: absolute;
      left: 0;
      top: -25px;
      color: #000;
      font-weight: 600;
    }

    .next-page {
      position: absolute;
      width: 100%;
      height: 30px;
      background: url(@/assets/images/search/next.png) no-repeat center / 31px 18px;
      cursor: pointer;
      left: 50%;
      transform: translateX(-50%);
      bottom: 14px;
    }

    .sort-box {
      position: absolute;
      right: 17px;
      top: -28px;
      display: flex;
      .sort-item {
        height: 27px;
        border-left: 1px solid #e6e2e2;
        border-top: 1px solid #e6e2e2;
        border-right: 1px solid #e6e2e2;
        border-radius: 5px 5px 0 0;
        display: flex;
        align-items: center;
        padding: 0 12px;
        color: #47c4f4;
        background-color: #fff;
        cursor: pointer;
        & + .sort-item {
          margin-left: 3px;
        }

        &.active {
          background-color: #47c4f4;
          color: #fff;
          border-color: #47c4f4;
        }
      }
    }
  }
}
</style>
