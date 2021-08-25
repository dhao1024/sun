<template>
  <header class="top-bar">
    <icon-svg icon-name="icon-back" @click="back" />

    <div class="search-bar">
      <input
        type="search"
        autofocus
        class="search-input"
        v-model="inputKeyword"
        :placeholder="recommendKeyword"
        @input="inputChanged"
        @keyup.enter="commitSearch()"
      />
      <icon-svg
        icon-name="icon-camera"
        small
        v-if="!inputKeyword"
        @click="to('/open-camera')"
      />
    </div>

    <div class="commit" @click="commitSearch()">Go</div>
  </header>

  <main class="with-top">
    <section class="search-histroy">
      <div class="title" v-if="searchHistory.length">
        <span class="font-strong">Search Histroy</span>
        <div>
          <icon-svg
            icon-name="icon-delete"
            tiny
            v-if="!editStatus"
            @click="editStatus = true"
          />
          <div v-else>
            <span @click="clearHistory">clear</span> |
            <span style="color: red" @click="editStatus = false">finsh</span>
          </div>
        </div>
      </div>

      <div class="container">
        <deletable-item
          v-for="(item, idx) in searchHistory"
          :key="idx"
          :value="item"
          :enable="editStatus"
          @click="!editStatus && commitSearch(item)"
          @delete="removeHistory(idx)"
        />
      </div>
    </section>

    <section class="search-find">
      <div class="title">
        <span class="font-strong">Search Find</span>
        <div>
          <icon-svg
            icon-name="icon-eye"
            tiny
            v-if="!hiddenStatus"
            @click="hiddenStatus = true"
          />
          <div v-else>
            <span>hidden </span>
            <icon-svg
              icon-name="icon-eye-slash"
              tiny
              @click="hiddenStatus = false"
            />
          </div>
        </div>
      </div>

      <div class="container" v-if="!hiddenStatus">
        <deletable-item
          v-for="(item, idx) in searchFind"
          :key="idx"
          :value="item"
          :enable="false"
          @click="commitSearch(item)"
        />
      </div>
    </section>
  </main>

  <div class="search-complete" v-if="completeKeyword.length">
    <li
      class="complete-keyword"
      v-for="(item, idx) in completeKeyword"
      :key="idx"
      @click="commitSearch(item)"
    >
      {{ item }}
    </li>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useSearchHistory } from "@/store";
import { getSearchRecommend, getSearchComplete } from "@/service";
import { debounce } from "@/utils";
import DeletableItem from "@/components/DeletableItem.vue";

const state = reactive({
  error: null,
  loading: false,
  inputKeyword: "",
  recommendKeyword: "",
  completeKeyword: [],
  searchFind: [],
  editStatus: false,
  hiddenStatus: false,
});

export default {
  components: {
    DeletableItem,
  },

  setup() {
    const router = useRouter();
    const searchHistory = useSearchHistory();

    const _fetch = async (callback, ...args) => {
      state.loading = true;
      state.error = null;
      try {
        const res = await callback(...args);
        return res.data;
      } catch (err) {
        state.error = err.response;
      }
      state.loading = false;
    };

    const commitSearch = (keyword) => {
      keyword = keyword || state.inputKeyword || state.recommendKeyword;
      if (keyword) {
        router.push({
          path: "/search-result",
          query: { q: keyword },
        });

        searchHistory.updateHistory(keyword);
      }
    };

    const removeHistory = searchHistory.removeHistory;

    const clearHistory = () => {
      searchHistory.clearHistory();
      state.editStatus = false;
    };

    const inputChanged = debounce((e) => {
      const keyword = e.target.value;
      if (keyword) {
        _fetch(getSearchComplete, keyword).then((data) => {
          if (data) {
            state.completeKeyword = data;
          }
        });
      } else {
        state.completeKeyword = [];
      }
    }, 200);

    // initial
    state.inputKeyword = "";
    state.searchFind = [];
    state.completeKeyword = [];
    _fetch(getSearchRecommend).then((data) => {
      if (data) {
        state.recommendKeyword = data.keyword;
        state.searchFind = data.searchFind;
      }
    });

    return {
      ...toRefs(state),
      to: router.push,
      back: router.back,
      searchHistory,
      commitSearch,
      removeHistory,
      clearHistory,
      inputChanged,
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/common/style/index.less";

.top-bar {
  background-color: #colors[gray];
  .search-bar {
    align-self: stretch;
    #flex-container();
    padding: 0 5px;
    border: 1px solid #colors[theme];
    border-radius: @top-bar-height*0.5;
    background-color: #colors[white];
    .search-input {
      flex-grow: 1;
    }
  }
  .commit {
    margin: 0 2px;
    white-space: nowrap;
  }
}

.title {
  #flex-container();
  background-color: #colors[gray];
}

.container {
  #flex-container();
  padding: 5px;
  background-color: #colors[gray];
  justify-content: left;
  flex-wrap: wrap;
}

.search-complete {
  position: fixed;
  top: @top-bar-height;
  width: 100%;
  height: 100vh;
  padding-bottom: @top-bar-height;
  background-color: #colors[gray];
  overflow: scroll;
  text-align: left;
  .complete-keyword {
    padding: 5px;
    &:hover {
      background-color: #colors[white];
    }
  }
}
</style>
