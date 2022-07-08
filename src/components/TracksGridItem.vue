<template>
  <a
    class="item"
    :href="item.spotifyUrl"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img class="item__img" :src="this.item.albumImageUrl" alt="album's cover" />

    <ul class="item__desc">
      <li><span>Artist:</span> {{ item.artistName }}</li>
      <li><span>Track:</span> {{ item.trackName }}</li>
      <li><span>Last Time Played:</span> {{ item.playedAt }}</li>
    </ul>
  </a>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  display: block;
  text-decoration: none;
  border-radius: 1rem;
  overflow: hidden;
  @media (min-width: $breakpoint-md) {
    border-radius: 0;

    &:after {
      position: absolute;
      content: "";
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: $color-gradient;
      background-blend-mode: $color-gradient-blend-mode;
      opacity: 0;
      transition: opacity $duration-transition-base ease;
      :hover > & {
        opacity: 0.6;
      }
    }
  }

  &__img {
    display: block;
    width: 100%;
    @media (min-width: $breakpoint-md) {
      transition: transform $duration-transition-base ease;
      :hover > & {
        transform: scale(1.1);
      }
    }
  }

  &__desc {
    list-style: none;
    padding: 1rem 2rem;
    background-color: $color-white;
    color: $color-text-secondary;
    z-index: $layer-page-z-index;

    @media (min-width: $breakpoint-md) {
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: rgba(#000, 0.6);
      color: $color-text-primary;
      transform: translateY(100%);
      transition: transform $duration-transition-base ease;
      :hover > & {
        transform: translateY(1px);
      }
    }

    span {
      font-weight: bold;
    }
  }
}
</style>
