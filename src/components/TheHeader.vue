<template>
  <header>
    <h1>Logo</h1>

    <button @click="handleLogIn()">Log in with Spotify</button>
  </header>
</template>

<script>
import SpotifyService from "@/services/spotify-service";

export default {
  methods: {
    handleLogIn() {
      SpotifyService.authorize();
    },
  },
};
</script>

<style lang="scss" scoped></style>
