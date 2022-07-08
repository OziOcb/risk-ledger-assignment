<template>
  <header>
    <h1>Logo</h1>

    <button v-if="!userData.name" @click="handleLogIn()">
      Log in with Spotify
    </button>

    <div v-else>
      Hi
      <a :href="userData.spotifyUrl" target="_blank" rel="noopener noreferrer">
        {{ userData.name }}
      </a>
    </div>
  </header>
</template>

<script>
import SpotifyService from "@/services/spotify-service";
import { mapState } from "pinia";
import { useSpotifyStore } from "@/stores/spotify";

export default {
  computed: {
    ...mapState(useSpotifyStore, ["userData"]),
  },

  methods: {
    handleLogIn() {
      SpotifyService.authorize();
    },
  },
};
</script>

<style lang="scss" scoped></style>
