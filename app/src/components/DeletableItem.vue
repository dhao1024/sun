<template>
  <li class="deletable-item">
    <span>
      {{ value }}
    </span>
    <icon-svg
      icon-name="icon-text-x"
      small
      v-if="enable"
      @click="$emit('delete')"
    />
  </li>
</template>

<script>
export default {
  props: {
    value: { type: String, default: "" },
    enable: { type: Boolean, default: false },
  },
  emits: ["delete"],
};
</script>

<style lang="less" scoped>
@import "~@/common/style/index.less";

.deletable-item {
  display: inline-block;
  padding: 2px 5px;
  margin: 2px 5px;
  background-color: #colors[white];
  border-radius: @font-size;
}
</style>
