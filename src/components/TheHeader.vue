<template>
  <header class="header">
    <LogoSpotify class="header__logo" />

    <div class="header__content">
      <BaseButton v-if="!userData.name" @click="handleLogIn()">
        Log in with Spotify
      </BaseButton>

      <p v-else>
        Hi
        <a
          :href="userData.spotifyUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ userData.name }}
        </a>
      </p>
    </div>
  </header>
</template>

<script>
import SpotifyService from "@/services/spotify-service";
import LogoSpotify from "@/components/icons/LogoSpotify.vue";
import BaseButton from "@/components/BaseButton.vue";
import { mapState } from "pinia";
import { useSpotifyStore } from "@/stores/spotifyStore";

export default {
  components: { LogoSpotify, BaseButton },
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

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media (min-width: $breakpoint-md) {
    flex-direction: row;
    justify-content: space-between;
  }

  &__logo {
    width: 200px;
  }

  &__content {
    margin-top: 2rem;
    margin-bottom: 2rem;

    a {
      color: $color-text-primary;
      font-weight: bold;
    }
  }
}
</style>
