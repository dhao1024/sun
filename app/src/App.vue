<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component
        :is="Component"
        v-if="route.meta.keepAlive"
        :key="route.path"
      />
    </keep-alive>
    <component :is="Component" v-if="!route.meta.keepAlive" />
  </router-view>
</template>

<style lang="less">
@import "~@/common/style/index.less";

// global css style is here
* {
  box-sizing: border-box;
}
::-webkit-scrollbar {
  display: none;
}
html {
  font-size: 10vmin;
}
body {
  margin: 0;
  padding: 0;
  background-color: #colors[gray];
}
a {
  text-decoration: none;
  color: #colors[font];
}
input {
  border: none;
}
textarea {
  resize: none;
  border: none;
}
li {
  list-style-type: none;
}
p {
  margin: 0;
}
svg {
  width: @icon-size;
  height: @icon-size;
  margin: 0 2px;
  vertical-align: middle;
  &.tiny {
    width: @icon-size-tiny;
    height: @icon-size-tiny;
  }
  &.small {
    width: @icon-size-small;
    height: @icon-size-small;
  }
  &.large {
    width: @icon-size-large;
    height: @icon-size-large;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: @font-size;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #colors[font];
  text-align: center;
}

.top-bar {
  #flex-container();
  position: fixed;
  top: 0;
  padding: 5px;
  background-color: #colors[white];
  height: @top-bar-height;
}

.font-strong {
  #font-strong();
}

.with-top {
  padding-top: @top-bar-height;
}

.with-nav {
  padding-bottom: @nav-bar-height;
}

.round-prune {
  --size: 20px; // you can rewrite `--size` to change the size of `.round-prune`
  width: var(--size);
  height: var(--size);
  margin: 0 calc(var(--size) / 10);
  padding: calc(var(--size) / 10);
  border-radius: calc(var(--size) / 2);
  #border();
  overflow: hidden;
  vertical-align: middle;
}
</style>
