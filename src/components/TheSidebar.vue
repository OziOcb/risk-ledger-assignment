<template>
  <aside>
    <ul class="list" v-if="recentTracks.length">
      <li class="list__item">
        <BaseButton
          class="list__button"
          :active="toggleActiveStateForRecent()"
          @click="handleShowingRecentTracks()"
        >
          Your Recent Tracks
        </BaseButton>
      </li>

      <li
        class="list__item"
        v-for="artist in getRecentArtists"
        :key="artist.id"
      >
        <BaseButton
          class="list__button"
          :active="toggleActiveStateForArtists(artist.id)"
          @click="handleShowingArtistTracks(artist)"
        >
          {{ artist.name }}
        </BaseButton>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapState, mapWritableState, mapActions } from "pinia";
import { useSpotifyStore } from "../stores/spotifyStore";
import { displayCategories } from "@/utils/enums";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: { BaseButton },
  data: () => ({
    displayCategories: displayCategories,
  }),
  computed: {
    ...mapState(useSpotifyStore, [
      "recentTracks",
      "artistTracks",
      "getRecentArtists",
    ]),
    ...mapWritableState(useSpotifyStore, ["displayedCategory"]),
  },

  methods: {
    ...mapActions(useSpotifyStore, ["fetchArtistsTopTracks"]),

    handleShowingRecentTracks() {
      this.displayedCategory = displayCategories.RECENT_TRACKS;
    },

    async handleShowingArtistTracks(artist) {
      await this.fetchArtistsTopTracks(artist);
      this.displayedCategory = displayCategories.ARTIST_TRACKS;
    },

    toggleActiveStateForRecent() {
      if (this.displayedCategory === displayCategories.RECENT_TRACKS)
        return true;
    },

    toggleActiveStateForArtists(artistId) {
      if (
        this.displayedCategory === displayCategories.ARTIST_TRACKS &&
        artistId === this.artistTracks[0]?.artist?.id
      ) {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-left: 0;
  list-style: none;
  @media (min-width: $breakpoint-lg) {
    position: sticky;
    top: 2rem;
    grid-template-columns: 1fr;
  }

  &__button {
    width: 100%;
    height: 100%;
  }
}

.active {
  background-color: #ada !important; // REMOVE_ME: remove when done!
}
</style>
