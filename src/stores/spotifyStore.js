import { defineStore } from "pinia";
import SpotifyService from "@/services/spotify-service";
import { displayCategories } from "@/utils/enums";

export const useSpotifyStore = defineStore({
  id: "spotifyStore",

  state: () => ({
    userData: { name: "", spotifyUrl: "" },
    displayedCategory: displayCategories.RECENT_TRACKS,
    recentTracks: [],
    artistTracks: [],
  }),

  getters: {
    getRecentArtists: (state) => {
      const check = new Set();

      const artists = state.recentTracks.map((track) => track.artist);
      const artistsWithoutDuplicates = artists.filter(
        (obj) => !check.has(obj.id) && check.add(obj.id)
      );

      return artistsWithoutDuplicates;
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
            id: track.artists[0].id,
            name: track.artists[0].name,
            href: track.artists[0].href,
          },
          spotifyUrl: track.external_urls.spotify,
          trackId: track.id,
          trackName: track.name,
        };
      });
    },

    async fetchArtistsTopTracks(artist) {
      const data = await SpotifyService.getArtistsTopTracks(artist.id);

      this.artistTracks = data.tracks.map((track) => {
        return {
          albumImageUrl: track.album.images[1].url,
          artist: {
            id: track.artists[0].id,
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
