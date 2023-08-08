<template>
  <div class="filter-box">
    <div class="left">
      <div class="row-item" v-for="row in selects" :key="row.label">
        <div class="label">{{ row.label }}:</div>
        <div class="list">
          <div
            class="tag"
            :class="[{ active: row.activeIndex === item.value }, item.className]"
            v-for="item in row.list"
            :key="item.label"
            @click="changeFilter(row, item)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <span
        class="tag"
        :class="{
          active: rightTagIndex.includes(tag.markId),
        }"
        v-for="tag in carerTags"
        :key="tag.markId"
        @click="rightTagSelect(tag)"
      >
        {{ tag.mark }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import api from "@/api";
import { useRoute, useRouter } from "vue-router";
import { selectArr } from "./config";

const props = defineProps({
  level: {
    type: [Number, String],
    default: 0,
  },
});

const emits = defineEmits(["filterChange"]);

const router = useRouter();
const route = useRoute();

const selects = reactive(selectArr({ level: props.level }));
const rightTagIndex = ref([1]);
const carerTags = ref([]);

const rightTagSelect = ({ mark, markId }) => {
  if (markId === 1) {
    rightTagIndex.value = [1];
  } else {
    const findIndex = rightTagIndex.value.findIndex((id) => id === markId);
    if (findIndex !== -1) {
      // 取消选中
      rightTagIndex.value.splice(findIndex, 1);
    } else {
      // 选中
      rightTagIndex.value.push(markId);
      // 置灰全部标签
      const allIndex = rightTagIndex.value.findIndex((id) => id === 1);
      allIndex !== -1 && rightTagIndex.value.splice(allIndex, 1);
    }
  }
  emits("filterChange", rightTagIndex.value, "tag");
};

const changeFilter = (row, item) => {
  row.activeIndex = item.value;
  emits("filterChange", row);
};

const getMark = async (row, item, idx) => {
  const res = await api.getAllMarkTextInfoList();
  carerTags.value = res.data;
};

getMark();
</script>
<style lang="scss" scoped>
.filter-box {
  display: flex;
  justify-content: space-between;
  border: 1px solid #e6e2e2;
  background-color: #fff;
  font-size: 16px;
  height: 268px;
  .left {
    padding: 23px 46px 30px 50px;
    border-right: 1px solid #e6e2e2;
    width: 629px;
    .label {
      padding-top: 4px;
      color: #000;
      font-weight: 600;
      margin-right: 16px;
      white-space: nowrap;
    }

    .list,
    .row-item {
      display: flex;
    }

    .list {
      flex-wrap: wrap;
    }

    .tag {
      width: 100px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #47c4f4;
      font-weight: 600;
      cursor: pointer;
      margin-right: 20px;
      margin-bottom: 18px;
      transition: color 0.5s, background-color 0.5s;
      // & + .tag {
      //   margin-left: 20px;
      // }
      &:nth-child(4n) {
        margin-right: 0;
      }
      &.active {
        background-color: #47c4f4;
        color: #fff;
      }
      &.diamond {
        margin-left: 120px;
      }
    }
  }

  .right {
    flex: 1;
    padding: 28px 36px;
    overflow: auto;
    .tag {
      float: left;
      margin-right: 6px;
      margin-bottom: 16px;
      padding: 0 15px;
      color: #cdcdcd;
      line-height: 26px;
      border-radius: 14px;
      background-color: #f8f8f8;
      border: 1px solid #e5e5e5;
      white-space: nowrap;
      cursor: pointer;
      transition: color 0.5s, background-color 0.5s;
      &.active {
        background-color: #47c4f4;
        color: #fff;
        border-color: #47c4f4;
      }
    }
  }
}
</style>
