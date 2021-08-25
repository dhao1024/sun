<template>
  <form
    class="comment-input"
    @submit.prevent="addComment({ username, email, content, to })"
  >
    <section class="form-item">
      <label for="username" class="left">用户名</label>
      <input
        type="text"
        id="username"
        class="right"
        v-model="username"
        required
        autofocus
      />
    </section>
    <section class="form-item">
      <label for="email" class="left">邮箱</label>
      <input type="email" id="email" class="right" v-model="email" required />
    </section>
    <section class="form-item">
      <label for="content" class="left">评论</label>
      <textarea
        rows="5"
        id="content"
        v-model="content"
        class="right"
      ></textarea>
    </section>
    <section class="action">
      <span>
        <label for="submit" class="button">完成</label>
        <input type="submit" id="submit" hidden />
      </span>
      <span class="button" @click="$emit('close')">取消</span>
    </section>
  </form>
</template>

<script>
import { reactive, toRefs } from "vue";

const state = reactive({
  username: "",
  email: "",
  content: "",
});

export default {
  props: {
    to: {
      type: String,
      default: "",
    },
  },
  emits: ["close"],

  setup(props, { emit }) {
    const addComment = ({ username, email, content, to }) => {
      console.log("ccc");
      emit("close");
    };

    return {
      ...toRefs(state),
      addComment,
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/common/style/index.less";

.comment-input {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 80%;
  background-color: #f0f0f0;
  .form-item {
    display: flex;
    justify-content: space-around;
    margin: 5px 0;
    .left {
      width: 25%;
    }
    .right {
      width: 75%;
    }
  }
}
.action {
  margin: 10px 0;
  .button {
    margin: 0 10px;
    padding: 5px;
    border: 1px solid red;
  }
}
</style>
