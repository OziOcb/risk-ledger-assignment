import { defineStore } from "pinia";
import SpotifyService from "@/services/spotify-service";

export const useSpotifyStore = defineStore({
  id: "spotifyStore",

  state: () => ({
    userData: { name: "", spotifyUrl: "" },
    recentTracks: [],
  }),

  getters: {
    getRecentArtists: (state) => {
      return state.recentTracks.map((track) => track.artist);
    },
  },

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

      this.recentTracks = data.items.map((item) => {
        const { track } = item;

        return {
          playedAt: item.played_at,
          albumImageUrl: track.album.images[1].url,
          artist: {
            name: track.artists[0].name,
            href: track.artists[0].href,
          },
          spotifyUrl: track.external_urls.spotify,
          trackId: track.id,
          trackName: track.name,
        };
      });
    },
  },
});
