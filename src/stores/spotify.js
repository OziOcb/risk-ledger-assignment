import { defineStore } from "pinia";
import SpotifyService from "@/services/spotify-service";

export const useSpotifyStore = defineStore({
  id: "spotify",

  state: () => ({
    userData: { name: "", spotifyUrl: "" },
    trackGridContent: [],
  }),

  actions: {
    async fetchUserData() {
      const data = await SpotifyService.getCurrentUsersProfile();

      this.userData = {
        name: data.display_name,
        spotifyUrl: data.external_urls.spotify,
      };
    },

    async fetchRecentlyPlayedTracks() {
      const data = await SpotifyService.getRecentlyPlayedTracks();

      this.trackGridContent = data.items.map((item) => {
        const { track } = item;

        return {
          playedAt: item.played_at,
          albumImageUrl: track.album.images[1].url,
          artistName: track.artists[0].name,
          spotifyUrl: track.external_urls.spotify,
          trackId: track.id,
          trackName: track.name,
        };
      });
    },
  },
});
