<template>
  <ul class="tracksGrid">
    <li
      class="tracksGrid__item"
      v-for="item in trackGridContent"
      :key="item.trackId"
    >
      <TracksGridItem :item="item" />
    </li>
  </ul>
</template>

<script>
import { mapState } from "pinia";
import { useSpotifyStore } from "@/stores/spotify";
import TracksGridItem from "@/components/TracksGridItem.vue";

export default {
  components: { TracksGridItem },
  computed: {
    ...mapState(useSpotifyStore, ["trackGridContent"]),
  },
};
</script>

<style lang="scss" scoped>
.tracksGrid {
  list-style: none;
  padding-left: 0;
  display: grid;
  grid-row-gap: 2rem;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 0;
  }
  @media (min-width: $breakpoint-lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
