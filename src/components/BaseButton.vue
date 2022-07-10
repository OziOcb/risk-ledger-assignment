<template>
  <!-- No need for @click because he click listener will be added to the root element of <MyButton>  -->
  <!-- Docs = https://vuejs.org/guide/components/attrs.html#v-on-listener-inheritance -->
  <button :class="['button', { 'button--active': active }]">
    <div>
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}

.button {
  position: relative;
  padding: 1.6rem 2.2rem;
  color: $color-text-primary;
  background-color: transparent;
  border: 1px solid $color-white;
  cursor: pointer;
  border-radius: 0.4rem;
  overflow: hidden;
  transition: border-color $duration-transition-base linear;
  &:before {
    content: "";
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      $color-black,
      $color-black,
      $color-secondary,
      $color-accent,
      $color-white,
      $color-accent,
      $color-secondary,
      $color-black,
      $color-black
    );
    background-size: 700% auto;
    animation: gradient 6s linear infinite;
  }

  &:hover {
    border-color: transparent;
    &:before {
      display: block;
    }
  }

  &--active {
    background-color: $color-secondary;
  }
}
</style>
