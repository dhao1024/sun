<template>
  <nav class="nav-bar">
    <router-link
      custom
      v-slot="{ navigate, isActive }"
      v-for="([path, title, iconName], index) in navMap"
      :key="index"
      :to="path"
    >
      <li class="nav-item" :class="isActive && 'active'" @click="navigate">
        <icon-svg :icon-name="iconName" />
        <div>{{ title }}</div>
      </li>
    </router-link>
  </nav>
</template>

<script>
const navMap = [
  ["/home", "Home", "icon-home"],
  ["/category", "Category", "icon-category"],
  ["/cart", "Cart", "icon-cart"],
  ["/user", "User", "icon-user"],
];

export default {
  setup() {
    return {
      navMap,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/index.less";

.nav-bar {
  #flex-container();
  position: fixed;
  bottom: 0;
  height: @nav-bar-height;
  border-top: 1px solid #colors[border];
  .nav-item {
    width: 20%;
  }
}
.active {
  color: #colors[theme];
}
</style>
