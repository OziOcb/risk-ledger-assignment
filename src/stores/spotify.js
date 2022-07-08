import { defineStore } from "pinia";
import SpotifyService from "@/services/spotify-service";

export const useSpotifyStore = defineStore({
  id: "spotify",

  state: () => ({
    userData: { name: "", spotifyUrl: "" },
  }),

  actions: {
    async fetchUserData() {
      const data = await SpotifyService.getCurrentUsersProfile();

      this.userData = {
        name: data.display_name,
        spotifyUrl: data.external_urls.spotify,
      };
    },
  },
});
