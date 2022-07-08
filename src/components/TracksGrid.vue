<template>
  <ul>
    <li v-for="item in trackGridContent" :key="item.trackId">
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

<style lang="scss" scoped></style>
