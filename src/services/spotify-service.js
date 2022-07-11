import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useSpotifyStore } from "@/stores/spotifyStore";

const BASE_URL = "https://api.spotify.com/v1";

export default {
  authorize() {
    const client_id = "9ee40d36278b4ea8a8dcc9ad6bb71de0"; // Normally I would put this ID inside .env file
    const redirect_uri = "http://localhost:3000/";

    const state = uuidv4();

    localStorage.setItem("stateKey", state);
    const scope = "user-read-private user-read-email user-read-recently-played";

    let url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&state=" + encodeURIComponent(state);

    window.location = url;
  },

  async getCurrentUsersProfile() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/me`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      return data;
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        const spotifyStore = useSpotifyStore();
        spotifyStore.$reset();

        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_in");
        localStorage.removeItem("spotifyStore");
        localStorage.removeItem("stateKey");
      }
    }
  },

  async getRecentlyPlayedTracks() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/me/player/recently-played`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      return data;
    } catch (error) {
      console.error(error);
    }
  },

  async getArtistsTopTracks(artistId) {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/artists/${artistId}/top-tracks?market=gb`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      return data;
    } catch (error) {
      console.error(error);
    }
  },
};
