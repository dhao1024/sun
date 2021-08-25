<template>
  <header class="top-bar">
    <icon-svg icon-name="icon-back" @click="back" />
    <span class="font-strong">Empty Page</span>
    <icon-svg icon-name="icon-chat" />
  </header>

  <div @click="back" class="main with-top">
    <p>
      You wana go to <b style="font-size: 16px">{{ route.fullPath }}</b>
    </p>
    <p>but this page is not completed</p>
    <p>click any to back</p>
    <img src="~@/assets/logo.png" alt="" />
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    return {
      route,
      back: router.back,
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/common/style/index.less";

.top-bar {
  #flex-container();
  position: fixed;
  top: 0;
  #border();
}
</style>
