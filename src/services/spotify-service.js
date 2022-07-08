// import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// const baseURL = "https://api.spotify.com/v1";

export default {
  authorize() {
    var client_id = "9ee40d36278b4ea8a8dcc9ad6bb71de0"; // Normally I would put this ID inside .env file
    var redirect_uri = "http://localhost:3000/";

    var state = uuidv4();

    localStorage.setItem("stateKey", state);
    var scope = "user-read-private user-read-email";

    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&state=" + encodeURIComponent(state);

    window.location = url;
  },
};
