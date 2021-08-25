<template>
  <li class="product-item">
    <img :src="img || require('@/assets/logo.png')" class="image" />
    <p class="description">{{ description }}</p>
    <section class="purchase">
      <span class="price">
        ￥<span class="font-strong">{{ priceInt }}</span
        >.{{ priceDec }}
      </span>
      <icon-svg icon-name="icon-cart" />
    </section>
  </li>
</template>

<script>
import { reactive, toRefs, computed } from "vue";

const state = reactive({});

export default {
  props: {
    img: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default:
        "descriptiondescriptiondescriptiondescriptiondescriptiondescription",
    },
    price: {
      type: Number,
      default: 12.345,
    },
  },

  setup(props) {
    const priceInt = computed(() => {
      return parseInt(props.price);
    });
    const priceDec = computed(() => {
      return parseInt((props.price * 100) % 100);
    });

    return {
      ...toRefs(props),
      ...toRefs(state),
      priceInt,
      priceDec,
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/common/style/index.less";

.product-item {
  display: inline-block;
  width: 40%;
  background-color: #colors[white];
}

.image {
  max-width: 100%;
}

.description {
  text-align: left;
  text-overflow: ellipsis;
}

.purchase {
  #flex-container();
  .price {
    color: #colors[theme];
  }
}
</style>
