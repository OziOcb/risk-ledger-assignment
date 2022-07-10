<template>
  <TheHeader class="container" />

  <main class="main container">
    <TheSidebar />

    <TracksGrid />
  </main>
</template>

<script>
import { mapActions } from "pinia";
import { useSpotifyStore } from "@/stores/spotifyStore";
import TheHeader from "@/components/TheHeader.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import TracksGrid from "@/components/TracksGrid.vue";

export default {
  components: { TheHeader, TheSidebar, TracksGrid },

  created() {
    const hash = window.location.hash.substring(1);

    if (hash !== "") {
      this.saveAccessToken(hash);
      this.fetchUserData();
      this.fetchRecentlyPlayedTracks();
    }

    if (localStorage.getItem("access_token")) {
      const that = this;
      (function f() {
        that.fetchRecentlyPlayedTracks();
        setTimeout(f, 30000);
      })();
    }
  },

  methods: {
    ...mapActions(useSpotifyStore, [
      "fetchUserData",
      "fetchRecentlyPlayedTracks",
    ]),

    saveAccessToken(hash) {
      const result = hash.split("&").reduce(function (res, item) {
        const parts = item.split("=");
        res[parts[0]] = parts[1];
        return res;
      }, {});

      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("expires_in", result.expires_in);

      history.replaceState(null, null, " ");
    },
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

html {
  font-size: 62.5%;
}

body {
  color: $color-text-primary;
  background: $color-body-bg;
  transition: color $duration-transition-base * 2,
    background-color $duration-transition-base * 2;
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 1.6rem;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  margin: 0 auto;
  padding-right: $size-gutter-width;
  padding-left: $size-gutter-width;
  max-width: $size-container-max-width;
}

.router-view {
  margin-top: 10rem;
}

// ===
// Helpers
// ===
.sr-only {
  position: absolute;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  width: 1px;
  height: 1px;
  white-space: nowrap;
  border: 0;
}

.main {
  @media (min-width: $breakpoint-lg) {
    display: flex;
  }
}
</style>
