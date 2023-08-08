<template>
  <div class="tips" :style="styleObj">{{ title }}</div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  styleObj: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
<style lang="scss" scoped>
.tips {
  position: absolute;
  top: -14px;
  width: 185px;
  height: 28px;
  background-color: #47c4f4;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #fff;
  &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-top: 5px solid transparent;
    border-right: 5px solid transparent;
    border-left: 5px solid #186582;
    border-bottom: 5px solid #186582;
    right: -10px;
    top: 4px;
  }
}
</style>
