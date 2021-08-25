<template>
  <header class="top-bar">
    <icon-svg icon-name="icon-back" @click="back" />

    <div class="search-bar">
      <deletable-item
        v-for="(item, idx) in keywords"
        :key="idx"
        :value="item"
        :enable="true"
        @delete="keywords.splice(idx, 1)"
      />
    </div>

    <icon-svg icon-name="icon-list" />
  </header>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import DeletableItem from "@/components/DeletableItem.vue";

const state = reactive({
  keywords: ["qq", "55", "ff"],
});

export default {
  components: {
    DeletableItem,
  },

  setup() {
    const router = useRouter();

    return {
      ...toRefs(state),
      to: router.push,
      back: router.back,
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/common/style/index.less";

.top-bar {
  background-color: #colors[gray];
  .search-bar {
    flex-grow: 1;
    height: 100%;
    padding: 0 5px;
    border: 1px solid #colors[theme];
    border-radius: @top-bar-height*0.5;
    background-color: #colors[white];
    text-align: left;
  }
}

.deletable-item {
  margin-left: 2px;
  margin-right: 2px;
  background-color: #colors[gray];
  font-size: @font-size-small;
}
</style>
