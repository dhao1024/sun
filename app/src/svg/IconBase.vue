<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    :class="[
      large && !small && !tiny && 'large',
      small && !large && !tiny && 'small',
      tiny && !large && !small && 'tiny',
    ]"
  >
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    large: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    tiny: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "currentColor",
    },
  },
};
</script>
