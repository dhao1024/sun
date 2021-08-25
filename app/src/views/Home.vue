<template>
  <div class="home">
    <!-- <product-item /> -->
    <comment-input to="dd" @close="f" />
  </div>
  <nav-bar />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ProductItem from "@/components/ProductItem.vue";
import CommentInput from "@/components/CommentInput.vue";

export default {
  components: {
    NavBar,
    ProductItem,
    CommentInput,
  },

  setup() {
    return {
      f(d) {
        console.log(d);
      },
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/common/style/index.less";
</style>
