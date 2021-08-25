<template>
  <header class="top-bar">
    <icon-svg />
    <div>
      <span class="font-strong">购物车</span>
      <icon-svg
        class="round-prune"
        icon-name="icon-position"
        @click="to('/city')"
      />
    </div>
    <icon-svg icon-name="icon-more" @click="to('/more')" />
  </header>

  <main class="main with-top0 with-nav">
    <div class="block">border</div>
  </main>

  <nav-bar />
</template>

<script>
import { toRefs, reactive } from "vue";
import { useRouter } from "vue-router";

import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },

  setup() {
    const router = useRouter();
    const state = reactive({});

    function f(e) {
      debugger;
    }

    return {
      ...toRefs(state),
      to: router.push,
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/common/style/index.less";

.top-bar {
  position: sticky;
  top: -10px;
  background-color: #colors[gray];
}

.round-prune {
  --size: 16px;
  vertical-align: text-bottom;
}

.main {
  background-color: #colors[gray];
  .block {
    height: 1000px;
    background-color: #colors[white];
  }
}
</style>
