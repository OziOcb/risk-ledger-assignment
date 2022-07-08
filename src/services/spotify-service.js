import axios from "axios";

const baseURL = "https://api.spotify.com/v1";

export default {
  async getAllPeople(page = 1) {
    try {
      const { data } = await axios.get(`${baseURL}people/?page=${page}`);

      return data;
    } catch (error) {
      console.error(error);
    }
  },
};
