<template>
  <icon-base v-bind="$attrs">
    <component v-if="iconName" :is="iconName" />
  </icon-base>
</template>

<script>
import { computed, defineAsyncComponent as _ } from "vue";
import IconBase from "@/svg/IconBase.vue";

const components = { IconBase };

const r = require.context("@/svg/icons/", true, /.*\.vue$/);
r.keys().forEach((path) => {
  const name = path.slice(2, -4);
  // components[name] = r(path).default; // equivalent to `import ... from ...`
  components[name] = _(() => import(`@/svg/icons/${path.slice(2)}`));
});

// alias component
const alias = {
  iconCategory: "iconList",
  iconBack: "iconLeft",
  iconNext: "iconRight",
  iconDelete: "iconTrash",
};

export default {
  props: {
    iconName: { type: String, default: "" },
  },
  components,

  setup(props) {
    const iconName = computed(() => {
      const toCamel = props.iconName
        .toLowerCase()
        .replace(/-[a-z]/, (chr) => chr[1].toUpperCase());

      return alias[toCamel] || toCamel; // `vue` can also tranlate automaticly
    });

    return {
      iconName,
    };
  },
};
</script>
