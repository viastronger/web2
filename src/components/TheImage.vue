<template>
  <el-image
    :src="src"
    :preview-src-list="previewlist"
    :initial-index="initialIndex"
    @load="imgLoadHandler"
    ref="elImageRefEl"
  >
    <template #placeholder>
      <div class="image-slot">Loading<span class="dot">...</span></div>
    </template>
    <template #error>
      <div class="image-slot">
        <el-icon><Picture /></el-icon>
      </div>
    </template>
  </el-image>
</template>

<script setup>
import { ref, defineProps, defineExpose } from "vue";
import { Picture } from "@element-plus/icons-vue";

defineProps({
  src: {
    type: String,
    default: "",
  },
  previewlist: {
    type: Array,
    default: () => {
      return [];
    },
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(["load"]);

const elImageRefEl = ref(null);

const imgLoadHandler = (e) => {
  emits("load", e);
};

const getEl = () => {
  return elImageRefEl.value.$el;
};

defineExpose({
  getEl,
});
</script>
<style lang="scss" scoped>
.el-image {
  width: 100%;
  height: 100%;
  .image-slot {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: var(--el-text-color-secondary);
  }
  :deep(.el-image-viewer__wrapper) {
    img {
      width: auto;
    }
  }
}
</style>
