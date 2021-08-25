<template>
  <header class="top-bar">
    <icon-svg icon-name="icon-scan" @click="to('/open-camera')" />

    <div class="search-bar">
      <icon-svg icon-name="icon-search" small @click="to('/search')" />
      <input class="search-input" @click="to('/search')" />
      <icon-svg icon-name="icon-camera" small @click="to('/open-camera')" />
    </div>

    <icon-svg icon-name="icon-chat" @click="to('/chat')" />
  </header>

  <main class="main with-top with-nav">
    <aside ref="sideBar" class="side-bar" @click="selectCategory">
      <li
        v-for="({ title }, idx) in categories"
        :key="idx"
        :data-index="idx"
        class="side-item"
        :class="[
          categoryID === idx + 1 && 'selected-before',
          categoryID === idx && 'selected',
          categoryID === idx - 1 && 'selected-after',
        ]"
      >
        <span>{{ title }}</span>
      </li>
    </aside>

    <div
      ref="content"
      class="content"
      :class="categoryID === 0 && 'clear-radius'"
      @scroll="updateIndexBar"
    >
      <section class="top-show" v-if="categoryData.topShow">
        <img :src="categoryData.topShow" />
      </section>

      <section ref="indexBar" class="index-bar" @click="selectBlock">
        <li
          v-for="({ title }, idx) in categoryData.block"
          :key="idx"
          :data-index="idx"
          class="index-item"
          :class="blockID === idx && 'selected'"
        >
          {{ title }}
        </li>
      </section>

      <section ref="blockList" class="block-list">
        <div
          v-for="({ title, block }, idx) in categoryData.block"
          :key="idx"
          class="block"
        >
          <div class="font-strong">{{ title }}</div>
          <div class="container" :data-index="idx" @click="searchKeyword">
            <li
              v-for="({ name, img }, idx) in block"
              :key="idx"
              :data-index="idx"
              class="block-item"
            >
              <img :src="img" />
              <div>{{ name }}</div>
            </li>
          </div>
        </div>
      </section>
    </div>
  </main>

  <nav-bar />
</template>

<script>
import { reactive, toRefs, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import { getCategory } from "@/service";
import { throttle, getChildTarget, getOffsetToParent } from "@/utils";

const elements = reactive({
  sideBar: null, // reference element `.side-bar`
  content: null, // `.content`
  indexBar: null, // `.index-bar`
  blockList: null, // `.block-list`
});
const state = reactive({
  error: null,
  categories: [],
  categoryData: {},
  loading: false,
  categoryID: 0,
  blockID: 0,
});

export default {
  components: {
    NavBar,
  },

  setup() {
    const router = useRouter(); // `useRouter()` is base on `vue.reject()`, only used inside `setup()`

    const _fetchCategory = async (id) => {
      let res;

      state.loading = true;
      state.error = null;
      try {
        if (id == null) {
          // `==` is used instead of `===` ,equivalent to `id===undefined || id===null`
          state.categories = [];
          res = await getCategory();
          state.categoryID = 0;
          state.categories = res.data;
          id = 0;
        }
        state.categoryData = {};
        res = await getCategory(id);
        state.blockID = 0;
        state.categoryData = res.data;
      } catch (err) {
        state.blockID = 0;
        state.categoryData = {};
        state.error = err.response;
      }
      state.loading = false;
    };

    watch(
      () => state.categoryID,
      (newID) => {
        const sideItem = elements.sideBar.children[newID];
        if (sideItem) {
          const { top } = getOffsetToParent(sideItem, { align: "center" });
          elements.sideBar.scrollTo({ top, behavior: "smooth" });
        }

        _fetchCategory(state.categoryID);
      }
    );

    watch(
      () => state.blockID,
      (newID) => {
        const indexItem = elements.indexBar.children[newID];
        if (indexItem) {
          const { left } = getOffsetToParent(indexItem, { align: "center" });
          elements.indexBar.scrollTo({ left, behavior: "smooth" });
        }
      }
    );

    const selectCategory = async (e) => {
      const sideItem = getChildTarget(e);
      if (sideItem) {
        state.categoryID = parseInt(sideItem.dataset.index);
      }
    };

    const selectBlock = (e) => {
      const indexItem = getChildTarget(e);
      if (indexItem) {
        state.blockID = parseInt(indexItem.dataset.index);
        elements.blockList.children[state.blockID].scrollIntoView();
      }
    };

    const updateIndexBar = throttle(() => {
      const blocks = elements.blockList.children;
      if (blocks.length === 0) return;

      const scrollTop = elements.content.scrollTop;
      const offset =
        elements.indexBar.offsetHeight + elements.content.offsetHeight * 0.2;
      // console.log(scrollTop);

      let max;
      let min;
      let currentID = state.blockID;
      while (true) {
        max = getOffsetToParent(blocks[currentID + 1], elements.content).top;
        min = getOffsetToParent(blocks[currentID], elements.content).top;

        if (scrollTop + offset > max) {
          currentID++;
        } else if (scrollTop + offset < min && currentID > 0) {
          currentID--;
        } else {
          break;
        }
        state.blockID = currentID;
      }
    }, 250);

    const searchKeyword = (e) => {
      const item = getChildTarget(e);
      if (item) {
        const blockIdx = e.currentTarget.dataset.index;
        const itemIdx = item.dataset.index;
        router.push(`/search?q=${state.categoryID}-${blockIdx}-${itemIdx}`);
      }
    };

    onMounted(() => {
      _fetchCategory();
    });

    return {
      ...toRefs(state),
      ...toRefs(elements),
      to: router.push,
      selectCategory,
      selectBlock,
      updateIndexBar,
      searchKeyword,
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/common/style/index.less";

@raidus: 8px;
@index-bar-height: 30px;

.top-bar {
  height: @top-bar-height * 0.9;
  .search-bar {
    #flex-container(); // maybe `inline-flex` is more semantic
    flex-grow: 1; // horizontal stretch
    align-self: stretch;
    border-radius: @top-bar-height*0.5;
    padding: 0 5px; // because border-radius, reserve safe area
    background-color: #colors[gray];
    .search-input {
      flex-grow: 1;
      background-color: #colors[gray];
    }
  }
}

.main {
  height: 100vh;
  background-color: #colors[gray];
  .side-bar {
    display: inline-block;
    width: 30%;
    max-height: 100%; // expect `side-bar` as short as possible, so the left area is always gray
    background-color: #colors[white];
    vertical-align: top;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .content {
    display: inline-block;
    width: 70%;
    height: 100%;
    background-color: #colors[white];
    vertical-align: top;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 15px;
    border-top-left-radius: @raidus;
    &.clear-radius {
      border-top-left-radius: 0;
    }
  }
}

.side-item {
  padding: 5px;
  cursor: pointer;
  background-color: #colors[gray];
  &.selected {
    #font-strong();
    background-color: #colors[white];
  }
  &.selected-before {
    border-bottom-right-radius: @raidus;
  }
  &.selected-after {
    border-top-right-radius: @raidus;
  }
}

section {
  &.top-show {
    margin-top: 5px;
    img {
      width: 100%;
      max-width: 250px;
      border-radius: @raidus;
      vertical-align: middle;
    }
  }
  &.index-bar {
    #flex-container();
    position: sticky;
    top: 0;
    height: @index-bar-height;
    overflow-x: scroll;
  }
  &.block-list {
    text-align: left;
  }
}

.index-item {
  flex-shrink: 0;
  margin: 0 2px;
  padding: 0 4px;
  #border();
  border-radius: @index-bar-height;
  cursor: pointer;
  &.selected {
    color: #colors[theme];
    border-color: #colors[theme];
  }
}

.block {
  scroll-margin-top: @index-bar-height;
  .container {
    .block-item {
      display: inline-block;
      width: 33.3%;
      padding: 5px;
      text-align: center;
      img {
        width: @category-img-width;
        height: @category-img-height;
      }
    }
  }
}
</style>
